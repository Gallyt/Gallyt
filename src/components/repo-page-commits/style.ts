import styled from 'styled-components';
import { color, fonts } from '../../helpers/styled';

export const Container = styled.div`
  height: 100vh;
  background-color: ${color('dark')};
  overflow: scroll;
  padding: 10px;
`;

export const Select = styled.select`
  margin: 0px auto;
  display: block;
  border-radius: 9999px;
  width: 250px;
  text-overflow: ellipsis;
  outline: none;
  border: none;
  background-color: ${color('alternate')};
  color: ${color('white')};
  padding: 5px;
  font-size: 14px;
  font-weight: bold;
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
