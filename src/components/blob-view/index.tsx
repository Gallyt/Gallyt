import { extname } from 'path';
import * as React from 'react';

import BSOD from '../bsod';
import GitObject from '../git-object';
import { CoverLoader } from '../loader';
import Highlight from './highlight';

const { languages }: any = require('lang-map');

interface IProps {
  blob: string;
  path: string;
}

const BlobView: React.SFC<IProps> = ({ blob, path }) => (
  <GitObject oid={blob}>
    {({ result, loading, error }) => {
      if (loading) {
        return <CoverLoader text="loading" />;
      } else if (result) {
        const buffer = result as Buffer;
        const ext = extname(path).slice(1);

        return <Highlight className={`language-${languages(ext)[0]}`}>{buffer.toString('utf-8')}</Highlight>;
      } else if (error) {
        return <BSOD error={error} />;
      } else {
        return <></>;
      }
    }}
  </GitObject>
);

export default BlobView;
