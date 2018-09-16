import styled from 'styled-components';
import { color } from '../../helpers/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: stretch;
`;

export const LeftBar = styled.div`
  min-width: 250px;
  overflow: auto;
  background-color: ${color('primary')};
  padding: 10px 0px;
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${color('secondary')};
  position: relative;
`;

export const Select = styled.select`
  margin: 10px auto;
  display: block;
  border-radius: 9999px;
  outline: none;
`;
