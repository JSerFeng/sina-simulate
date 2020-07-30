// css
import './user.css'
// 引入工具
import axios from '../../utils/axios'
import Mock from 'mockjs'
import { createElement, render } from '../../utils/vdom2dom'
import { reactive, effect } from '../../utils/reactive'
import { show } from '../../utils/showToast'

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
class Searching {
  constructor(method, url) {
    this.$search = document.querySelector('.search-input')
    this.$show = document.querySelector('.search-dragdown')
    this.focus = false
    this.mehod = method,
      this.url = url,
      this.onTyping()
    this.btnEvent()
  }
  // 基础防抖 **
  onTyping() {
    let timer //定时器
    this.$search.addEventListener('keyup', ({ target }) => {
      if (timer)
        clearTimeout(timer);
      timer = setTimeout(() => {
        // axios
        // let res 
        // axios(this.mehod, this.url).then(data=>{
        //   this.refresh(data)
        // })
        let randNum = Math.floor(Math.random() * 10)
        for (let i = 0; i < randNum; i++) {
          baseData.searching[i] = {
            val: Random.ctitle(Math.floor(Math.random() * 15)),
            isHot: Math.floor(Math.random() * 2),
            aid: Random.integer(0, 999)
          }
        }
        this.refresh(baseData.searching)
      }, 500)
    }),
      this.$search.addEventListener('blur', ({ target }) => {
        if (!this.focus)
          this.$show.classList.add("hide")
      }),
      this.$search.addEventListener('focus', ({ target }) => {
        this.$show.classList.remove("hide")
        // axios
        // let res 
        // axios(this.mehod, this.url, '/').then(data=>{
        //   this.refresh(data)
        // })
        let randNum = Math.floor(Math.random() * 10)
        for (let i = 0; i < randNum; i++) {
          baseData.searching[i] = {
            val: Random.ctitle(Math.floor(Math.random() * 15)),
            isHot: Math.floor(Math.random() * 2),
            aid: Random.integer(0, 999)
          }
        }

        this.refresh(baseData.searching)
      })
    this.$show.onmouseover = () => { this.focus = true }
    this.$show.onmouseout = () => { this.focus = false }

  }
  refresh(res) {
    this.$show.innerHTML = `<div style="color:#eb7350" class="li">查看完整热搜榜》</div>`
    res.forEach((data, i) => {
      const div = document.createElement('div')
      const round = document.createElement('span')
      round.innerHTML = i + 1
      round.classList.add('round')
      div.appendChild(round)
      const span = document.createElement('span')
      span.innerHTML = data.val
      div.appendChild(span)
      if (data.isHot) {
        const hotTag = document.createElement('span')
        hotTag.classList.add('hot-tag')
        hotTag.classList.add('center')
        hotTag.innerHTML = '热'
        div.appendChild(hotTag)
      }
      div.classList.add('li')
      div.onclick = () => {
        window.open(`./search.html?${data.isHot}`, '_self')
      }
      this.$show.appendChild(div)
    })
  }
  btnEvent() {
    // 鼠标移入搜索图标变色
    const $search = document.getElementsByClassName('search-icon')[0]
    $search.onmouseover = () => {
      $search.src = searchIconActive
    }
    $search.onmouseout = () => {
      $search.src = searchIcon
    }
    // 点击搜索
    $search.onclick = () => {
      // axios
      window.open(`./search.html?aword=${this.$search.value}`, '_self')
    }

    const $exit = document.getElementsByClassName('exit')[0]
    $exit.onclick = () => {
      axios.post('/user/exit', {}).then(
        res => {
          localStorage.removeItem('userInfo')
          window.open('../index.html', '_self')
        },
        err => {
          show('注销失败', 'fail')
        }
      )
    }
  }
}
new Searching()


// 获取用户数据
class Init {
  constructor() {
    this.init()
  }
  init() {
    const $user = document.getElementsByClassName('user')[0]
    const $avatar = document.getElementsByClassName('avatar')[0]
    const $name = document.getElementById('user-name')

    let userInfo
    if (userInfo = JSON.parse(localStorage.getItem('userInfo'))) {
      $user.innerText = `${userInfo.username}`
      $avatar.src = userInfo.uimage
      $name.innerText = userInfo.username
    } else {
      window.open('../index.html', '_self')
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
    // 给评论提交添加事件, 给提交按钮添加提交事件
    const $textareas = document.getElementsByClassName('textarea')
    const $submits = document.getElementsByClassName('_submit')
    let value = ''
    for (let i = 0; i < $textareas.length; i++) {
      $textareas[i].onkeyup = function ({ target }) {
        value = target.value
      }
      /**
       * 添加评论
       */
      $submits[i].onclick = submit

      function submit({ target }) {
        $submits[i].onclick = null
        $submits[i].classList.add('ban')
        // 请求数据成功后
        axios('post', 'comment', {
          value
        }).then(
          res => {
            //...
            $lists.appendChild(div)
            $submits[i].onclick = null
            $submits.value = '...'
          },
          err => {
            alert(err)
            $submits[i].onclick = submit
            $submits[i].classList.remove('ban')
          }
        )
        let time = new Date().toLocaleString()
        let name = localStorage.getItem('userinfo')
        let $lists = target.parentNode.parentNode.parentNode.getElementsByClassName('lists')[0]
        let dom = `<img src="https://tvax4.sinaimg.cn/crop.0.0.1002.1002.50/005GnyQZly8gbw9lljbr8j30ru0ruq68.jpg?KID=imgbed,tva&Expires=1594559187&ssig=uU%2BPJPHyeD" class="avatar">
              <div class="content">
                <p class="detail"><span class=${name}>ly456454</span>${value}</p>
                <div class="foot-bar">
                  <div class="time">${time}</div>
                  <div>
                    <img src=${thumbIcon} class="thumb">
                    <span>0</span>
                  </div>
                </div>
              </div>`
        const div = document.createElement('div')
        div.className = 'list'
        div.innerHTML = dom
        // $lists.appendChild(div) //请求成功后执行promise中的这个语句，写在这里作提醒
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