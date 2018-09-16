import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../../helpers/styled';

export const Header = styled.div`
  background-color: ${color('alternate')};
  display: flex;
  flex-direction: row;
  justify-items: stretch;
  height: 50px;
  color: ${color('white')};
`;
export const Brand = styled(RouterLink)`
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 150px;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
`;

export const Links = styled.div`
  width: 100%;
  display: flex;
  justify-items: flex-start;
`;

const LinkBase = styled.a`
  padding: 10px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  transition-duration: 0.3s;
  text-decoration: none;
  color: inherit;

  :hover {
    background-color: ${color('dark')};
  }
`;

export const Link = LinkBase.withComponent(RouterLink);

export const Vote = styled(LinkBase)`
  background-color: ${color('primary')};
  margin-left: auto;
`;

export const Logo = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 5px;
`;
