/**
 * 设置用户信息缓存
 * @param {*} userData 
 */
export function setUser(userData) {
  localStorage.setItem('user', JSON.stringify(userData))
}

export function getUser() {
  return localStorage.getItem('user')
}

/**
 * 清除用户信息缓存
 */
export function removeUser() {
  localStorage.removeItem('user');
}

/**
 * 获取token
 */
export function getToken() {
  const storage = localStorage.getItem('user')
  if (storage) {
    const user = JSON.parse(storage);
    return user.token
  }
  return null;
}