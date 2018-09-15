import { CommitDescription, TagDescription, TreeDescription } from 'isomorphic-git';
import { Stream } from 'stream';

const fetch: typeof window.fetch = require('fetch-readablestream');
const { Headers }: any = require('fetch-readablestream/src/polyfill/Headers');
const { GitRemoteConnection }: any = require('isomorphic-git/src/managers/GitRemoteConnection');
const { toNodeReadable }: any = require('node-web-streams');

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

export async function request(repoUrl: string, path: string, fetchOptions: RequestInit = {}): Promise<Stream> {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${repoUrl}/${path}`, {
    ...fetchOptions,
    headers: new Headers({
      'user-agent': 'gallyt/1.0.0',
      ...(fetchOptions.headers || {}),
    }),
  });

  return toNodeReadable(res.body);
}

export async function discover(
  url: string,
  fetchOptions: RequestInit = {},
  service: string = 'git-upload-pack',
): Promise<IGitInfoRefs> {
  const stream = await request(url, `info/refs?service=${service}`, {
    method: 'GET',
    ...fetchOptions,
  });

  return await GitRemoteConnection.receiveInfoRefs(service, stream);
}

export function connect(
  url: string,
  fetchOptions: RequestInit = {},
  service: string = 'git-upload-pack',
): Promise<Stream> {
  return request(url, service, {
    headers: {
      accept: `application/x-${service}-result`,
      'content-type': `application/x-${service}-request`,
      ...(fetchOptions.headers || {}),
    },
    method: 'POST',
    ...fetchOptions,
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

      // const controller = new AbortController();
      const raw = await connect(
        url,
        {
          body: pack,
          headers: {
            'content-length': pack.byteLength,
          },
          //  signal: controller.signal,
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
            // controller.abort();
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

(async () => {
  const url = 'https://github.com/Gallyt/isomorphic-git.git';
  const cache = new Map();
  const infos = await discover(url);
  /* tslint:disable */
  console.log(infos);

  const master = infos.refs.get('refs/heads/master');

  if (!master) return;

  const commit = (await getObject(url, master, cache)) as Buffer;

  /* tslint:isable */
  console.log(commit);
})();
