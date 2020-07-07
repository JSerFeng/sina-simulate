
const options = {
  baseUrl: 'http://localhost:3000'
}

function axios(method, url, data) {
  const baseUrl = options.baseUrl
  return new Promise((res, err) => {
    const xhr = new XMLHttpRequest()
    url =  /^http:\/\//.test(url)? url : baseUrl + url
    method = method.toUpperCase()
    xhr.open(method, url)
    if (method == 'GET') {
      let query = '?'
      if (data) {
        Object.keys(data).forEach(key=>{
          query += `${key}=${data[key]}&`
          xhr.send('GET', url + query)
        })
      }
    }
    if (method=='POST') {
      xhr.setRequestHeader('Content-Type','application;charset=utf-8')
      xhr.send(JSON.stringify(data))
    }

    let {readyState, status, response} = xhr
    xhr.onreadystatechange = () => {
      if (readyState==4 && status>=200 && status<300) {
        res(response)
      } else {
        err(`连接${url}失败，状态码${status}`)
      }
    }
  })
}

axios.get = (url, data) => {
  axios('GET', url, data)
}
axios.post = (url, data) => {
  axios('POST', url, data)
}

module.exports = axios