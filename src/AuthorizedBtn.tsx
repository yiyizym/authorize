import React from 'react';
import { Button,message } from 'antd';
import authorize from './authorize';
import { USER_PERMISSION_MAP } from '@/config/constants';
import BaseAuthorize from './base';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const showError = (): void => {message.error('please apply for permission');};

interface AuthorizeProps extends RouteComponentProps<{projectId: string; channelId: string}> {
  currentAuthority: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

interface InnerState {
  author: Promise<any>|null;
}

class AuthorizeBtn extends React.Component<AuthorizeProps, InnerState> {
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
    const { currentAuthority, staticContext, match, onClick, ...rest } = this.props;
    const { author } = this.state;
    const noMatch = <Button onClick={showError} />;
    return (<BaseAuthorize
      author={author}
      noMatch={noMatch}
      defaultChildren={<Button />}
      childrenProps={rest}
    >
      <Button onClick={onClick} />
    </BaseAuthorize>);
  }
}

export default withRouter<AuthorizeProps>(props => <AuthorizeBtn {...props}/>);
