import { USER_PERMISSION_MAP, Permission, Match } from "../constants";

const getLoginUserInfo = async (): Promise<Permission> => {

  // 如果已经从后台获取过登录用户的权限，可以保存下来，后续直接用
  // 如果没有从后台拿过，就发请求拿
  // 这里只是一个示例：用户有 pageA 的 read 和 write 权限
  return Promise.resolve({
    list: [1000, 1001]
  });
};

const isHasPermission = (
  loginUserPermission: Permission, 
  currentAuthority: keyof typeof USER_PERMISSION_MAP, 
  match: Match): boolean => {
    // 根据当前登录用户拥有的权限/当前组件所需要的权限/以及当前页面的路由信息
    // 判断当前登录用户有没有访问的权限

    // 这里只是一个当前登录用户拥有的权限和当前组件所需要的权限来判断的示例
    return loginUserPermission.list.includes(USER_PERMISSION_MAP[currentAuthority]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authorize = (currentAuthority: keyof typeof USER_PERMISSION_MAP, match: Match): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    return getLoginUserInfo().then(permission => {
      if (isHasPermission(permission, currentAuthority, match)) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
};

export default authorize;
