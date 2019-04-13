import React from "react";

import { Link } from 'react-router-dom'

class Home extends React.Component {
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
          margin: '200px auto',
          justifyContent: 'space-around',
          alignItems: 'center'}}>
        <Link to="/pageA">to page a</Link>
        <Link to="/pageB">to page b (no permission)</Link>
      </div>
    );
  }
}

export default Home;
