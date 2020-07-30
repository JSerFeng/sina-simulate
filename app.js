const http = require('http')
http.createServer((req,res)=>{
  res.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE', 'Access-Control-Allow-Headers':'x-requested-with,content-type'})
  res.end(`{
    "name": "fy"
  }`)
}).listen(3000)