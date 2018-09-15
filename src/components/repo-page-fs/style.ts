import styled from 'styled-components';
import { color } from '../../helpers/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: stretch;
`;

export const LeftBar = styled.div`
  min-width: 150px;
  overflow: auto;
  background-color: ${color('primary')};
  padding: 10px 0px;
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${color('secondary')};
`;
