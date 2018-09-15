export type File = IDirectory | string;

export interface IDirectory {
  files: File[];
  name: string;
}
