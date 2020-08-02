import './search.css'

//引入工具
import axios, { get } from '../../utils/axios'
import { Random } from 'mockjs'
import { reactive, effect } from '../../utils/reactive'
import { show } from '../../utils/showToast'
import { scrollEvent } from '../../utils/scroll'
import { createFocus } from '../../utils/focus'
import {HotRank} from '../../utils/HotRank'
import { Searching, Login$Register } from '../../utils/SearchLogin'

// 引入图标
import anonymous from '../../imgs/anonymous.png'
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
new Searching()


// Login

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
      let dom = `
          <div class="content_wrap">
            <img src=${list.user.uimage} class="avatar">
            <div class="userBef" data-befid=${list.uid}>
              <img src=${list.user.uimage} class="avatar_b">
              <h1 class="username">${list.user.username}</h1>
              <h4 class="introduce">${list.user.introduce}</h4>
              
            </div>
            <div class="content atc" data-aid=${list.aid}>
              <h1 class="title">${list.user.username}</h1>
              <p class="txt">${list.aword}</p>
              ${list.aimage ? `<img src=${list.aimage} class="pic">`:''}
              ${list.avideo?`<video controls width="450px" src=${list.avideo}></video>`: ''}
              <div class="time">${new Date(list.adate).toLocaleString()}</div>
            </div>
          </div>
          
          <div class="foot-bar">
            <div class="item ${list.flag && list.flag.isfavorite == true ? 'on' : ''} center fav" data-status=${list.flag && list.flag.isfavorite == true ? 1 : 0} data-aid=${list.aid}><img src=${keep}>收藏</div>
            <div class="item center"><img src=${shareIcon}>转发</div>
            <div class="item center open-fold"><img src=${commentsIcon}>评论</div>
            <div class="item center likes ${list.flag && list.flag.islike == true ? 'on' : ''}" data-status=${list.flag && list.flag.islike == true ? 1 : 0} data-aid=${list.aid}><img src=${thumbIcon} class="like }"><span class="likemount">${list.alikemount}</span></div>
          </div>`
      div.innerHTML = dom

      const contain = document.createElement('div')
      contain.setAttribute('style', 'margin-bottom:15px')
      contain.appendChild(div)
      $con.appendChild(contain)
    })
    this.addEvents(this.aword)
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


    // 鼠标移入头像
    const $befs = document.getElementsByClassName('userBef')
    Array.prototype.forEach.call($befs, bef => {
      const befid = parseInt(bef.getAttribute('data-befid'))
      bef.onmouseover = () => {
        if (!bef.getElementsByClassName('_focus')[0]) {
          bef.appendChild(createFocus(befid))
        }
      }
      if (bef.getElementsByClassName('_focus')[0]) {
        bef.getElementsByClassName('_focus')[0].onmouseout = bef.onmouseout = () => {
          bef.getElementsByClassName('_focus')[0].parentNode.removeChild(bef.getElementsByClassName('_focus')[0])
        }
      }


      // bef.isFocus = JSON.parse(localStorage.getItem('userInfo')).fids.includes(befid)
      // if (bef.isFocus) {
      //   $focus.classList.add('on')
      // }
      // $focus.onclick = focusFn
      // function focusFn() {
      //   $focus.onclick = null

      //   axios.get('/user/addFocusUser', { befid, isFocus: bef.isFocus }).then(
      //     res => {
      //       if (bef.isFocus) {   //之前关注过
      //         bef.isFocus = false
      //         $focus.classList.remove('on')
      //         // session取消关注
      //         const obj = JSON.parse(localStorage.getItem('userInfo'))
      //         obj.fids.splice(obj.fids.indexOf(befid), 1)
      //         obj.focus.focusNub--
      //         localStorage.setItem('userInfo', JSON.stringify(obj))
      //       } else {
      //         bef.isFocus = true
      //         $focus.classList.add('on')
      //         const obj = JSON.parse(localStorage.getItem('userInfo'))
      //         obj.fids.push(befid)
      //         obj.focus.focusNub++
      //         localStorage.setItem('userInfo', JSON.stringify(obj))
      //       }

      //       show(res.errorMsg)
      //     },
      //     err => {
      //       show(err, 'fail')
      //     }
      //   ).finally(
      //     () => {
      //       $focus.onclick = focusFn
      //     }
      //   )
      // }
    })
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
            src=${userInfo ? userInfo.uimage : anonymous}
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
      axios.get('/article/commentQuery', { aid, currentPart: currentPart + 1 }).then(
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
      if ($value.value) {
        axios.post('/article/addComment', { comments: $value.value, aid: aid }).then(
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
            show('添加评论失败', 'fail')
          }
        )
      } else {
        show('请输入评论！')
      }
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
new HotRank(document.getElementsByClassName('con-r')[0])