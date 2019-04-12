interface Match {
  url: string;
  params: {
    projectId: string;
    channelId: string;
  };
}

interface Permission {

}

const getLoginUserInfo = async (): Promise<Permission> => {

  // get
  if (permission.projectId !== INITIAL_ID) {
    return Promise.resolve(permission);
  } else {
    await loginUserInfo.get(store.dispatch);
    return Promise.resolve(store.getState().loginUserInfo.permission);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authorize = (currentAuthority: keyof typeof USER_PERMISSION_MAP, match: Match): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    return getLoginUserInfo().then(permissions => {
      if (isHasPermission(permissions, currentAuthority, match)) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
};

export default authorize;
