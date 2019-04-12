##AuthorizedPage

实现用户有权限时可以查看页面，没有权限时只能看到 `you dont have permissions` 。

**用法示例**

假设用户需要拥有 `system_landing_page_read` 权限才能查看 `SomePage` 页面。只需要：

1 引入 `AuthorizePage` 组件
2 照常编写页面组件
3 在 export 前，调用 `AuthorizePage('system_landing_page_read')(SomePage)`

```jsx
import AuthorizePage from 'path/to/components/common/Authorized/AuthorizedPage';

class SomePage extends Component {
  public render(): React.ReactNode {
    return (
      <div>some page.</div>
    );
  }
}

export default AuthorizePage('system_landing_page_read')(YourPage);
```

**补充说明**

因为权限组件需要用到当前路由的信息，已经在内部引入了 `react-router-dom` 的 `withRouter`。所以可以直接在组件的 `props` 中访问相关路由属性。

因为我们的权限与 projectId 、 channelId 有关，需要从路由中取出这两个信息。为减少获取 projectId 、 channelId 的复杂度，需要约定书写路由时的格式：给相应的 id 命名。

如匹配 `project 详情页面` 的路由需要这样写：

```
  path: '/projects/:projectId'
```

匹配 `channel 详情页面` 的路由需要这样写：

```
  path: '/channels/:channelId'
```

##AuthorizedBtn

实现用户点击按钮，有权限时可以调用正常的 onClick 回调，没有权限时只触发提示： `please apply for permission` 。

**用法示例**

假设用户需要拥有 `system_landing_page_write` 权限才能点击按钮`say hello`。只需要：

1 引入 `AuthorizedBtn` 组件
2 在使用 `AuthorizedBtn` 时传入 `currentAuthority` 属性，其值为 `system_landing_page_write` ，其他属性与 `antd` 中的 `Button` 一致

```jsx
import AuthorizedBtn from 'path/to/components/common/Authorized/AuthorizedBtn';

class SomePage extends Component {
  private sayHello(): void {

  }
  public render(): React.ReactNode {
    return (
      <AuthorizeBtn currentAuthority='system_landing_page_write' onClick={() => this.sayHello()} type="primary">click to say hello</AuthorizeBtn>
    );
  }
}

export default SomePage;
```

**补充说明**

因为权限组件需要用到当前路由的信息，已经在内部引入了 `react-router-dom` 的 `withRouter`。所以可以直接在组件的 `props` 中访问相关路由属性。

因为我们的权限与 projectId 、 channelId 有关，需要从路由中取出这两个信息。为减少获取 projectId 、 channelId 的复杂度，需要约定书写路由时的格式：给相应的 id 命名。

如匹配 `project 详情页面` 的路由需要这样写：

```
  path: '/projects/:projectId'
```

匹配 `channel 详情页面` 的路由需要这样写：

```
  path: '/channels/:channelId'
```
