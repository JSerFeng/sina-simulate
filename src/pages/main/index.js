import './main.css'
import axios from '../../utils/axios'
import Mock from 'mockjs'
import {Vdom,createElement,render,setAttr, mount} from '../../utils/vdom2dom'

import commentsIcon from '../../imgs/comments.png'
import thumbIcon from '../../imgs/thumb.png'

const Random = Mock.Random
const c = createElement

// 模拟请求到的数据
const baseData = {
  // 输入搜索框时
  searching: 
  [
    {
      val: Random.ctitle(Math.floor(Math.random()*15)),
      isHot: true
    },
    {
      val: Random.ctitle(Math.floor(Math.random()*15)),
      isHot: true
    },
    {
      val: Random.ctitle(Math.floor(Math.random()*15)),
      isHot: false
    },
    {
      val: Random.ctitle(Math.floor(Math.random()*15)),
      isHot: true
    }
  ],
  // 轮播图数据
  slide: [
    [
      {
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
    [
      {
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
    [
      {
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
  lists: [
    {
      avatar: Random.dataImage('158x102'),
      username: Random.cname(),
      dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
      comments: Random.integer(0, 9999999),
      thumbs: Random.integer(0, 9999999),
      title: Random.cparagraph(5, 81),
      video: 'https://f.video.weibocdn.com/ACxmxLFvlx07EDkW84Io01041200BTb30E010.mp4?label=mp4_hd&template=852x480.25.0&trans_finger=62b30a3f061b162e421008955c73f536&ori=0&ps=4ub7gI97adQ&Expires=1594109916&ssig=5BQ28fbanM&KID=unistore,video'
    },{
      avatar: Random.dataImage('158x102'),
      username: Random.cname(),
      dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
      comments: Random.integer(0, 9999999),
      thumbs: Random.integer(0, 9999999),
      title: Random.cparagraph(5, 81),
      video: 'https://f.video.weibocdn.com/ACxmxLFvlx07EDkW84Io01041200BTb30E010.mp4?label=mp4_hd&template=852x480.25.0&trans_finger=62b30a3f061b162e421008955c73f536&ori=0&ps=4ub7gI97adQ&Expires=1594109916&ssig=5BQ28fbanM&KID=unistore,video'
    },{
      avatar: Random.dataImage('158x102'),
      username: Random.cname(),
      dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
      comments: Random.integer(0, 9999999),
      thumbs: Random.integer(0, 9999999),
      title: Random.cparagraph(5, 81),
      img: 'https://wx1.sinaimg.cn/thumb180/a1c3de7ely1gghdic621wj20u00u0dnj.jpg'
    },{
      avatar: Random.dataImage('158x102'),
      username: Random.cname(),
      dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
      comments: Random.integer(0, 9999999),
      thumbs: Random.integer(0, 9999999),
      title: Random.cparagraph(5, 81),
      video: 'https://f.video.weibocdn.com/ACxmxLFvlx07EDkW84Io01041200BTb30E010.mp4?label=mp4_hd&template=852x480.25.0&trans_finger=62b30a3f061b162e421008955c73f536&ori=0&ps=4ub7gI97adQ&Expires=1594109916&ssig=5BQ28fbanM&KID=unistore,video'
    },{
      avatar: Random.dataImage('158x102'),
      username: Random.cname(),
      dateTime: Random.datetime('yyyy-MM-dd A HH:mm:ss'),
      comments: Random.integer(0, 9999999),
      thumbs: Random.integer(0, 9999999),
      title: Random.cparagraph(5, 81),
      img: 'https://wx3.sinaimg.cn/thumb180/6a5ce645ly1gghg8n5qlrj20dw0990t9.jpg'
    },
  ]
}
// 搜索框输入时展示热度排行（防抖）
class Searching {
  constructor (method, url) {
    this.$search = document.querySelector('.search-input')
    this.$show = document.querySelector('.search-dragdown')
    this.mehod = method,
    this.url = url,
    this.onTyping()
  }
  // 基础防抖 **
  onTyping () {
    let timer //定时器
    this.$search.addEventListener('keyup', ({target})=>{
      if (timer) 
        clearTimeout(timer);
      timer = setTimeout(()=>{
        // axios
        // let res 
        // axios(this.mehod, this.url).then(data=>{
        //   this.refresh(data)
        // })
        let randNum = Math.floor(Math.random()*10)
        for (let i=0; i<randNum; i++) {
          baseData.searching[i] = {
            val: Random.ctitle(Math.floor(Math.random()*15)),
            isHot: Math.floor(Math.random()*2)
          }
        }
        this.refresh(baseData.searching)
      }, 500)
    }),
    this.$search.addEventListener('blur', ({target})=>{
      this.$show.classList.add("hide")
    }),
    this.$search.addEventListener('focus', ({target})=>{
      this.$show.classList.remove("hide")
        // axios
        // let res 
        // axios(this.mehod, this.url, '/').then(data=>{
        //   this.refresh(data)
        // })
        let randNum = Math.floor(Math.random()*10)
        for (let i=0; i<randNum; i++) {
          baseData.searching[i] = {
            val: Random.ctitle(Math.floor(Math.random()*15)),
            isHot: Math.floor(Math.random()*2)
          }
        }
        this.refresh(baseData.searching)
    })
  }
  refresh (res) {
    this.$show.innerHTML = `<div style="color:#eb7350" class="li">查看完整热搜榜》</div>`
    res.forEach((data, i)=>{
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
}
new Searching('GET','url')

// 生成轮播图
class Slide {
  constructor (method, url, delay=1000) {
    this.i = 1
    this.prev = 0
    this.get(method, url)
  }
  get (method, url) {
    // axios(method,url).then(data=>{
    //   this.generate(data)  
    // })
    this.generate(baseData.slide)
  }
  generate (data) {
    const $slides = document.getElementsByClassName('slide-bar')[0]
    for (let i=0; i<$slides.children.length; i++) {
      $slides.children[i].querySelector('.img0').src = data[i][0].imgUrl
      $slides.children[i].querySelector('.img1').src = data[i][1].imgUrl
      $slides.children[i].querySelector('.img2').src = data[i][2].imgUrl

      $slides.children[i].getElementsByClassName('intro')[0].innerHTML = data[i][0].title
      $slides.children[i].getElementsByClassName('intro')[1].innerHTML = data[i][1].title
      $slides.children[i].getElementsByClassName('intro')[2].innerHTML = data[i][2].title

      $slides.children[i].querySelector('.discuss').innerHTML = data[i][0].discuss + '讨论'
      $slides.children[i].querySelector('.read').innerHTML = data[i][0].read + '阅读'
    }
    this.run()
  }
  run () {
    const $dots = document.getElementsByClassName('dot')    
    for (let i=0; i<$dots.length; i++) {
      $dots[i].onclick = () => {
        this.to(i)
      }
    }
    this.autoplay()
  }
  autoplay () {
    
    const $slideBar = document.querySelector('.slide-bar')
    const $dots = document.getElementsByClassName('dot')
    clearInterval(this.timer)

    this.timer = setInterval(() => {
      $slideBar.style.transform = `translateX(${-660*this.i}px)` 
      if (this.prev >= 0) {
        $dots[this.prev].style.backgroundColor = 'grey'
      }
      $dots[this.i].style.backgroundColor = '#eb7350'    
      this.prev = this.i 
      this.i = this.i==$slideBar.children.length-1? 0 : ++this.i
      
    }, 3000);
    $slideBar.onmouseout = ()=>{
      this.autoplay()
    }
    $slideBar.onmouseover = ()=>{
      clearInterval(this.timer)
    }
  }
  to (i) {
    const $slideBar = document.querySelector('.slide-bar')
    const $dots = document.getElementsByClassName('dot')    

    clearInterval(this.timer)
    this.i = i
    if (this.prev >= 0) {
      $dots[this.prev].style.backgroundColor = 'grey'
    }
    $dots[this.i].style.backgroundColor = '#eb7350'
    this.prev = this.i
    $slideBar.style.transform = `translateX(${-660*this.i}px)`    
    this.i = this.i==$slideBar.children.length-1? 0 : ++this.i
    
    this.autoplay()
  }
}
new Slide('GET','url')

// 生成主页图文视频列表
class List {
  constructor (method, url, data) {
    // axios(method, url, data.then(data=>{
    //   this.get(data)
    // }))
    this.run(baseData.lists)
  }
  run (res) {
    const $lists = document.getElementsByClassName('lists')[0]
    res.forEach(data=>{
      if (data.video) {
        $lists.appendChild( this.createVideoEle(data) )
      } else {
        $lists.appendChild( this.createImgEle(data) )
      }
    })
  }
  // 创建视频栏目
  createVideoEle (data) {
      const vdom = c('div',{class: 'list'}, 
      [
        c('div', {class: 'video'}, 
        [
          c('video',{controls:'controls', src:data.url},'')
        ]),
        c('a', {}, [
          c('div', {class: 'list-content-video'}, [
            c('div', {class: 'list-title'}, data.title),

            c('div', {class: 'sub-info'}, [
              c('img', {class: 'avatar', src: data.avatar}),
              c('span', {}, data.username),
              c('span', {}, data.dateTime)
            ]),

            c('div', {class: 'bottom'}, [
              c('div', {class: 'comments'}, [
                c('img', {class: 'comments', src: commentsIcon, alt: '评论'}, undefined)
              ]),
              c('span', {}, data.comments),
              c('div', {class: 'thumbs'}, [
                c('img', {class: 'thumb', src: thumbIcon, alt: '点赞'},undefined)
              ]),
              c('span', {}, data.thumbs),
            ])
          ])
        ])
      ])
      
      return render(vdom)
  }
  // 创建图文栏目
  createImgEle (data) {
    const vdom = c('div', {class: "list-img list"}, 
    [
      c('div', {class: 'img'}, [
        c('img', {src: data.img})
      ]),
      c('a', {}, [
        c('div', {class: 'list-content-img'},[
          c('div', {class: 'list-title'}, data.title),
          c('div', {class: 'foot-bar'}, [
            c('div', {class: 'sub-info'}, [
              c('img', {class: 'avatar', src: data.avatar}, undefined),
              c('span', {}, data.username),
              c('span', {}, data.dateTime)
            ]),
            c('div', {class: 'bottom'}, [
              c('div', {class: 'comments'}, [
                c('img', {src: commentsIcon})
              ]),
              c('span', {}, data.comments),
              c('div', {class: 'thumbs'}, [
                c('img', {src: thumbIcon})
              ]),
              c('span', {}, data.thumbs)
            ])
          ])
        ])
      ])
    ])
    
    return render(vdom)
  }
  
}
new List('POST', 'url', 'data')