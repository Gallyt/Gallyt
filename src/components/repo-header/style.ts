import styled from 'styled-components';
import { color, media } from '../../helpers/styled';

export const Header = styled.div`
  background-color: ${color('background2')};
  display: flex;
  flex-direction: row;
  justify-items: stretch;
`;
export const Brand = styled.div`
  cursor: pointer;
  padding: 10px;
  width: 150px;
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
`;

export const Links = styled.div`
  width: 100%;
  display: flex;
  justify-items: flex-start;
`;

export const Link = styled.div`
  cursor: pointer;
  padding: 10px;
  justify-self: flex-end;

  :hover {
    background-color: ${color('primary')};
  }
`;
export const Logo = styled.img`
  width: 32px;
  height: 32px;
`;
