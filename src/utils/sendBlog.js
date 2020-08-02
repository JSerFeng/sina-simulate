import { show } from "./showToast"
import axios from "./axios"

function createBlog() {
  const $style = document.createElement('style')
  $style.innerHTML = `._submit {
                        box-sizing: border-box;
                        padding: 15px;
                        margin: 0 0 15px;
                        width: 100%;
                        background-color: #fff;
                      }

                      ._submit h4 {
                        padding: 0;
                        margin: 0 0 5px;
                        font-size: 14px;
                        font-weight: normal;
                        color: #3480af;
                        box-sizing: border-box;
                      }

                      ._submit .blog-input {
                        resize: none;
                        box-sizing: border-box;
                        display: block;
                        width: 100%;
                        height: 68px;
                        border: 1px solid #ddd;
                      }

                      ._submit .blog-input:focus {
                        outline: none;
                        border: 1px solid #ff932d;
                      }

                      ._submit .footbar {
                        width: 100%;
                        height: 35px;
                        line-height: 35px;
                        font-size: 12px;
                        color: #808080;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                      }

                      ._submit .footbar img {
                        width: 20px;
                        height: 20px;
                        margin: 0 5px 0 0;
                        vertical-align: middle;
                      }

                      ._submit .footbar #file {
                        opacity: 0;
                      }

                      ._submit .footbar .file{
                        text-align: center;
                        display: block;
                        width: 50%;
                        line-height: 35px;
                        height: 35px;
                        white-space: nowrap;
                      }
                      ._submit .footbar .file::-webkit-scrollbar {
                        height: 5px
                      }
                      ._submit .footbar .file::-webkit-scrollbar-thumb{
                        background: #ff932d
                      }
                      ._submit .footbar .file::-webkit-scrollbar-track{
                        border-raius: 10px;
                        background: rgb(241, 241, 241)
                      }

                      ._submit .footbar :hover {
                        color: #eb7350;
                        cursor: pointer;
                      }

                      ._submit .footbar .sub-btn {
                        border: none;
                        color: #fff;
                        height: 80%;
                        padding: 0 1.5em;
                        background-color: #eb7350;
                      }

                      ._submit .footbar .sub-btn:focus {
                        outline: none;
                      }

                      ._submit .footbar .sub-btn:hover {
                        background-color: #ff932d;
                      }`

  const $container = document.createElement('div')
  $container.appendChild($style)
  $container.classList.add('_submit')
  $container.innerHTML += `
          <h4>有什么新鲜事想告诉大家？</h4>
          <textarea class="blog-input" name="blog-input"></textarea>
          <div class="footbar">
            <div class="emoji"><img src="../../imgs/emoji.png" alt="">表情</div>
            <input type="file" id="file" class="hide" name="image">
            <label for="file" class="file">上传图片或视频</label>
            <button class="sub-btn" name="sub">发布</button>
          </div>`

  addEvent($container)                   
  return $container
}
function addEvent ($container=document) {
  const $textArea = $container.getElementsByTagName('textarea')[0]
  const $subBtn = $container.getElementsByClassName('sub-btn')[0]
  const $label = $container.getElementsByClassName('file')[0]
  const $file = $container.getElementsByTagName('input')[0]
  const formDataMedia = new FormData()

  $file.onchange = e => {
    console.log($file.files[0].type);
    formDataMedia.set('upload', $file.files[0])

    if (!$file.files.length) {
      $label.innerText = '上传图片/视频' 
      $label.style['overflow-x'] = 'hidden'
      $label.style['overflow-y'] = 'hidden'
    } else {
      $label.style['overflow-x'] = 'scroll'
      $label.style['overflow-y'] = 'hidden'
    }
    Array.prototype.forEach.call($file.files, file => {
      $label.innerText += file.name + ' , '
    })
  }
  $subBtn.onclick = e => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    e.preventDefault()
    
    axios.post('/article/addArticle',{uid: user.uid+'', cid:1+'', aword:$textArea.value}).then(
      res => {
        if ($file.files[0].type === 'image/jpeg') {
          // 1-改用户头像,@param id:uid status
          // 2-改用户背景图 param id:pid
          return axios.post(`/upload/imageUpload?id=${res}&status=2`, formDataMedia, 'multipart/form-data')
        } else {
          return axios.post(`/upload/videoUpload?aid=${res}`, formDataMedia, 'multipart/form-data')
        }
      },
      err => show(err,'fail')
    ).then(
      res => {
        show(res.errorMsg)
      },
      err => {
        show(err)
      }
    )
    // axios.post('/article/addArticle?cid=1&uid='+user.uid, formDataMedia, 'multipart/formData').then(
    //   res => {
    //     console.log(res);
    //   },
    //   err => show(err, 'fail')
    // )
  }
}

export {
  createBlog
}