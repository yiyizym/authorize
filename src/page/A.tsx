import React from "react";
import AuthorizePage from '../Authorize/AuthorizePage';
import AuthorizedBtn from '../Authorize/AuthorizedBtn';

class PageA extends React.Component {
  constructor(props: any) {
    super(props);
  }

  private sayHello(): void {
    window.alert('hello');
  }

  public render(): React.ReactNode {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '200px auto',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <div>page a</div>
        <div style={{
          display: 'flex',
          marginTop: '100px',
          width: '400px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <AuthorizedBtn currentAuthority='page_a_write' onClick={() => this.sayHello()} type="primary">click to say hello</AuthorizedBtn>
          <AuthorizedBtn currentAuthority='page_a_no_permission' onClick={() => this.sayHello()} type="primary">no permission</AuthorizedBtn>
        </div>
      </div>
    );
  }
}

export default AuthorizePage('page_a_read')(PageA);
