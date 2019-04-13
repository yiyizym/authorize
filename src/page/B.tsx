import React from "react";
import AuthorizePage from '../Authorize/AuthorizePage';

class PageB extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render(): React.ReactNode {
    return (
      <div>page b</div>
    );
  }
}

export default AuthorizePage('page_b_read')(PageB);
