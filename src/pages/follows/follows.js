import './follows.css'
//引入工具
import { Comment } from '../../utils/comment'
import { createBlog } from '../../utils/sendBlog'
import axios, { get } from '../../utils/axios'
import { Random } from 'mockjs'
import { reactive, effect } from '../../utils/reactive'
import { show } from '../../utils/showToast'
import { scrollEvent } from '../../utils/scroll'
import { Searching, Login$Register } from '../../utils/SearchLogin'

// 引入图标
import editBgIcon from '../../imgs/edit_bg.png'
import commentsIcon from '../../imgs/comments.png'
import thumbIcon from '../../imgs/thumb.png'
import searchIcon from '../../imgs/search-icon.png'
import searchIconActive from '../../imgs/search-icon1.png'
import successImg from '../../imgs/success.png'
import loading from '../../imgs/loading.gif'
import err from '../../imgs/err.png'
import emoji from '../../imgs/emoji.png'
import favIcon from '../../imgs/keep.png'
import shareIcon from '../../imgs/share.png'
import { createFocus } from '../../utils/focus'
import { setStorage } from '../../utils/setStorage'


// axios().then()
const baseData = {
  // 输入搜索框时
  searching: [{
    val: Random.ctitle(Math.floor(Math.random() * 15)),
    isHot: true,
    aid: Random.integer(0, 999)
  },
  {
    val: Random.ctitle(Math.floor(Math.random() * 15)),
    isHot: true,
    aid: Random.integer(0, 999)
  },
  {
    val: Random.ctitle(Math.floor(Math.random() * 15)),
    isHot: false,
    aid: Random.integer(0, 999)
  },
  {
    val: Random.ctitle(Math.floor(Math.random() * 15)),
    isHot: true,
    aid: Random.integer(0, 999)
  }
  ],
  // 文章列表
  contentList: [{
    avatar: '//wx3.sinaimg.cn/orj360/68687195ly1ggq98l0t3cj20qo0y2wi6.jpg',
    authorName: Random.cname(),
    content: Random.cparagraph(0, 50),
    imgs: '//wx4.sinaimg.cn/orj360/6d09733fgy1ggjshn62yhj23402c0u0x.jpg',
    time: Random.datetime(),
    comments: Random.integer(0, 9999),
    like: Random.integer(0, 9999),
    commentsLists: [{
      avatar: 'https://tvax2.sinaimg.cn/crop.0.0.512.512.50/005Vpsflly8gfe6zrtz6qj30e80e80t5.jpg?KID=imgbed,tva&Expires=1594617476&ssig=kkQF9zivwH',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    }, {
      avatar: 'https://tvax2.sinaimg.cn/crop.0.0.512.512.50/005Vpsflly8gfe6zrtz6qj30e80e80t5.jpg?KID=imgbed,tva&Expires=1594617476&ssig=kkQF9zivwH',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    }, {
      avatar: 'https://tvax4.sinaimg.cn/crop.0.0.1002.1002.50/0078xzozly8gdc812dnz5j30ru0ruwg4.jpg?KID=imgbed,tva&Expires=1594617479&ssig=4XyzVoCe05',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    },]
  }, {
    avatar: 'https://tvax3.sinaimg.cn/crop.0.0.578.578.50/006k9dbSly8fr7gntvuqnj30hf0g2jsf.jpg?KID=imgbed,tva&Expires=1594617476&ssig=IGwV1R2wfK',
    authorName: Random.cname(),
    content: Random.cparagraph(0, 50),
    imgs: '//wx2.sinaimg.cn/orj360/68687195ly1ggjr6nc7pdj20yi25ckj9.jpg',
    time: Random.datetime(),
    comments: Random.integer(0, 9999),
    like: Random.integer(0, 9999),
    commentsLists: [{
      avatar: 'https://tvax2.sinaimg.cn/crop.0.0.512.512.50/005Vpsflly8gfe6zrtz6qj30e80e80t5.jpg?KID=imgbed,tva&Expires=1594617476&ssig=kkQF9zivwH',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    }, {
      avatar: 'https://tvax2.sinaimg.cn/crop.0.0.512.512.50/005Vpsflly8gfe6zrtz6qj30e80e80t5.jpg?KID=imgbed,tva&Expires=1594617476&ssig=kkQF9zivwH',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    }, {
      avatar: 'https://tvax4.sinaimg.cn/crop.0.0.1002.1002.50/0078xzozly8gdc812dnz5j30ru0ruwg4.jpg?KID=imgbed,tva&Expires=1594617479&ssig=4XyzVoCe05',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    },]
  }, {
    avatar: 'https://tvax2.sinaimg.cn/crop.0.0.512.512.50/005Vpsflly8gfe6zrtz6qj30e80e80t5.jpg?KID=imgbed,tva&Expires=1594617476&ssig=kkQF9zivwH',
    authorName: Random.cname(),
    content: Random.cparagraph(0, 100),
    imgs: '//wx2.sinaimg.cn/orj360/75d52cbdly1ggngxv8f1kj22tc240kjm.jpg',
    time: Random.datetime(),
    comments: Random.integer(0, 9999),
    like: Random.integer(0, 9999),
    commentsLists: [{
      avatar: 'https://tvax2.sinaimg.cn/crop.0.0.512.512.50/005Vpsflly8gfe6zrtz6qj30e80e80t5.jpg?KID=imgbed,tva&Expires=1594617476&ssig=kkQF9zivwH',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    }, {
      avatar: 'https://tvax2.sinaimg.cn/crop.0.0.512.512.50/005Vpsflly8gfe6zrtz6qj30e80e80t5.jpg?KID=imgbed,tva&Expires=1594617476&ssig=kkQF9zivwH',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    }, {
      avatar: 'https://tvax4.sinaimg.cn/crop.0.0.1002.1002.50/0078xzozly8gdc812dnz5j30ru0ruwg4.jpg?KID=imgbed,tva&Expires=1594617479&ssig=4XyzVoCe05',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    },]
  }, {
    avatar: 'https://tvax2.sinaimg.cn/crop.0.0.512.512.50/005Vpsflly8gfe6zrtz6qj30e80e80t5.jpg?KID=imgbed,tva&Expires=1594617476&ssig=kkQF9zivwH',
    authorName: Random.cname(),
    content: Random.cparagraph(0, 50),
    imgs: '//ww3.sinaimg.cn/orj360/67be458fgy1gglvovgistj208c0b4t9w.jpg',
    time: Random.datetime(),
    comments: Random.integer(0, 9999),
    like: Random.integer(0, 9999),
    commentsLists: [{
      avatar: 'https://tvax2.sinaimg.cn/crop.0.0.512.512.50/005Vpsflly8gfe6zrtz6qj30e80e80t5.jpg?KID=imgbed,tva&Expires=1594617476&ssig=kkQF9zivwH',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    }, {
      avatar: 'https://tvax2.sinaimg.cn/crop.0.0.512.512.50/005Vpsflly8gfe6zrtz6qj30e80e80t5.jpg?KID=imgbed,tva&Expires=1594617476&ssig=kkQF9zivwH',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    }, {
      avatar: 'https://tvax4.sinaimg.cn/crop.0.0.1002.1002.50/0078xzozly8gdc812dnz5j30ru0ruwg4.jpg?KID=imgbed,tva&Expires=1594617479&ssig=4XyzVoCe05',
      username: Random.cname(),
      content: Random.cparagraph(1, 10),
      like: Random.integer(0, 999999),
      time: Random.datetime()
    },]
  }],
  // 热搜排行
  hotRank: [{
    content: Random.ctitle(2, 8),
    isHot: Random.boolean(),
    read: Random.integer(0, 99999)
  }, {
    content: Random.ctitle(2, 8),
    isHot: Random.boolean(),
    read: Random.integer(0, 99999)
  }, {
    content: Random.ctitle(2, 8),
    isHot: Random.boolean(),
    read: Random.integer(0, 99999)
  }, {
    content: Random.ctitle(2, 8),
    isHot: Random.boolean(),
    read: Random.integer(0, 99999)
  }, {
    content: Random.ctitle(2, 8),
    isHot: Random.boolean(),
    read: Random.integer(0, 99999)
  }, {
    content: Random.ctitle(2, 8),
    isHot: Random.boolean(),
    read: Random.integer(0, 99999)
  }, {
    content: Random.ctitle(2, 8),
    isHot: Random.boolean(),
    read: Random.integer(0, 99999)
  }, {
    content: Random.ctitle(2, 8),
    isHot: Random.boolean(),
    read: Random.integer(0, 99999)
  }, {
    content: Random.ctitle(2, 8),
    isHot: Random.boolean(),
    read: Random.integer(0, 99999)
  }, {
    content: Random.ctitle(2, 8),
    isHot: Random.boolean(),
    read: Random.integer(0, 99999)
  }]
}

// 输入框
new Searching()


// Login
new Login$Register('')


class Init {
  constructor() {
    this.uid = window.location.search.slice(5)
    this.init()
    this.user = undefined
  }
  init() {
    const $wrap = document.getElementsByClassName('wrap_user')[0]
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const isMe = userInfo.uid == this.uid
    const self = this
    axios.get('/user/detailOne?uid=' + this.uid).then(
      user => {
        self.user = user
        $wrap.innerHTML += `
        <div class="banner" id="banner">
          <div class="avatar">
            <img src=${user.uimage} alt="${user.username + '的头像'}">
          </div>
          <div class="user_name">${user.username}</div>
          <p class="intro">${user.introduce}</p>
        </div>
        <div class="foobar">
          <span>主页</span>
        </div>`
        const $banner = document.getElementById('banner')
        $banner.style['background-image'] = `url(${user.userPhoto ? user.userPhoto.bigphoto : '../../imgs/user_bg_b.jpg'})`
        this.addBlog()
        this.addEvent()
      },
      err => show('请检查网络，错误状态：' + err)
    )
  }
  addBlog() {
    const uid = window.location.search.slice(5)
    const $blog = document.getElementsByClassName('blog')[0]
    const self = this
    const isMe = uid === JSON.parse(localStorage.getItem('userInfo')).uid
    if (isMe) {
      $blog.appendChild(createBlog())
    }
    axios.get('/article/findOwnArticle', { uid, currentNub: 1 })
      .then(
        res => self.addList($blog, res)
      )
  }
  adding(node, lists, isSearch) {
    if (isSearch) {
      node.innerHTML = null
    }
    const self = this
    lists.forEach(list => {
      const $list_wrap = document.createElement('div')
      $list_wrap.classList.add('list-wrap')
      $list_wrap.innerHTML += `
        <div class="_main">
          <div class="_ava">
            <img src=${list.uimage} alt=${list.username}>
          </div>
          <div class="_contain">
            <h4>${self.user.username}</h4>
            <p>${list.aword}</p>
            ${list.aimage ? `<img src=${list.aimage} class="_aimage">` : ''}
            ${list.avideo ? `<video controls src=${list.avideo} class="_avideo">` : ''}
            <span class="_t">${new Date(list.adate).toLocaleString()}</span>
          </div>
        </div>
        <div class="_sub">
          <div class="_item ${list.flag.isfavorite ? 'on' : ''}">
            <img src=${favIcon}>
          </div>
          <div class="_item">
            <img src=${commentsIcon}>
            <span>评论</span>
          </div>
          <div class="_item ${list.flag.islike ? 'on' : ''}">
            <img src=${thumbIcon} class="">
            <span>${list.alikemount}</span>
          </div>
        </div>
      `
      const $comBtn = $list_wrap.getElementsByClassName('_item')[1]
      $comBtn.isOpen = false
      $comBtn.onclick = openCom

      function openCom() {
        const $comment = $list_wrap.getElementsByClassName('comment')[0]
        if ($comBtn.isOpen) {
          $comBtn.isOpen = false
          $comment.classList.add('hide')
        } else {
          if ($comment) {
            $comBtn.isOpen = true
            $comment.classList.remove('hide')
            return
          }
          $comBtn.isOpen = true
          new Comment($list_wrap, list.aid)
        }
      }
      node.appendChild($list_wrap)
    })
  }
  addList(node, lists, isSearch = false) {
    const uid = window.location.search.slice(5)
    const self = this
    this.adding(node, lists, isSearch)

    let index = 2
    let prev = new Date().getTime()
    let now = new Date().getTime()
    window.onscroll = handler

    function handler() {
      now = new Date().getTime()

      if (now - prev >= 1000) {
        const top = document.documentElement.scrollTop || document.body.scrollTop
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        const isBottom = !Math.floor(Math.abs(top + document.documentElement.clientHeight - scrollHeight))
        if (isBottom) {
          prev = Infinity
          window.onscroll = null
          axios.get('/article/findOwnArticle', { uid, currentNub: index })
            .then(
              res => {
                prev = now
                if (res.length) {
                  index++
                  self.adding(node, res)
                } else {
                  show('没有更多了~')
                }
                window.onscroll = handler
              },
              err => {
                show(`请求失败 ${err}`, 'fail')
              }
            )
        }
      }
    }
  }
  addEvent() {
    let isUser = this.uid == JSON.parse(localStorage.getItem('userInfo')).uid
    const $focus = document.getElementsByClassName('focus')[0]
    const $befocus = document.getElementsByClassName('befocus')[0]
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    // 右边点击事件
    const $lis = document.getElementsByClassName('pic_main')[0].getElementsByClassName('lists')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')
    const $rights = document.getElementsByClassName('swap')[0].children

    let prev = 0
    Array.prototype.forEach.call($lis, (li, i) => {
      li.onclick = () => {
        $lis[prev].classList.remove('on')
        $rights[prev].classList.add('hide')
        prev = i
        // 关注列表
        if (i === 1) {
          axios.get('/user/findUserList', { uid: this.uid, status: 0 }).then(
            res => {
              $focus.innerHTML = `<h1 class="title">${isUser ? '' : 'TA的'}关注 ${res.list.length}</h1>
            <div class="focus_wrap">
            </div>`
              const $focus_wrap = $focus.getElementsByClassName('focus_wrap')[0]
              res.list.forEach(list => {
                const $add = document.createElement('div')
                $add.className = 'item'
                $add.innerHTML = `
                <div class="after" style="background-image:url(${list.userPhoto ? list.userPhoto.bigphoto : '../../imgs/user_bg.jpg'})"></div>
                <div class="avatar" data-uid=${list.uid}>
                  <img src=${list.uimage} alt=${list.username + '的头像'}>
                </div>
                <div>
                  <h4 class="username">${list.username}</h4>
                  <span>关注：${list.focus.focusNub}  粉丝：${list.focus.befocusNub}</span>
                  <p>${list.introduce}</p>
                </div>`
                $add.getElementsByClassName('username')[0].parentNode.appendChild(createFocus(list.uid))
                $add.getElementsByClassName('avatar')[0].onclick = e => {
                  window.open('./follows.html?uid=' + list.uid)
                }
                $focus_wrap.appendChild($add)
              })
              $lis[i].classList.add('on')
              $rights[i].classList.remove('hide')
            },
            err => show('请检查你的网络' + err, 'fail')
          )
        }
        if (i == 2) {
          // 粉丝列表
          axios.get('/user/findUserList', { uid: this.uid, status: 1 }).then(
            res => {
              $befocus.innerHTML = `<h1 class="title">${isUser ? '' : 'TA的'}粉丝 ${res.list.length}</h1>
            <div class="focus_wrap">
            </div>`
              const $focus_wrap = $befocus.getElementsByClassName('focus_wrap')[0]
              res.list.forEach(list => {
                const $add = document.createElement('div')
                $add.className = 'item'
                $add.innerHTML = `
                 <div class="after" style="background-image:url(${list.userPhoto ? list.userPhoto.bigphoto : '../../imgs/user_bg.jpg'})"></div>
                <div class="avatar" data-uid=${list.uid}>
                  <img src=${list.uimage} alt="${list.username + '的头像'}">
                </div>
                <div>
                  <h4 class="username">${list.username}</h4>
                  <span>关注：${list.focus.focusNub}  粉丝：${list.focus.befocusNub}</span>
                  <p>${list.introduce}</p>
                </div>`
                console.log($add.getElementsByClassName('username')[0].parentNode);
                $add.getElementsByClassName('username')[0].parentNode.appendChild(createFocus(list.uid))

                $add.getElementsByClassName('avatar')[0].onclick = e => {
                  window.open('./follows.html?uid=' + list.uid)
                }

                $focus_wrap.appendChild($add)
              })
              $lis[i].classList.add('on')
              $rights[i].classList.remove('hide')
            },
            err => show('请检查你的网络' + err, 'fail')
          )
        }
      }
    })

    // 改大小背景图
    const $banner = document.getElementById('banner')
    const $main = document.body

    const $b_file = document.getElementById('bg_b')
    const $s_file = document.getElementById('bg_s')
    const bgdata = new FormData()
    $b_file.onchange = $s_file.onchange = function () {
      console.log(this);
      bgdata.set('upload', this.files[0])
      const self = this
      const isBig = self === $b_file
      console.log(isBig);
      axios.post(`/upload/imageUpload?id=${userInfo.userPhoto.pid}&status=${isBig ? 3 : 4}`, bgdata, 'multipart/form-data')
        .then(
          res => {
            if (isBig) {
              let newBg = URL.createObjectURL($b_file.files[0])
              $main.style['background-image'] = `url(${newBg})`
              userInfo.userPhoto.bigphoto = newBg
            } else {
              let newBg = URL.createObjectURL($s_file.files[0])
              $banner.style['background-image'] = `url(${newBg})`
              userInfo.userPhoto.smallphoto = newBg
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))

            show(res.errorMsg)
          },
          err => {
            show(err)
          }
        )
    }
  }
}
new Init()