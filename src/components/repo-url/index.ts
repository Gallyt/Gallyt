import { createContext } from 'react';

interface IProps {
  url: string;
}

export default createContext<IProps>({ url: '' });
