const options = {
  baseUrl: 'http://192.168.43.88/sina'
}

function axios(method, url, data, contentType = 'application/json') {
  const baseUrl = options.baseUrl
  return new Promise((res, err) => {
    const xhr = new XMLHttpRequest()
    url = /^http:\/\//.test(url) ? url : baseUrl + url
    method = method.toUpperCase()

    if (method === 'GET') {

      let query = '?'
      if (data) {
        console.log(url + query);
        Object.keys(data).forEach(key => {
          query += `${key}=${data[key]}&`
        })
        query = query.slice(0, query.length-1)
        xhr.open(method, url + query)
        xhr.withCredentials = true
        xhr.send()
      } else {
        xhr.open(method, url)
        xhr.send()
      }
    }
    if (method === 'POST') {
      xhr.open(method, url)
      xhr.withCredentials = true
      
      if (contentType === 'application/json') {
        xhr.setRequestHeader('Content-Type', contentType)
        data = JSON.stringify(data)
      }
      xhr.send(data)
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          res(JSON.parse(xhr.response))
        } else {
          err(xhr.status)
        }
      }
    }
  })
}

axios.get = (url, data, contentType='application/json') => {
  return axios('GET', url, data, contentType)
}
axios.post = (url, data, contentType = 'application/json') => {
  return axios('POST', url, data, contentType)
}

module.exports = axios