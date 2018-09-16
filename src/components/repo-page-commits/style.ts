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
  background-color: ${color('dark')};
  padding: 10px 0px;
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
  color: ${color('white')};
  padding: 0 15px 0 5px;
  margin: 15px;
  border-radius: 5px;
  border-left: 3px solid ${color('primary')};
`;

export const CommitId = styled.div`
  ${fonts('mono')} font-size: 12px;
  border-radius: 90px;
  padding: 3px 5px;
`;

export const CommitAuthor = styled.div``;

export const CommitDate = styled.div`
  font-size: 13px;
`;

export const CommitText = styled.div`
  ${fonts('mono')} font-size: 13px;
  border-radius: 10px;
  padding: 3px 5px;
  background-color: ${color('secondary')};
  display: inline-block;
  margin: 5px 0 5px 5px;
`;
