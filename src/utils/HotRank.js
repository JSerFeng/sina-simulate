import axios from './axios'
import { createElement, render } from './vdom2dom'
const c = createElement
class HotRank {
  constructor(fatherNode) {
    this.fatherNode = fatherNode
    this.createHtml()
  }
  createHtml() {
    const $style = document.createElement('style')
    $style.innerHTML = `
      .hot {
  width: 340px;
  padding: 20px;
  color: #333333;
  margin-bottom: 20px;
  box-sizing: border-box;
  background-color: #F2F2F5;
  border-top: 1px solid #eb7350;
}

.hot h1 {
  margin: 0 0 16px;
  padding: 10px 0;
  font-size: 18px;
}

.hot .lists .list {
  cursor: pointer;
  display: block;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  height: 50px;
  color: #333333;
  text-decoration: none;
}

.hot .lists .list:hover .right-nav .lists .list .container {
  color: #eb7350;
}

.hot .lists .list:hover .right-nav .lists .list .img img {
  transform: scale(1.2);
}

.hot .lists .list .img {
  overflow: hidden;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background-color: rgb(238, 238, 238);
}

.hot .lists .list .img img {
  width: 50px;
  transition: 0.2s;
}

.hot .lists .list .contain {
  width: 230px;
  height: 100%;
}

.hot .lists .list .contain .title {
  font-size: 14px;
  font-weight: 500;
  height: 20px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  padding: 0 0 10px
}

.hot .lists .list .contain .title:hover {
  color: #eb7350;
}

.hot .lists .list .contain span {
  font-size: 12px;
  color: #808080;
  margin-right: 10px;
}
    `

    const $wrap = document.createElement('div')
    $wrap.classList.add('hot')
    $wrap.innerHTML = `
          <h1>微信热门话题</h1>
          <div class="lists" id="right-hot">
          </div>`

    this.run($wrap)
    this.fatherNode.appendChild($style)
    this.fatherNode.appendChild($wrap)
  }
  run(wrap) {
    const $lis = wrap.getElementsByClassName("lists")[0]
    axios.get('/article/findHotArticle', {})
      .then(
        res => {
          res.forEach(list => {
            const li = this.create(list)
            const aid = li.getAttribute('dataAid')
            li.onclick = e => {
              window.open('./static/detail.html?aid='+aid)
            }
            $lis.appendChild(li)
          })
          
        }
      )
      
  }
  create(data) {
    let Vdom = c('a', { class: 'list', dataAid: data.aid }, [
      c('div', { class: 'img' }, [
        c('img', { src: data.aimage })
      ]),
      c('div', { class: 'contain' }, [
        c('h1', { class: 'title' }, data.aword),
        c('div', { class: 'bottom-bar' }, [
          c('span', {}, '点赞'+data.alikemount),
          c('span', {}, new Date(data.adate).toLocaleString())
        ])
      ])
    ])
    return render(Vdom)
  }
}
export {
  HotRank
}