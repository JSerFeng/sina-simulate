import succIcon from '../imgs/focus_succ.png'
import focusIcon from '../imgs/unfocus.png'

const axios = require("./axios")
const { show } = require("./showToast")

function createFocus(fid) {
  const $style = document.createElement('style')
  $style.innerHTML = `
      ._focus {
        cursor: pointer;
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 0 auto;
        background-color: #fff;
        background-image: url(${focusIcon});
        background-size: contain;
      }

      ._focus:hover{
        background-color: #ce6444;
        box-shadow: 0 0 15px #ffc670;
      }

      ._focus.on {
        background-image: url(${succIcon}) !important;
      }
      `

  const $dom = document.createElement('div')
  const $focus = document.createElement('div')
  $focus.className = '_focus'
  $dom.appendChild($style)
  $dom.appendChild($focus)

  addEvent($focus, fid)
  return $dom
}
function addEvent($focus, fid){
  $focus.isFocus = JSON.parse(localStorage.getItem('userInfo')).fids.includes(fid)
  if ($focus.isFocus) {
    $focus.classList.add('on')
  }
  $focus.onclick = addFocus
  function addFocus() {
    $focus.onclick = () => show('正在请求中请稍等')
    axios.get('/user/addFocusUser', { befid: fid, isFocus: $focus.isFocus }).then(
      res => {
        show(res.errorMsg)
        if ($focus.isFocus) { //之前是关注
          $focus.classList.remove('on')
          $focus.isFocus = false
          // session取消关注
          const obj = JSON.parse(localStorage.getItem('userInfo'))
          obj.fids.splice(obj.fids.indexOf(fid), 1)
          obj.focus.focusNub--
          localStorage.setItem('userInfo', JSON.stringify(obj))
        } else{
          $focus.classList.add('on')
          $focus.isFocus = true
          const obj = JSON.parse(localStorage.getItem('userInfo'))
          obj.fids.push(fid)
          obj.focus.focusNub++
          localStorage.setItem('userInfo', JSON.stringify(obj))
        }
        show(res.errorMsg)
      },
      err => show(err, 'fail')
    ).finally(
      ()=>{
        $focus.onclick = addFocus
      }
    )
  }
}

export {
  createFocus
}