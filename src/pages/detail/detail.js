import './detail.css'
// import '../../utils/comment.css'

// 引入工具
import {Comment} from '../../utils/comment'
import axios from '../../utils/axios'
import Mock from 'mockjs'
import { createElement, render } from '../../utils/vdom2dom'
import { reactive, effect } from '../../utils/reactive'
import { show } from '../../utils/showToast'

// 引入图标地址
import anonymous from '../../imgs/anonymous.png'
import emoji from '../../imgs/emoji.png'
import favIcon from '../../imgs/keep.png'
import shareIcon from '../../imgs/share.png'
import commentsIcon from '../../imgs/comments.png'
import thumbIcon from '../../imgs/thumb.png'
import searchIcon from '../../imgs/search-icon.png'
import searchIconActive from '../../imgs/search-icon1.png'
import successImg from '../../imgs/success.png'
import loading from '../../imgs/loading.gif'
import err from '../../imgs/err.png'

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
  // 轮播图数据
  slide: [
    [{
      imgUrl: 'https://wx3.sinaimg.cn/large/59853be1ly1ggiawyleosj20f408i7b3.jpg',
      title: Random.ctitle(6),
      discuss: Random.integer(0, 13524),
      read: Random.integer(0, 13524)
    },
    {
      imgUrl: 'https://wx1.sinaimg.cn/large/59853be1ly1gghi099d6aj20c80c8wmx.jpg',
      title: Random.ctitle(6),
      discuss: Random.integer(0, 13524),
      read: Random.integer(0, 13524)
    },
    {
      imgUrl: 'https://wx1.sinaimg.cn/large/78ed3187ly1ggheph45dij20dw0dwmyy.jpg',
      title: Random.ctitle(6),
      discuss: Random.integer(0, 13524),
      read: Random.integer(0, 13524)
    }
    ],
    [{
      imgUrl: 'https://wx3.sinaimg.cn/large/9e5389bbly1ggicmlw160j20dw0dwgnr.jpg',
      title: Random.ctitle(6),
      discuss: Random.integer(0, 13524),
      read: Random.integer(0, 13524)
    },
    {
      imgUrl: 'https://wx2.sinaimg.cn/large/71482140ly1ggi4r3v1stj20bz0bzjrt.jpg',
      title: Random.ctitle(6),
      discuss: Random.integer(0, 13524),
      read: Random.integer(0, 13524)
    },
    {
      imgUrl: 'https://wx3.sinaimg.cn/large/9e5389bbly1ggho4f1inpj20dw0dw0ut.jpg',
      title: Random.ctitle(6),
      discuss: Random.integer(0, 13524),
      read: Random.integer(0, 13524)
    }
    ],
    [{
      imgUrl: 'https://wx4.sinaimg.cn/large/59853be1ly1ggi2xib87nj20f408in4x.jpg',
      title: Random.ctitle(6),
      discuss: Random.integer(0, 13524),
      read: Random.integer(0, 13524)
    },
    {
      imgUrl: 'https://wx1.sinaimg.cn/large/a716fd45ly1ggi3u6f9glj20dw0dwwew.jpg',
      title: Random.ctitle(6),
      discuss: Random.integer(0, 13524),
      read: Random.integer(0, 13524)
    },
    {
      imgUrl: 'https://wx1.sinaimg.cn/large/78ed3187ly1ggheph45dij20dw0dwmyy.jpg',
      title: Random.ctitle(6),
      discuss: Random.integer(0, 13524),
      read: Random.integer(0, 13524)
    }
    ],
  ],
  //请求列表
  lists: [{
    avatar: Random.dataImage('158x102'),
    username: Random.cname(),
    dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    comments: Random.integer(0, 9999999),
    thumbs: Random.integer(0, 9999999),
    title: Random.cparagraph(5, 81),
    video: 'https://www.bilibili.com/ef3d21b6-8265-4179-bb3a-f1096845b13c',
    keyword: Random.ctitle(4, 15),
    discuss: Random.integer(0, 15611651),
    read: Random.integer(0, 16516516516),
    cid: Random.integer(0, 99999)
  }, {
    avatar: Random.dataImage('158x102'),
    username: Random.cname(),
    dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    comments: Random.integer(0, 9999999),
    thumbs: Random.integer(0, 9999999),
    title: Random.cparagraph(5, 81),
    img: 'https://wx3.sinaimg.cn/thumb180/007cfdbygy1ggic85xqtsj30qo0vy0us.jpg',
    keyword: Random.ctitle(4, 15),
    discuss: Random.integer(0, 15611651),
    read: Random.integer(0, 16516516516),
    cid: Random.integer(0, 99999)
  }, {
    avatar: Random.dataImage('158x102'),
    username: Random.cname(),
    dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    comments: Random.integer(0, 9999999),
    thumbs: Random.integer(0, 9999999),
    title: Random.cparagraph(5, 81),
    img: 'https://wx3.sinaimg.cn/thumb180/6a5ce645ly1gghg8n5qlrj20dw0990t9.jpg',
    keyword: Random.ctitle(4, 15),
    discuss: Random.integer(0, 15611651),
    read: Random.integer(0, 16516516516),
    cid: Random.integer(0, 99999)
  }, {
    avatar: Random.dataImage('158x102'),
    username: Random.cname(),
    dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    comments: Random.integer(0, 9999999),
    thumbs: Random.integer(0, 9999999),
    title: Random.cparagraph(5, 81),
    video: 'https://www.bilibili.com/663e5f84-22b0-4de9-b418-84d98f757335',
    keyword: Random.ctitle(4, 15),
    discuss: Random.integer(0, 15611651),
    read: Random.integer(0, 16516516516),
    cid: Random.integer(0, 99999)
  }, {
    avatar: Random.dataImage('158x102'),
    username: Random.cname(),
    dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    comments: Random.integer(0, 9999999),
    thumbs: Random.integer(0, 9999999),
    title: Random.cparagraph(5, 81),
    img: 'https://wx1.sinaimg.cn/thumb180/a1c3de7ely1gghdic621wj20u00u0dnj.jpg',
    keyword: Random.ctitle(4, 15),
    discuss: Random.integer(0, 15611651),
    read: Random.integer(0, 16516516516),
    cid: Random.integer(0, 99999)
  }, {
    avatar: Random.dataImage('158x102'),
    username: Random.cname(),
    dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    comments: Random.integer(0, 9999999),
    thumbs: Random.integer(0, 9999999),
    title: Random.cparagraph(5, 81),
    video: 'https://f.video.weibocdn.com/001FrP5rgx07EEphm3rN010412014GCM0E010.mp4?label=mp4_hd&template=852x480.25.0&trans_finger=1621fcd5d40969f1c74e6b06e52fcd54&ori=0&ps=4ub7gI97adQ&Expires=1594176581&ssig=2MAq1oTYVq&KID=unistore,video',
    keyword: Random.ctitle(4, 15),
    discuss: Random.integer(0, 15611651),
    read: Random.integer(0, 16516516516),
    cid: Random.integer(0, 99999)
  }, {
    avatar: Random.dataImage('158x102'),
    username: Random.cname(),
    dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
    comments: Random.integer(0, 9999999),
    thumbs: Random.integer(0, 9999999),
    title: Random.cparagraph(5, 81),
    img: 'https://wx3.sinaimg.cn/thumb180/6a5ce645ly1gghg8n5qlrj20dw0990t9.jpg',
    keyword: Random.ctitle(4, 15),
    discuss: Random.integer(0, 15611651),
    read: Random.integer(0, 16516516516),
    cid: Random.integer(0, 99999)
  },]
}


// 详情页面
class Init {
  constructor() {
    this.init()
  }
  init() {
    const param = window.location.search.slice(5)
    this.getData(param)
  }
  fresh(data) {
    const $main = document.createElement('div')
    $main.innerHTML = `<div class="_detail">
      <div class="page">
        <div class="above">
          <img alt="" class="avatar" src=${data.user.uimage}>
          <div class="comment-content">
            <h1 class="username">${data.user.username}</h1>
            <span class="time">${new Date(data.adate).toLocaleString()}</span>
            <p>
              ${data.aword}
            </p>
            <img class="aimage" src="${data.aimage}">
          </div>
        </div>
        <ul class="footbar">
          <li class="item fav ${data.flag && data.flag.isfavorite == true ? 'on' : ''}" data-status="${data.flag &&data.flag.isfavorite == true ? 1 : 0}"><img src=${favIcon}>收藏</li>
          <li class="item"><img src=${shareIcon}>转发</li>
          <li class="item ilike ${data.flag && data.flag.islike == true ? 'on' : ''}" data-status="${data.flag &&data.flag.islike == true ? 1 : 0}"><img src=${thumbIcon}><span>${data.alikemount}</span></li>
          <li class="item"><img src=${commentsIcon}><span>0</span></li>
        </ul>
      </div>
      
    </div>`
    const m = document.querySelector('.main')
    console.log(m)
    m.appendChild($main)
    new Comment(document.getElementsByClassName('page')[0], window.location.search.slice(5))

    this.addEvent()
  }
  addEvent() {
    const like = document.getElementsByClassName('ilike')[0]
    const fav = document.getElementsByClassName('fav')[0]
    const aid = window.location.search.slice(5)
    like.onclick = e => {
      const status = parseInt(like.getAttribute('data-status'))
      like.setAttribute('data-status', status ? 0 : 1)
      const text = like.getElementsByTagName('span')[0]
      if (status) {
        text.innerText = text.innerText - 1
      } else {
        text.innerText = parseInt(text.innerText) + 1
      }
      axios.get('/article/changeLikeStatus', { status, aid }).then(
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
    fav.onclick = () => {
      const status = parseInt(fav.getAttribute('data-status'))
      fav.setAttribute('data-status', status ? 0 : 1)

      axios.get('/article/changeFavStatus', { status, aid }).then(
        res => {
          if (status) {
            fav.classList.remove('on')
          } else {
            fav.classList.add('on')
          }
        },
        err => {
          show('操作失败', 'fail')
        }
      )
    }
  }
  getData(param) {
    axios.get(`/article/findDetailOne`, { aid: param }).then(
      res => {
        this.fresh(res)
      },
      err => {
        console.log(err);
      }
    )
  }
}
new Init()




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
          window.open(`./search.html?aword=${this.$search.value}`)
        },
        err => {
          show('搜索失败了 ' + err, 'fail')
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
              show('登陆成功！')
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