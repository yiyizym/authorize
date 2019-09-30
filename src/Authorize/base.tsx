/**
 * 一个实现异步渲染的高阶组件
 * 异步 fullfilled 前渲染 Spin 组件；
 * 当异步 resolve 时渲染 children ，reject 时渲染 noMatch
 */


import React, {ReactElement} from 'react';


interface BaseProps {
  author: Promise<any>|null; // 实现判断权限的 Promise 实例
  noMatch: React.ReactNode; // 没有权限时的 组件
  children: React.ReactNode; // 有权限时的 组件
  defaultChildren?: ReactElement; // 默认展示的 组件
  childrenProps: any; // 渲染 children 时传入的 props 属性
  [key: string]: any; // 解决 typescript 报错
}

interface BaseState {
  component: React.ComponentClass|null;
}

class BaseAuthorize extends React.Component<BaseProps, BaseState> {

  private _isMounted = false;

  public state = {
    component: null,
  };

  public componentDidMount(): void {
    this._isMounted = true;
    this.setRenderComponent();
  }

  public shouldComponentUpdate(nextProps: BaseProps, nextState: BaseState): boolean {
    return this.componentChanged(nextState) || this.propsChanged(nextProps);
  }

  private componentChanged(nextState: BaseState): boolean {
    const nextComponent = nextState.component;
    const component = this.state.component;
    if (component === null || nextComponent === null) {return true;}
    if ((component as React.ComponentClass).displayName !== nextComponent.displayName) {return true;}
    return false;
  }

  private propsChanged(nextProps: BaseProps): boolean {
    let propsChanged = false;
    for (const key in nextProps) {
      if (nextProps.hasOwnProperty(key)) {
        if (nextProps[key] != this.props[key]) {
          propsChanged = true;
        }
      }
    }
    return propsChanged;
  }

  public componentDidUpdate(): void {
    this.setRenderComponent();
  }

  private setRenderComponent(): void {
    const { author, children, noMatch } = this.props;
    if (author === null) {return;}
    author
      .then(() => {
        if (!this._isMounted) {return;}
        this.setState({
          component: this.makeReactClass(children, 'ok'),
        });
      })
      .catch(() => {
        if (!this._isMounted) {return;}
        this.setState({
          component: this.makeReactClass(noMatch, 'error'),
        });
      });
  }

  public componentWillUnmount(): void {
    this._isMounted = false;
  }

  private makeReactClass = (target: React.ReactNode, displayName: string): React.ComponentClass => {
    class C extends React.Component {
      public render(): React.ReactNode {
        const convertedTarget = target as ReactElement;
        const newTarget = React.createElement(
          convertedTarget.type,
          Object.assign({},convertedTarget.props,this.props)
        );
        return newTarget;
      }
    }
    (C as React.ComponentClass).displayName = displayName;
    return C;
  };

  public render(): JSX.Element {
    const { component: Component } = this.state;
    const { childrenProps, defaultChildren } = this.props;
    const Default = this.makeReactClass(defaultChildren, 'default');
    if (Component === null) {
      return defaultChildren ? (<Default {...childrenProps} />) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            margin: 'auto',
            paddingTop: 50,
            textAlign: 'center',
          }}
        >
          <div>loading...</div>
        </div>
      );
    } else {
      const NotNullComponent = Component as unknown as React.ComponentClass; //fix typescript error hint
      return (
        <NotNullComponent {...childrenProps} />
      );
    }
  }
}

export default BaseAuthorize;
