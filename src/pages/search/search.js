import './search.css'

//引入工具
import axios, { get } from '../../utils/axios'
import { Random } from 'mockjs'
import { reactive, effect } from '../../utils/reactive'
import { show } from '../../utils/showToast'
import { scrollEvent } from '../../utils/scroll'
// 引入图标
import commentsIcon from '../../imgs/comments.png'
import thumbIcon from '../../imgs/thumb.png'
import searchIcon from '../../imgs/search-icon.png'
import searchIconActive from '../../imgs/search-icon1.png'
import successImg from '../../imgs/success.png'
import loading from '../../imgs/loading.gif'
import err from '../../imgs/err.png'
import emoji from '../../imgs/emoji.png'
import keep from '../../imgs/keep.png'
import shareIcon from '../../imgs/share.png'
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
class Searching {
  constructor(method, url) {
    this.$search = document.querySelector('.search-input')
    this.$show = document.querySelector('.search-dragdown')
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
            isHot: Math.floor(Math.random() * 2)
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

    const btn = document.getElementsByClassName('search-icon-div')[0]
    btn.onclick = () => {
      axios.get(`/article/pageQuery`, { aword: this.$search.value }).then(
        res => {
          contentList.fresh(res.list)
        },
        err => {
          show('搜索失败了 ' + err)
        }
      )
    }
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
      this.$show.appendChild(div)
    })
  }
  btnEvent() {
    let userInfo
    const $log = document.getElementsByClassName('log-reg')[0]
    const $login = document.getElementsByClassName('log-reg')[0]
    const $user = document.getElementsByClassName('show-info')[0]
    const $username = $user.getElementsByClassName('user')[0]
    const $exit = document.getElementsByClassName('exit')[0]
    if (localStorage.getItem('userInfo')) {
      userInfo = JSON.parse(localStorage.getItem('userInfo'))
      $username.innerText = userInfo.username

      $user.onclick = () => {
        console.log('user点击');
        window.open('./user.html')
      }
      $log.classList.add('hide')
      $login.classList.add('hide')

      $user.classList.remove('hide')

      $exit.onclick = onClick
      function onClick(e) {
        e.stopPropagation()
        $exit.onclick = null
        console.log('exit点击');
        axios.post('/user/exit', {}).then(
          value => {
            localStorage.removeItem('userInfo')
            window.open('./search.html', '_self')
          },
          err => {
            show('注销失败', 'fail')
          }
        ).finally(() => {
          $exit.onclick = onClick
        })
      }
    } else {
      $user.classList.add('hide')
      $log.classList.remove('hide')
    }

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
      axios.get(`/article/pageQuery`, { aword: this.$search.value }).then(
        res => {
          contentList.fresh(res.list)
          contentList.addEvents(this.$search.value)
        },
        err => {
          show('搜索失败了 ' + err)
        }
      )
    }
  }
}
new Searching()


// Login
class Login$Register {
  constructor(method, url, data = {}) {
    this.mehod = method
    this.url = url
    this.data = data
    this.run()
  }
  // 移入移出变色，点击弹出登录窗口
  run() {
    const that = this
    const $login = document.querySelector('.login')
    const $register = document.querySelector('.register')
    // 移入变色
    $register.onmouseover = $login.onmouseover = function () {
      this.style.color = '#eb7350'
    }
    $login.onmouseout = $register.onmouseout = function () {
      this.style.color = '#6e6e6e'
    }
    // 点击事件
    $login.onclick = $register.onclick = function () {
      that.showToast(this.className)
    }

  }
  // 登陆注册弹出面板的字体切换大小，按钮内容切换，注册登陆切换，取消注册面板
  showToast(type) {
    const $toast = document.getElementsByClassName('toast')[0]
    const $log = document.getElementsByClassName('log')[0]
    const $reg = document.getElementsByClassName('reg')[0]
    const $main = document.getElementsByClassName('main')[0]
    const $mask = document.getElementsByClassName('cover')[0]
    const $cancelBtn = document.getElementsByClassName('cancel-log')[0]
    const $btn = document.getElementsByClassName('log-btn')[0]

    $mask.classList.remove('hide')
    // 初始化益处登陆或者注册字体变大
    $reg.classList.remove('active')
    $log.classList.remove('active')

    $main.classList.add('blur')
    $toast.classList.remove('hide')
    let observed = reactive({
      type: type
    })
    effect(() => {
      $btn.innerHTML = observed.type == 'login' ? '登陆' : '注册'
      if (observed.type == 'login') {
        $log.classList.add('active')
        $reg.classList.remove('active')
      } else {
        $reg.classList.add('active')
        $log.classList.remove('active')
      }
    })

    $log.onclick = $reg.onclick = function () {
      observed.type = this.className.indexOf('log') == -1 ? 'register' : 'login'
    }
    $mask.onclick = $cancelBtn.onclick = () => {
      $toast.classList.add('hide')
      $mask.classList.add('hide')
      $main.classList.remove('blur')
    }
    this.typing()
  }
  // 输入时的提示信息警告信息等，登陆注册按钮的隐藏显示和点击
  typing() {
    let timer = []
    const $toast = document.getElementsByClassName('form-content')[0]
    const spans = $toast.getElementsByTagName('span')
    const imgs = document.getElementsByClassName('state-img')
    const $inputs = $toast.getElementsByClassName('input')
    const $btn = document.getElementsByClassName('log-btn')[0]

    // 获取提示状态的图片
    let errMsg = ''
    // 每个输入框是否输入完成，
    const isFinish = reactive({
      value: Array(5).fill(0)
    })
    // 时刻检测按钮的隐藏和显示
    effect(() => {
      if ((isFinish.value.indexOf(0) == -1) || ($btn.innerHTML == '登陆' && isFinish.value[0] == 1 && isFinish.value[1] == 1))
        $btn.classList.remove('hide')
      else
        $btn.classList.add('hide')
    })

    Array.prototype.forEach.call($inputs, (input, i) => {
      input.addEventListener('keyup', e => {
        imgs[i].src = loading
        clearTimeout(timer[i])
        timer[i] = setTimeout(() => {
          errMsg = this.check(i, e.target.value)
          if (errMsg) {
            imgs[i].src = err
            isFinish.value[i] = 0
          } else {
            imgs[i].src = successImg
            isFinish.value[i] = 1
          }
          spans[i].innerHTML = errMsg
        }, 300)
      })
    })

    $btn.onclick = () => {
      let phone = $inputs[0].value
      let password = $inputs[1].value
      let username = $inputs[3].value
      let mail = $inputs[4].value

      const img = document.createElement('img')
      img.src = loading
      if ($btn.innerHTML === '登陆') {
        // axios this.method...
        axios.post('/user/login', {
          telephone: phone,
          password
        }).then(
          res => {
            if (!res.flag) {
              return Promise.reject(res.errorMsg)
            } else {
              return axios.post('/user/findLoginUser', {})
            }
          }, err => {
            return Promise.reject(err)
          }
        ).then(
          res => {
            if (res) {
              localStorage.setItem('userInfo', JSON.stringify(res))
              window.open('./user.html', '_self')
            }
          },
          err => {
            show('登陆失败 ' + err, 'fail')
          }
        ).finally(
          () => {
            $btn.removeChild(img)
            $btn.onclick = clickEvent
          }
        )
      } else {
        // axios this.method...
        axios.post('/user/register', {
          telephone: phone,
          password,
          username,
          email: mail
        }).then(res => {
          show('注册成功， 请登陆')
          $btn.removeChild(img)
        }, err => {
          show('注册失败，请检查网络\n' + err, 'fail');
          $btn.removeChild(img)

        })
      }
      $btn.appendChild(img)
    }
  }
  // 输入form表单的检测
  check(type, value) {
    let errMsg = ''
    switch (type) {
      // 手机号
      case 0:
        {
          const reg = /^1[3456789]\d{9}$/
          const result = reg.test(value)
          if (!result) {
            if (/^[\u0391-\uFFE5]+$/.test(value))
              errMsg = '不懂什么是手机号?'
            else if (/^[a-zA-Z_]+$/.test(value))
              errMsg = '你家手机号英文呐？'
            else if (value.length != 11)
              errMsg = '手机号长度错误'
            else
              errMsg = '输入有误'
          }
          break;
        }
      // 密码
      case 1:
        {
          if (value == '')
            errMsg = '输入为空'
          break;
        }
      // 确认密码
      case 2:
        {
          const password = document.getElementsByClassName('password')[0].value
          if (value.length == 0)
            errMsg = '输入为空'
          if (value != password)
            errMsg = '两次密码不一样'
          break;
        }
      // 用户名
      case 3:
        {
          if (value.length == 0)
            errMsg = '输入为空'
          break;
        }
      // 邮箱
      case 4:
        {
          const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
          const result = reg.test(value)
          if (!result)
            errMsg = '输入有误'
          break;
        }
      default:
        {
          throw new Error('输入类型错误');
        }
    }
    return errMsg
  }
}
new Login$Register('')


// 搜索结果列表
class ContentList {
  constructor(aword) {
    this.aword = aword
    this.getData()
  }
  fresh(data, isSearch = true) {
    // 创建列表的每一个微博
    const $con = document.getElementsByClassName('con-l')[0]
    if (isSearch) {
      $con.innerHTML = ''
    }
    data.forEach(list => {
      let div = document.createElement('div')
      div.className = 'card'
      div.setAttribute('data-aid', list.aid)
      let dom = `<img src=${list.user.uimage} class="avatar">
          <div class="content atc" data-aid=${list.aid}>
            <h1 class="title">${list.user.username}</h1>
            <p class="txt">${list.aword}</p>
            <img src=${list.aimage} class="pic">
            <div class="time">${new Date(list.adate).toLocaleString()}</div>
          </div>
          <div class="foot-bar">
            <div class="item ${list.flag.isfavorite == true ? 'on' : ''} center fav" data-status=${list.flag.isfavorite == true ? 1 : 0} data-aid=${list.aid}><img src=${keep}>收藏</div>
            <div class="item center"><img src=${shareIcon}>转发</div>
            <div class="item center open-fold"><img src=${commentsIcon}>评论</div>
            <div class="item center likes ${list.flag.islike == true ? 'on' : ''}" data-status=${list.flag.islike == true ? 1 : 0} data-aid=${list.aid}><img src=${thumbIcon} class="like }"><span class="likemount">${list.alikemount}</span></div>
          </div>`
      div.innerHTML = dom

      let lists = document.createElement('div')
      // lists.className = 'lists'
      // list.commentsLists.forEach(comment => {
      //   let list = document.createElement('div')
      //   list.className = 'list'
      //   let dom = `<img src=${comment.avatar} class="avatar">
      //         <div class="content">
      //           <p class="detail"><span class="reply-name">${comment.username}</span>${comment.content}</p>
      //           <div class="foot-bar">
      //             <div class="time">${comment.time}</div>
      //             <div>
      //               <img src=${thumbIcon} class="thumb">
      //               <span>${comment.like}</span>
      //             </div>
      //           </div>
      //         </div>`
      //   list.innerHTML = dom
      //   lists.appendChild(list)
      // })
      const contain = document.createElement('div')
      contain.setAttribute('style', 'margin-bottom:15px')
      contain.appendChild(div)
      $con.appendChild(contain)
    })
    this.addEvents()
  }
  addEvents(aword) {
    // 点赞和收藏
    const $likes = document.getElementsByClassName('likes')
    const $favs = document.getElementsByClassName('fav')
    const $mounts = document.getElementsByClassName('likemount')

    Array.prototype.forEach.call($likes, (like, i) => {
      like.onclick = e => {
        const status = parseInt(like.getAttribute('data-status'))
        const aid = like.getAttribute('data-aid')
        like.setAttribute('data-status', status ? 0 : 1)
        const mount = $mounts[i]
        axios.get('/article/changeLikeStatus', { status, aid }).then(
          res => {
            if (status) {
              like.classList.remove('on')
              mount.innerText = parseInt(mount.innerText) - 1
            } else {
              like.classList.add('on')
              mount.innerText = parseInt(mount.innerText) + 1
            }
          },
          err => {
            show('操作失败', 'fail')
          }
        )
      }
    })
    Array.prototype.forEach.call($favs, like => {
      like.onclick = e => {
        const status = parseInt(like.getAttribute('data-status'))
        const aid = like.getAttribute('data-aid')
        like.setAttribute('data-status', status ? 0 : 1)

        axios.get('/article/changeFavStatus', { status, aid }).then(
          res => {
            if (status) {
              like.classList.remove('on')
            } else {
              like.classList.add('on')
            }
          },
          err => {
            show('操作失败', 'fail')
          }
        )
      }
    })


    // 下滑到底部请求 
    let index = 2
    const that = this
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
          axios.get(`/article/pageQuery`, { currentPage: index, aword: aword ? aword : '' })
            .then(
              res => {
                prev = now
                if (res.list.length) {
                  that.fresh(res.list, false)
                  index++
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

    // 点击看详情
    const $atcs = document.getElementsByClassName('atc')
    Array.prototype.forEach.call($atcs, atc => {
      atc.onclick = () => {
        window.open(`./detail.html?aid=${atc.getAttribute('data-aid')}`)
      }
    })
    this.comment()
  }
  getData() {
    axios.get('/article/pageQuery', { cid: '', currentPage: '', aword: window.location.search.slice(7) }).then(res => {
      this.fresh(res.list)
    }, err => {
      alert('请先登陆')
      window.open('../index.html', '_self')
    })
    // this.fresh(baseData.contentList)
  }
  comment() {
    // 点开评论
    const $opens = document.getElementsByClassName('open-fold')
    
    Array.prototype.forEach.call($opens, open => {
      open.isOpen = false
      open.onclick = e => {
        const $comment = open.parentNode.parentNode.getElementsByClassName('comment')[0]
        if (open.isOpen) {
          open.isOpen = false
          $comment.classList.add('hide')
        } else {
          if ($comment) {
            $comment.classList.remove('hide')
          } else {
            const aid = open.parentNode.parentNode.getAttribute('data-aid')
            axios.get('/article/commentQuery', { aid }).then(
              res => {
                open.parentNode.parentNode.appendChild(this.initComment(res, aid))
              }
            )
          }
          
          open.isOpen = true
          
        }
      }
    })
  }
  initComment(res, aid) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
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
    this.appendComment($lists, res)
  
    const $more = document.createElement('div')
    let currentPart = 1
    $more.className = 'more'
    $more.innerText = '更 多'
    $more.onclick = getMore
    const self = this
    function getMore(e) {
      $more.onclick = null
      axios.get('/article/commentQuery',{aid, currentPart: currentPart+1}).then(
        res => {
          if (res.list.length) {
            currentPart++
            self.appendComment($lists, res)
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
    $lists.appendChild($more)
    div.appendChild($lists)

    //加评论
    const $value = div.getElementsByTagName('input')[0]
    const $subBtn = div.getElementsByTagName('input')[1]
    $subBtn.onclick = e => {
      e.preventDefault()
      console.log(aid);
      axios.post('/article/addComment',{comments: $value.value, aid:aid}).then(
        res => {
          if ($lists.getElementsByClassName('list').length >= currentPart * 10) {
            show('评论成功！')
          } else {
            const list = document.createElement('div')
            list.className = 'list'
            list.innerHTML = `<img
              src=${userInfo.uimage}
              class="avatar">
            <div class="content">
              <p class="detail"><span class="reply-name">${userInfo.username}</span>${$value.value}</p>
              <div class="foot-bar">
                <div class="time">${new Date().toLocaleString()}</div>
                <div class="ilike">
                  <img src=${thumbIcon} class="thumb">
                  <span>0</span>
                </div>
              </div>
            </div>`
            $lists.insertBefore(list, $lists.getElementsByClassName('more')[0])
            show('评论成功！')
          }
          
        },
        err => {
          show('添加评论失败','fail')
        }
      )
      
    }

    return div
  }
  appendComment($lists, res) {
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
  }
}
const contentList = new ContentList()




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