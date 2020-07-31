function show(msg, type = 'success') {
  const div = document.createElement('div')
  div.classList.add('stoast')
  div.innerText = msg
  const style = document.createElement('style')
  style.innerText = `
    .stoast {
      text-align:center;
      z-index: 2000;
      padding: 10px 40px;
      position: fixed;
      top: -100%;
      box-shadow: 0 0 10px #808080;
      right: 50%;
      transform: translateX(50%);
      background-color: ${type === 'success' ? '#fff' : '#5c5c5c'};
      opacity: 1;
      color: ${type === 'success' ? '#f86814' : '#fff'};
      animation: appear 3s;
      border-top: 5px solid ${type === 'success' ? '#f86814' : '#fff'}
    }
    .stoast:hover{
      display: none;
    }
    @keyframes appear{
      0%{
        top: -100%;
      }
      10%{
        top: 0;
      }
      90%{
        top: 0
      }
      100%{
        top: -100%;
        display: none
      }
    }
  `
  document.body.appendChild(style)
  document.body.appendChild(div)
}
export {
  show
}