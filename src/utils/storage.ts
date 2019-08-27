/**
 * 设置用户信息缓存
 * @param {*} userData 
 */
export function setUser(userData) {
  localStorage.setItem("currentUser", JSON.stringify(userData))
}

export function getUser() {
  return localStorage.getItem("currentUser")
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