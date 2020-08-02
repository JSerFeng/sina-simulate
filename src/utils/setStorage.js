function setStorage(key, value) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  userInfo[key] = value
  localStorage.setItem('userInfo', userInfo)
}
export {
  setStorage
}