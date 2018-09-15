import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IParams {
  [key: string]: string;
}

type IRenderProps = (props: RouteComponentProps<IParams>) => JSX.Element;

interface IInternalProps extends RouteComponentProps<IParams> {
  children: IRenderProps;
}

interface IExternalProps {
  children: IRenderProps;
}

const InternalRouter: React.SFC<IInternalProps> = ({ children, ...props }) => children(props);

const ExternalRouter: React.ComponentClass<IExternalProps> = withRouter(InternalRouter);

export default ExternalRouter;
