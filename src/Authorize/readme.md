##AuthorizedPage

实现用户有权限时可以查看页面，没有权限时只能看到 `you dont have permissions` 。

**用法示例**

假设用户需要拥有 `page_a_read` 权限才能查看 `PageA` 页面。只需要：

1 引入 `AuthorizePage` 组件
2 照常编写页面组件
3 在 export 前，调用 `AuthorizePage('page_a_read')(PageA)`

```jsx
import AuthorizePage from 'path/to/AuthorizedPage';

class PageA extends Component {
  public render(): React.ReactNode {
    return (
      <div>page a</div>
    );
  }
}

export default AuthorizePage('page_a_read')(PageA);
```

**补充说明**

因为权限组件需要用到当前路由的信息，已经在内部引入了 `react-router-dom` 的 `withRouter`。所以可以直接在组件的 `props` 中访问相关路由属性。

##AuthorizedBtn

实现用户点击按钮，有权限时可以调用正常的 onClick 回调，没有权限时只触发提示： `please apply for permission` 。

**用法示例**

假设用户需要拥有 `page_a_write` 权限才能点击按钮`say hello`。只需要：

1 引入 `AuthorizedBtn` 组件
2 在使用 `AuthorizedBtn` 时传入 `currentAuthority` 属性，其值为 `page_a_write` 。

```jsx
import AuthorizedBtn from 'path/to/AuthorizedBtn';

class PageA extends Component {
  private sayHello(): void {

  }
  public render(): React.ReactNode {
    return (
      <AuthorizedBtn currentAuthority='page_a_write' onClick={() => this.sayHello()} type="primary">click to say hello</AuthorizedBtn>
    );
  }
}

export default PageA;
```

**补充说明**

因为权限组件需要用到当前路由的信息，已经在内部引入了 `react-router-dom` 的 `withRouter`。所以可以直接在组件的 `props` 中访问相关路由属性。
