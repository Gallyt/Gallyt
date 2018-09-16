import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  background: #fff;
  overflow: auto;
  display: flex;
  justify-content: flex-start;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 900px;
  padding-bottom: 30px;

  * {
    max-width: 100%;
  }

  pre {
    background: #2f3136;
    padding: 20px;
    border-radius: 5px;
    overflow: auto;
  }
`;
