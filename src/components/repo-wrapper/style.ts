import styled from 'styled-components';
import { color } from '../../helpers/styled';

export const Wrapper = styled.div`
  background: ${color('background')};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const SideBar = styled.div`
  width: 200px;
  background-color: ${color('background2')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TopContent = styled.div``;

export const BottomContent = styled.div``;

export const TitleBox = styled.div``;
