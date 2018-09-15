import { CaretDown, CaretNext, Document, Folder } from 'grommet-icons';
import styled from 'styled-components';
import { color } from '../../helpers/styled';

export const TitleContainer = styled.div`
  height: 20px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  color: ${color('background')};

  :hover {
    background-color: ${color('secondary')};
  }
`;

export const NodeContainer = styled.div`
  padding-left: 20px;
  position: relative;
`;

const CollapseIcon = styled.i`
  width: 12px;
  height: 12px;
  padding: 4px;
`;

export const CaretDownIcon = CollapseIcon.withComponent(CaretDown);
export const CaretNextIcon = CollapseIcon.withComponent(CaretNext);

const Icon = styled.i`
  width: 16px;
  height: 16px;
  padding: 2px;
`;

export const FolderIcon = Icon.withComponent(Folder);
export const DocumentIcon = Icon.withComponent(Document);

export const Title = styled.span`
  height: 20px;
  line-height: 20px;
  vertical-align: top;
`;
