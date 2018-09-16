import styled from 'styled-components';
import { color, fonts } from '../../helpers/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: stretch;
`;

export const LeftBar = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
  background-color: ${color('secondary')};
  padding: 10px 0px;
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${color('dark')};
  position: relative;
  overflow: auto;
`;

export const Select = styled.select`
  margin: 0px auto 10px;
  display: block;
  border-radius: 9999px;
  width: 90%;
  max-width: 90%;
  text-overflow: ellipsis;
  outline: none;
`;

export const CommitBlock = styled.div`
  color: ${color('light')};
  background-color: ${color('alternate')};
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  opacity: 1;
  transition-duration: 0.3s;
  z-index: 1;
  :hover {
    opacity: 0;
  }
`;

export const CommitText = styled.div`
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  ${fonts('mono')};
  font-size: 13px;
  border-right: 1px dashed;
  padding-right: 5px;
  margin-right: 10px;
`;

export const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
