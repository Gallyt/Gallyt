import axios, { AxiosRequestConfig } from 'axios';
import { CommitDescription, TagDescription, TreeDescription } from 'isomorphic-git';
import { Stream } from 'stream';

const { GitRemoteConnection }: any = require('isomorphic-git/src/managers/GitRemoteConnection');

const pify: any = require('pify');
const concat: any = require('simple-concat');

interface IGitListPackData {
  data: Uint8Array;
  type: number;
  reference: Buffer;
  offset: number;
  num: number;
}

interface IGitListPack {
  listpack: (stream: Stream, onData: (data: IGitListPackData) => void) => void;
}

type GitOID = string;

export interface IGitInfoRefs {
  capabilities: string[];
  refs: Map<string, GitOID>;
  symrefs: Map<string, GitOID>;
}

const { listpack }: IGitListPack = require('isomorphic-git/src/utils/git-list-pack.js');
const { GitSideBand }: any = require('isomorphic-git/src/models/GitSideBand');
const { GitTree }: any = require('isomorphic-git/src/models/GitTree');
const { GitCommit }: any = require('isomorphic-git/src/models/GitCommit');
const { shasum }: any = require('isomorphic-git/src/utils/shasum');

export async function request(repoUrl: string, path: string, axiosOptions: AxiosRequestConfig = {}): Promise<Stream> {
  const res = await axios({
    headers: {
      'user-agent': 'gallyt/1.0.0',
      ...(axiosOptions.headers || {}),
    },
    responseType: 'stream',
    url: `https://cors-anywhere.herokuapp.com/${repoUrl}/${path}`,
    ...axiosOptions,
  });

  return res.data;
}

export async function discover(
  url: string,
  axiosOptions: AxiosRequestConfig = {},
  service: string = 'git-upload-pack',
): Promise<IGitInfoRefs> {
  const stream = await request(url, `info/refs?service=${service}`, {
    method: 'GET',
    ...axiosOptions,
  });

  return GitRemoteConnection.receiveInfoRefs(service, stream);
}

export function connect(
  url: string,
  axiosOptions: AxiosRequestConfig = {},
  service: string = 'git-upload-pack',
): Promise<Stream> {
  return request(url, service, {
    headers: {
      accept: `application/x-${service}-result`,
      'content-type': `application/x-${service}-request`,
      ...(axiosOptions.headers || {}),
    },
    method: 'POST',
    ...axiosOptions,
  });
}

const LISTPACK_TYPES = {
  1: 'commit',
  2: 'tree',
  3: 'blob',
  4: 'tag',
  6: 'ofs-delta',
  7: 'ref-delta',
};

type GitObject = CommitDescription | TreeDescription | TagDescription | Buffer;

export function getObject(url: string, oid: string, cache: Map<string, GitObject>): Promise<GitObject> {
  if (cache.has(oid)) {
    return Promise.resolve(cache.get(oid) as GitObject);
  }
  return new Promise(async (resolve, reject) => {
    try {
      const packstream = await GitRemoteConnection.sendUploadPackRequest({
        capabilities: ['multi_ack_detailed', 'no-done', 'side-band-64k', 'thin-pack', 'ofs-delta'],
        depth: 1,
        haves: cache.keys(),
        wants: [oid],
      });

      const pack = await pify(concat)(packstream);

      const cancelToken = axios.CancelToken.source();
      const raw = await connect(
        url,
        {
          cancelToken: cancelToken.token,
          data: pack,
          headers: {
            'content-length': pack.byteLength,
          },
        },
      );

      const response = GitSideBand.demux(raw);

      listpack(response.packfile, ({ data, type, reference, offset, num }) => {
        const typeName = LISTPACK_TYPES[type];
        const hash = shasum(
          Buffer.concat([Buffer.from(`${typeName} ${data.byteLength.toString()}\0`), Buffer.from(data)]),
        );

        let object: GitObject | undefined;

        switch (typeName) {
          case 'commit':
            object = {
              oid: hash,
              ...GitCommit.from(Buffer.from(data)).parse(),
            } as CommitDescription;
            break;
          case 'tree':
            object = { entries: GitTree.from(Buffer.from(data)).entries() } as TreeDescription;
            break;
          case 'blob':
            object = Buffer.from(data);
            break;
        }

        if (object) {
          cache.set(oid, object);
          if (hash === oid) {
            resolve(object);
            cancelToken.cancel();
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}
