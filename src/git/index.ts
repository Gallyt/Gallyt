import { CommitDescription, TagDescription, TreeDescription } from 'isomorphic-git';
import { Stream } from 'stream';

// const fetch: typeof window.fetch = require('fetch-readablestream');
// const { Headers }: any = require('fetch-readablestream/src/polyfill/Headers');
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
  capabilities: Set<string>;
  refs: Map<string, GitOID>;
  symrefs: Map<string, GitOID>;
}

const { listpack }: IGitListPack = require('isomorphic-git/src/utils/git-list-pack.js');
const { GitSideBand }: any = require('isomorphic-git/src/models/GitSideBand');
const { GitTree }: any = require('isomorphic-git/src/models/GitTree');
const { GitCommit }: any = require('isomorphic-git/src/models/GitCommit');
const { shasum }: any = require('isomorphic-git/src/utils/shasum');
const { filterCapabilities }: any = require('isomorphic-git/src/utils/filterCapabilities');

export async function request(repoUrl: string, path: string, fetchOptions: RequestInit = {}): Promise<Stream> {
  const res = await fetch(`https://cors.isomorphic-git.org/${repoUrl.replace(/^https?:\/\//, '')}/${path}`, {
    ...fetchOptions,
    headers: {
      'user-agent': 'gallyt/1.0.0',
      ...(fetchOptions.headers || {}),
    },
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
    ...fetchOptions,
    headers: {
      accept: `application/x-${service}-result`,
      'content-type': `application/x-${service}-request`,
      ...(fetchOptions.headers || {}),
    },
    method: 'POST',
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

export type GitObject = CommitDescription | TreeDescription | TagDescription | Buffer;

export function getObject(
  url: string,
  oid: string,
  serverCapabilities: string[],
  cache: Map<string, GitObject>,
): Promise<GitObject> {
  if (cache.has(oid)) {
    return Promise.resolve(cache.get(oid) as GitObject);
  }
  return new Promise(async (resolve, reject) => {
    try {
      const packstream = await GitRemoteConnection.sendUploadPackRequest({
        capabilities: filterCapabilities(serverCapabilities, ['no-done', 'side-band-64k', 'agent=gallyt/1.0.0']),
        depth: 1,
        wants: [oid],
      });

      const pack = await pify(concat)(packstream);

      const controller: any = typeof AbortController === 'undefined' ? {} : new AbortController();
      const raw = await connect(
        url,
        {
          body: pack,
          headers: {
            'content-length': pack.byteLength,
          },
          signal: controller.signal,
        },
      );

      const response = GitSideBand.demux(raw);

      await listpack(response.packfile, ({ data, type, reference, offset, num }) => {
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
          cache.set(hash, object);
          if (hash === oid) {
            resolve(object);
            if (controller.abort) {
              controller.abort();
            }
          }
        }

        // Yeah, we have a race condition sometimes ... so check if it's not in cache :smile:
        if (cache.has(oid)) {
          resolve(cache.get(oid));
          if (controller.abort) {
            controller.abort();
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}
