import * as React from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

import { GitObject } from '../../git';
import BSOD from '../bsod';
import GitDiscover from '../git-discover';
import RepoUrl from '../repo-url';
import Router from '../router';

import { Wrapper } from './style';

import { CoverLoader } from '../loader';
import RepoHeader from '../repo-header/index';

export interface IContext {
  url: string;
  cache: Map<string, GitObject>;
  serverCapabilities: string[];
}

export const Context = React.createContext<IContext | null>(null);

export default class RepoWrapper extends React.Component<
  RouteConfigComponentProps,
  { caches: { [url: string]: Map<string, GitObject> } }
> {
  public state = {
    caches: {},
  };

  public getCache(url: string) {
    if (url in this.state.caches) {
      return this.state.caches[url];
    } else {
      return (this.state.caches[url] = new Map());
    }
  }
  public render() {
    return (
      <Router>
        {({ match: { params } }) => {
          const url = decodeURIComponent(params.repoUrl);

          return (
            <RepoUrl.Provider value={{ url }}>
              <GitDiscover url={url}>
                {({ result, loading, error }) => {
                  if (loading) {
                    return <CoverLoader text="Loading repo" />;
                  } else if (result) {
                    return (
                      <Wrapper>
                        <RepoHeader repoUrl={params.repoUrl} />
                        <Context.Provider
                          value={{
                            cache: this.getCache(url),
                            serverCapabilities: Array.from(result.capabilities),
                            url,
                          }}
                        >
                          {renderRoutes(this.props.route!.routes, { gitInfos: result })}
                        </Context.Provider>
                      </Wrapper>
                    );
                  } else if (error) {
                    return <BSOD error={error} />;
                  } else {
                    return <></>;
                  }
                }}
              </GitDiscover>
            </RepoUrl.Provider>
          );
        }}
      </Router>
    );
  }

  public shouldComponentUpdate(nextProps: RouteConfigComponentProps) {
    return this.props.location.pathname !== nextProps.location.pathname;
  }
}
