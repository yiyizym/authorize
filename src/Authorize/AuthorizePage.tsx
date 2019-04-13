import React from 'react';
import authorize from './authorize';
import BaseAuthorize from './base';
import { USER_PERMISSION_MAP } from '../constants';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface InnerProps extends RouteComponentProps<{projectId: string; channelId: string}> {
  currentAuthority: string;
  page: React.ComponentClass;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

interface InnerState {
  author: Promise<any>|null;
}

class AuthorizePageInner extends React.Component<InnerProps, InnerState> {
  public state = {
    author: null,
  }
  public componentDidMount(): void {
    const { currentAuthority,  match } = this.props;
    this.setState({
      author: authorize(currentAuthority as keyof typeof USER_PERMISSION_MAP, match)
    });
  }
  public render(): JSX.Element {
    const noMatch = <div
      style={{height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      you don&apos;t have permissions
    </div>;
    const { staticContext: any, page: Page, currentAuthority,  ...rest } = this.props;
    const { author } = this.state;
    return (<BaseAuthorize
      author={author}
      noMatch={noMatch}
      childrenProps={rest}
    >
      <Page />
    </BaseAuthorize>);
  }
}

const AuthorizePage = (currentAuthority: keyof typeof USER_PERMISSION_MAP): Function => (page: React.ComponentClass): React.ComponentClass => {
  return withRouter(props => <AuthorizePageInner key={props.match.url} currentAuthority={currentAuthority} page={page} {...props}/>);
};

export default AuthorizePage;
