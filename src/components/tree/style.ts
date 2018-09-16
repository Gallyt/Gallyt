import { CaretDown, CaretNext, Document, Folder } from 'grommet-icons';
import styled from 'styled-components';
import { color } from '../../helpers/styled';

export const TitleContainer = styled.div`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  color: ${color('light')};
  border-radius: 100px 0 0 100px;
  padding-left: 5px;
  padding-top: 2px;
  padding-bottom: 1px;
  transition-duration: 0.2s;
  :hover {
    background-color: ${color('alternate')};
  }
  :first-child() {
    color: red;
  }
`;

export const NodeContainer = styled.div`
  padding-left: 10px;
`;

const CollapseIcon = styled.i`
  width: 12px;
  height: 12px;
  margin: 4px;
  fill: ${color('secondary')};
  stroke: ${color('secondary')};
`;

export const CaretDownIcon = CollapseIcon.withComponent(CaretDown);
export const CaretNextIcon = CollapseIcon.withComponent(CaretNext);

const Icon = styled.i`
  width: 14px;
  height: 14px;
  margin: 3px;
  fill: ${color('white')};
  stroke: ${color('white')};
`;

export const FolderIcon = Icon.withComponent(Folder);
export const DocumentIcon = Icon.withComponent(Document);

export const Title = styled.span`
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  vertical-align: top;
  margin-left: 10px;
`;

export const LoaderSacled = styled.div`
  display: inline-block;
  transform: scale(0.5);
`;

export const LoaderBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  color: ${color('light')};
`;
