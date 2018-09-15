import styled from 'styled-components';
import { Theme } from '../../theme';

interface IProps {
  theme?: Theme;
}

const backgroundColor = ({ theme }: IProps) => theme!.colors.background;

export const Wrapper = styled.div`
  background: ${backgroundColor};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
