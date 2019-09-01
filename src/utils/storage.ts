/**
 * 设置用户信息缓存
 * @param {*} userData 
 */
export function setUser(userData) {
  localStorage.setItem("currentUser", JSON.stringify(userData))
}

export function getUser(key?: string) {
    const user = localStorage.getItem("currentUser")
    if (!user) {
        return null
    }
    if (arguments.length) {
        return JSON.parse(user)[`${key}`]
    }

    return JSON.parse(user)
}

/**
 * 清除用户信息缓存
 */
export function removeUser() {
  localStorage.removeItem("currentUser");
}

/**
 * 获取token
 */
export function getToken() {
  const storage = localStorage.getItem("currentUser")
  if (storage) {
    const user = JSON.parse(storage);
    return user.token
  }
  return null;
}