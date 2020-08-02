// css
import './user.css'
// 引入工具
import axios from '../../utils/axios'
import Mock from 'mockjs'
import { createElement, render } from '../../utils/vdom2dom'
import { reactive, effect } from '../../utils/reactive'
import { show } from '../../utils/showToast'
import { createBlog } from '../../utils/sendBlog'
import { Searching, Login$Register } from '../../utils/SearchLogin'

// 用户图片
import userBg from '../../imgs/user_bg.jpg'

// 引入图标地址
import commentsIcon from '../../imgs/comments.png'
import commentsActive from '../../imgs/comments-active.png'
import thumbIcon from '../../imgs/thumb.png'
import thumbActive from '../../imgs/thumb-active.png'
import searchIcon from '../../imgs/search-icon.png'
import searchIconActive from '../../imgs/search-icon1.png'
import successImg from '../../imgs/success.png'
import loading from '../../imgs/loading.gif'
import err from '../../imgs/err.png'
import emoji from '../../imgs/emoji.png'

const Random = Mock.Random
const c = createElement

// 模拟请求到的数据
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
// 搜索框输入时展示热度排行（加防抖）
new Searching()


// 获取用户数据
class Init {
  constructor() {
    this.init()
  }
  init() {
    show('点击头像和头像后的背景即可切换背景噢')
    const $user = document.getElementsByClassName('user')[0]
    const $avatar = document.getElementsByClassName('avatar')[0]
    const $name = document.getElementsByClassName('myname')[0]
    const $editName = $name.parentNode.getElementsByTagName('a')[0]
    const $intro = document.getElementsByClassName('intro')[0]
    const $edit = document.getElementsByClassName('edit')[0]
    const $toFollows = document.getElementsByClassName('toFollows')[0]
    const $bg = document.getElementsByClassName('Bg')[0]


    let userInfo
    if (userInfo = JSON.parse(localStorage.getItem('userInfo'))) {
      $user.innerText = `${userInfo.username}`
      $avatar.style['background-image'] = `url(${userInfo.uimage})`
      $name.innerText = userInfo.username
      $intro.innerText = userInfo.introduce
      $editName.isOpen = false
      $editName.onclick = () => editIntro($editName)
      $edit.isOpen = false
      $edit.onclick = () => editIntro($edit)
      $bg.style['background-image'] = `url(${userInfo.userPhoto.bigphoto})`


      // 前往个人页
      $toFollows.onclick = () => {
        window.open(`./follows.html?uid=${userInfo.uid}`)
      }


      // 隐藏输入框
      function close(msg, node) {
        msg.classList.remove('hide')
        const $inputs = node.parentNode.getElementsByTagName('input');
        Array.prototype.forEach.call($inputs, input => input.classList.add('hide'))
      }
      // 修改简介
      function editIntro(node) {
        console.log(node);
        if (node.isOpen) {
          node.isOpen = false
          close(node.parentNode.getElementsByTagName('span')[0], node)
        } else {
          node.isOpen = true
          node.parentNode.getElementsByTagName('span')[0].classList.add('hide')

          const $input = node.parentNode.getElementsByTagName('input')[0]
          const $btn = node.parentNode.getElementsByTagName('input')[1]

          $input.classList.remove('hide')
          $btn.classList.remove('hide')

          $btn.onclick = subIntro
          function subIntro() {
            $btn.onclick = null
            const p = node === $edit ? axios.post('/user/setIntroduce', { introduce: $input.value }) : axios.get('/user/setUsername', { username: $input.value ,uid: parseInt(userInfo.uid) })
            p.then(
              res => {
                if (res.flag) {
                  node.parentNode.getElementsByTagName('span')[0].innerText = $input.value
                  const user = JSON.parse(localStorage.getItem('userInfo'))
                  node === $edit ? user.introduce = $input.value : user.username = $input.value
                  localStorage.setItem('userInfo', JSON.stringify(user))
                  close(node.parentNode.getElementsByTagName('span')[0], node)
                }
                show(res.errorMsg)
              },
              err => show(err, 'fail')
            ).finally(() => {
              $btn.onclick = subIntro
            })
          }
        }
      }
    } else {
      alert(localStorage.getItem('userInfo'))
      window.open('../index.html', '_self')
    }

    // 关注数量
    const $foc = document.getElementsByClassName('_li')[0].getElementsByTagName('h1')[0]
    const $bef = document.getElementsByClassName('_li')[1].getElementsByTagName('h1')[0]

    $foc.innerText = JSON.parse(localStorage.getItem('userInfo')).focus.focusNub
    $bef.innerText = JSON.parse(localStorage.getItem('userInfo')).focus.befocusNub

    // 改头像
    const $file = document.getElementById('avatar-image')

    $file.onchange = changeAvatar
    function changeAvatar() {
      const file = URL.createObjectURL($file.files[0])
      const formDataMedia = new FormData()
      formDataMedia.set('upload', $file.files[0])
      axios.post(`/upload/imageUpload?id=${userInfo.uid}&status=1`, formDataMedia, 'multipart/form-data')
        .then(
          res => {
            show(res.errorMsg)
            $avatar.style['background-image'] = `url(${file})`
          },
          err => show(err, 'fail')
        )
    }

    // 改背景
    const $userBgFile = document.getElementById('user_bg_file')
    const $bgLabel = document.getElementsByClassName('Bg')[0]
    const $bgData = new FormData()

    $userBgFile.onchange = e => {
      $bgData.set('upload', $userBgFile.files[0])
      axios.post(`/upload/imageUpload?id=${userInfo.userPhoto.pid}&status=4`, $bgData, 'multipart/form-data')
        .then(
          res => {
            show(res.errorMsg)
            $bgLabel.style['background-image'] = `url(${URL.createObjectURL($userBgFile.files[0])})`
          },
          err => {
            show(err, 'fail')
          }
        )
    }
  }
}
new Init()

// 微博页面
class ContentList {
  constructor() {
    this.getData()
  }
  fresh(data = []) {
    const $mid = document.getElementsByClassName('mid')[0]
    $mid.insertBefore(createBlog(), $mid.children[0])

    // 创建列表的每一个微博
    const $con = document.getElementsByClassName('con-l')[0]
    data.forEach(list => {
      let div = document.createElement('div')
      div.className = 'card'
      let dom = `<img src=${list.avatar} class="avatar">
          <div class="content">
            <h1 class="title">${list.authorName}</h1>
            <p class="txt">${list.content}</p>
            <img src=${list.imgs} class="pic">
            <div class="time">${list.time}</div>
          </div>
          <div class="foot-bar">
            <div class="item center">收藏</div>
            <div class="item center">转发</div>
            <div class="item center open-fold">评论${list.comments}</div>
            <div class="item center"><img src=${thumbIcon} class="like">${list.like}</div>
          </div>`
      div.innerHTML = dom
      let commentDiv = document.createElement('div')
      commentDiv.className = 'comment hide'
      commentDiv.innerHTML = `<div class="sub">
            <img src="https://tvax4.sinaimg.cn/crop.0.0.1002.1002.50/005GnyQZly8gbw9lljbr8j30ru0ruq68.jpg?KID=imgbed,tva&Expires=1594559187&ssig=uU%2BPJPHyeD" class="avatar">
            <div class="comment-r">
              <input type="textarea" class="textarea">
              <input type="submit" value="评论" class="_submit">
              <img class="emoji" src=${emoji}>
            </div>
          </div>`
      let lists = document.createElement('div')
      lists.className = 'lists'
      list.commentsLists.forEach(comment => {
        let list = document.createElement('div')
        list.className = 'list'
        let dom = `<img src=${comment.avatar} class="avatar">
              <div class="content">
                <p class="detail"><span class="reply-name">${comment.username}</span>${comment.content}</p>
                <div class="foot-bar">
                  <div class="time">${comment.time}</div>
                  <div>
                    <img src=${thumbIcon} class="thumb">
                    <span>${comment.like}</span>
                  </div>
                </div>
              </div>`
        list.innerHTML = dom
        lists.appendChild(list)
      })
      commentDiv.appendChild(lists)
      const divContainer = document.createElement('div')
      divContainer.setAttribute('style', 'margin:0 0 15px')
      divContainer.appendChild(div)
      divContainer.appendChild(commentDiv)
      $con.appendChild(divContainer)
    })

    this.addEvents()
  }
  addEvents() {
    // 给评论添加点击事件控制评论的显示隐藏
    const $opens = document.getElementsByClassName('open-fold')
    const $comments = document.getElementsByClassName('comment')

    let isOpen = Array($opens.length).fill(0) //表示是否打开
    for (let i = 0; i < $opens.length; i++) {
      $opens[i].onclick = function () {
        if (isOpen[i]) $comments[i].classList.add('hide')
        else $comments[i].classList.remove('hide')
        isOpen[i] = !isOpen[i]
      }
    }
  }
  getData() {
    // axios.get('/comments').then(res => {
    //   this.fresh(res)
    // })
    this.fresh(baseData.contentList)
  }
}
new ContentList()

//热门排行
class HotRank {
  constructor(method, url) {
    this.getData(method, url)
  }
  init(data = []) {
    const $ul = document.getElementsByClassName('rank')[0]
    data.forEach((li, i) => {
      let $li = document.createElement('li')
      $li.innerHTML = `<span>${i + 1}</span>
                  <a href="#">
                    ${li.content}
                    <div class="hot-tag">热</div>
                  </a>
                  <span>${li.read}</span>`
      if (!li.isHot)
        $li.getElementsByClassName('hot-tag')[0].classList.add('hide')
      $ul.appendChild($li)
    })
  }
  getData(method, url) {
    // axios(method, url).then(
    //   res => {
    //     this.init(res)
    //   },
    //   err => {
    //     console.log('请求热搜排行失败：'+err);
    //   }
    // )
    this.init(baseData.hotRank)
  }
}
new HotRank('get', '/rank')