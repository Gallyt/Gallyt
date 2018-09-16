import styled from 'styled-components';
import { color } from '../../helpers/styled';

export const Header = styled.div`
  background-color: ${color('dark')};
  display: flex;
  flex-direction: row;
  justify-items: stretch;
  height: 50px;
  color: ${color('white')};
`;
export const Brand = styled.div`
  cursor: pointer;
  padding-left: 10px;
  display: flex;
  align-items: center;
  min-width: 150px;
  font-weight: bold;
`;

/*
  ::before {
    display: inline-block;
    content: '??:';
    font-family: monospace;
    text-transform: uppercase;
  }
  ${media('lg')} {
    ::before {
      content: 'lg:';
    }
  }
  ${media('md')} {
    ::before {
      content: 'md:';
    }
  }
  ${media('sm')} {
    ::before {
      content: 'sm:';
    }
  }
  ${media('xs')} {
    ::before {
      content: 'xs:';
    }
  }
*/

export const Links = styled.div`
  width: 100%;
  display: flex;
  justify-items: flex-start;
`;

export const Link = styled.div`
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  transition-duration: 0.3s;

  :hover {
    background-color: ${color('primary')};
  }
`;

export const Logo = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 5px;
`;
