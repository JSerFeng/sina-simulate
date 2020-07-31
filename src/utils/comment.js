import axios from './axios'
import {show} from './showToast'
import emoji from '../imgs/emoji.png'
import anonymous from '../imgs/anonymous.png'
import thumbIcon from '../imgs/thumb.png'

class Comment {
  constructor(node, aid) {
    console.log(node, aid);
    this.node = node
    this.aid = aid
    this.addCss()
    this.getData()
  }
  addCss() {
    const $style = document.createElement('style')
    $style.innerHTML = `.comment {
  position: relative;
  width: 100%;
  background-color: #F2F2F5;
  box-shadow: 0 0 10px #e7e7e7;
}

.comment .sub {
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
}

.comment .sub .avatar {
  position: absolute;
  left: 16px;
  top: 16px;
  width: 30px;
  height: 30px;
}

.comment .sub .comment-r {
  margin-left: 46px;
  position: relative;
  height: 70px;
}

.comment .sub .comment-r input[type=textarea] {
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
}

.comment .sub .comment-r input[type=textarea]:focus {
  outline: none;
  border: 1px solid #eb7350;
}

.comment .sub .comment-r input[type=submit] {
  outline: none;
  background-color: #eb7350;
  border: none;
  color: #fff;
  padding: 5px 1em;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 2px;
}

.comment .sub .comment-r input[type=submit]:hover {
  background-color: #c06042;
}

.comment .sub .comment-r input[type=submit]:active {
  transform: scale(0.9);
}

.comment .sub .comment-r img {
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 10px;
  left: 0;
  display: block;
  cursor: pointer;
}

.comment .lists {
  margin: 0 16px 0 58px;
}

.comment .lists .list {
  font-size: 12px;
  padding: 10px 0;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #dfdfdf;
}

.comment .lists .list .avatar {
  width: 30px;
  height: 30px;
  display: block;
  margin-right: 10px;
}

.comment .lists .list .reply-name {
  color: #6097D6;
  margin-right: 10px;
}

.comment .lists .list .content {
  width: 100%;
  /* overflow: hidden; */
}

.comment .lists .list .content p {
  padding: 0;
  margin: 0 0 10px
}

.comment .lists .list .foot-bar {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #808080;
}

.comment .lists .list .foot-bar .thumb {
  width: 15px;
  height: 15px;
}

.comment .more {
  width: 100%;
  font-size: 12px;
  background-color: #fffae5;
  cursor: pointer;
  color: #808080;
  text-align: center;
}

.comment .more:hover {
  background-color: #ffefdb;
}`
    this.node.appendChild($style)
  }
  getData() {
    axios.get('/article/commentQuery', { aid: this.aid, currentPart: 1 }).then(
      res => {
        console.log(res);
        this.node.appendChild(this.buildComment(res))
      },
      err => {
        show('获取评论失败', 'fail')
      }
    )
  }
  // 返回构建好的评论DIV
  buildComment(res) {
    const userInfo = sessionStorage.getItem('userInfo') || {uimage: anonymous}
    // div是整体评论容器
    const div = document.createElement('div')
    div.className = 'comment'
    div.innerHTML = `
        <div class="sub">
          <img
            src=${userInfo.uimage}
            class="avatar">
          <div class="comment-r">
            <input type="textarea" >
            <input type="submit" value="评论">
            <img class="emoji" src=${emoji}>
          </div>
        </div>
      
        <div class="lists">
      </div>`
    const $lists = div.getElementsByClassName('lists')[0]

    // 点击获取更多的按钮
    const $more = document.createElement('div')
    $more.className = 'more'
    $more.innerText = '更多'
    $lists.appendChild($more)

    // 一条条评论添加到$lists

    res.list.forEach(data => {
      const list = document.createElement('div')
      list.className = 'list'
      list.innerHTML = `<img
              src=${data.user.uimage}
              class="avatar">
            <div class="content">
              <p class="detail"><span class="reply-name">${data.user.username}</span>${data.comments}</p>
              <div class="foot-bar">
                <div class="time">${new Date(data.cdate).toLocaleString()}</div>
                <div class="ilike ${data.commentLike == true ? 'on' : ''}">
                  <img src=${thumbIcon} class="thumb">
                  <span>${data.clikemount}</span>
                </div>
              </div>
            </div>`
      $lists.insertBefore(list, $lists.getElementsByClassName('more')[0])
    })


    // 整体结构构建后，添加事件
    this.addEvent(div)
    return div
  }
  addEvent(div) {
    const $lists = div.getElementsByClassName('lists')[0]
    let currentPart = 1
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const self = this

    function insertCom(user, value) {
      const list = document.createElement('div')
      list.className = 'list'
      list.innerHTML = `<img
              src=${user.uimage}
              class="avatar">
            <div class="content">
              <p class="detail"><span class="reply-name">${user.username}</span>${value}</p>
              <div class="foot-bar">
                <div class="time">${new Date().toLocaleString()}</div>
                <div class="ilike">
                  <img src=${thumbIcon} class="thumb">
                  <span>0</span>
                </div>
              </div>
            </div>`
      $lists.insertBefore(list, $lists.getElementsByClassName('more')[0])
    }

    // 获取更多评论
    const $more = div.getElementsByClassName('more')[0]
    $more.onclick = getMore  
    function getMore(e) {
      $more.onclick = null
      axios.get('/article/commentQuery', { aid: self.aid, currentPart: currentPart + 1 }).then(
        res => {
          if (res.list.length) {
            currentPart++
            res.list.forEach(list => {
              insertCom(list.user, list.comments)
            })
          } else {
            show('没有更多了~')
          }
        },
        err => {
          show('获取数据错误', 'fail')
        }
      ).finally(
        () => {
          $more.onclick = getMore
        }
      )
    }


    // 添加评论
    const $input = div.getElementsByTagName('input')[0]
    const $addBtn = div.getElementsByTagName('input')[1]
    $addBtn.onclick = addCom
    function addCom(e) {
      $addBtn.onclick = null
      e.preventDefault()
      if ($input.value) {
        axios.post('/article/addComment', { aid: self.aid, comments: $input.value }).then(
          res => {
            if ($lists.getElementsByClassName('list').length < currentPart * 10) {
              insertCom(userInfo, $input.value)
            }
            show(res.errorMsg)
          },
          err => {
            show('添加评论失败', 'fail')
          }
        ).finally(() => {
          $addBtn.onclick = addCom
        })
      } else {
        show('请输入评论！')
        $addBtn.onclick = addCom
      }
    }
  }
}


export {
  Comment
}