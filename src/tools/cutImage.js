// 参数分别是 提供的剪切图片的背景层
// 预览图片的背景层
// input(type=file)的上传图片的按钮
// 提交的按钮
// 提交按钮后的回调函数(base64编码图片数据)
// (可选) 用户多次点击时, 多久生效一次
function cutImage (container, preview, upload, submit, fn) {
  let isHaveImg = false   // 判断是否存在图片
  let isLeave = true      // 是否移出了canvas
  let mouseX = 0          // 鼠标横坐标
  let mouseY = 0          // 鼠标纵坐标
  let isMove = false      // 图片是否可拖动
  let theImg = null       // 图片存储
  let imgW = 0            // 图片宽度
  let imgH = 0            // 图片高度
  let imgWH = 0           // 图片宽高比
  let containerW = container.offsetWidth * 2    // 容器的宽度乘以2 (canvas的绘制宽度要成2, 解决不清晰问题)
  let containerH = container.offsetHeight * 2   // 高度乘以2
  let containerWH = containerW / containerH     // 宽高比
  let dormerL = Math.round(containerWH >=1 ? containerH * 5 / 8 : containerW * 5 / 8)   // 视口宽高
  let dormerLeft = Math.round((containerW - dormerL) / 2)    // 视口横坐标
  let dormerTop = Math.round((containerH - dormerL) / 2)     // 视口纵坐标
  let moveLeft = 0    // 图片横坐标
  let moveTop = 0     // 图片纵坐标
  let beginLeft = 0   // 开始操作前横坐标
  let beginTop = 0    // 开始操作前纵坐标
  // 初始化画布
  container.innerHTML = '<canvas id="cy-cvs" style="background: #EEEEEE"></canvas>'
  let theCvs = document.getElementById('cy-cvs')
  theCvs.width = containerW
  theCvs.height = containerH
  theCvs.style.width = containerW / 2 + 'px'
  theCvs.style.height = containerH / 2 + 'px'
  let ctx = theCvs.getContext('2d')
  // 预览窗口
  preview.innerHTML = '<canvas id="cy-preview-cvs" style="background: #EEEEEE"></canvas>'
  let previewCvs = document.getElementById('cy-preview-cvs')
  previewCvs.height = previewCvs.width = dormerL
  previewCvs.style.width = previewCvs.style.height = dormerL / 2 + 'px'
  let previewCtx = previewCvs.getContext('2d')
  // 监听图片input导入
  upload.oninput = function () {
    theImg = upload.files[0]
    initCvs()
  }
  // 监听图片拖放导入
  theCvs.addEventListener('dragover', (e) => {
    e.preventDefault()
  })
  theCvs.addEventListener('drop', (e) => {
    e.preventDefault()
    if (e.dataTransfer.files[0].type.indexOf('image/') === 0){
      theImg = e.dataTransfer.files[0]
      initCvs()
    } else {
      alert('图片格式错误')
    }  
  })
  // 初始化图片的导入
  function initCvs () {
    let imgReader = new FileReader()
    imgReader.readAsDataURL(theImg)
    imgReader.onload = (e) => {
      theImg = new Image()
      theImg.src = e.target.result
      theImg.onload = () => {
        upload.value = null
        imgW = theImg.width
        imgH = theImg.height
        imgWH = imgW / imgH
        if (imgWH >= containerWH) {
          theImg.width = containerW
          theImg.height = containerW / imgWH
          moveLeft = 0
          moveTop = Math.round((containerH - theImg.height) / 2)
        } else {
          theImg.height = containerH
          theImg.width = containerH * imgWH
          moveLeft = Math.round((containerW - theImg.width) / 2)
          moveTop = 0
        }
        drawImage()
        isHaveImg = true
      }
    }
  }
  // 监听移入canvas
  theCvs.onmouseenter = function () {
    isLeave = false
    if (isHaveImg) {
      document.documentElement.addEventListener('mousedown', mousedownEvent)
      document.documentElement.addEventListener('mousemove', mousemoveEvent)
      document.documentElement.addEventListener('mouseup', mouseupEvent)
      document.documentElement.addEventListener('mousewheel', mousewheelEvent)
      document.documentElement.addEventListener('DOMMouseScroll', DOMMouseScrollEvent)
    }
  }
  // 监听移除canvas
  theCvs.onmouseleave = function () {
    isLeave = true
    document.documentElement.removeEventListener('mousewheel', mousewheelEvent)
    document.documentElement.removeEventListener('DOMMouseScroll', DOMMouseScrollEvent)
  }
  // 监听滚轮缩放(除了火狐浏览器)
  function mousewheelEvent (e) {
    e.preventDefault()
    wheelZoom(e.wheelDelta)
  }
  // 兼容火狐浏览器(监听滚轮滚动)
  function DOMMouseScrollEvent (e) {
    e.preventDefault()
    wheelZoom(-e.detail * 40)
  }
  // 滚轮滚动时的图片缩放
  function wheelZoom (num) {
    if (imgWH > 1) {
      theImg.height += num / 10
      theImg.width = theImg.height * imgWH
    } else {
      theImg.width += num / 10
      theImg.height = theImg.width / imgWH
    }
    if (Math.min(theImg.width, theImg.height) >= dormerL || num > 0) {
      if (imgWH > 1) {
        moveTop -= num / 20
        moveLeft -= num / 20 * imgWH
      } else {
        moveLeft -= num / 20
        moveTop -= num / 20 / imgWH
      }
    } else {
      if (imgWH >= 1) {
        theImg.height = dormerL
        theImg.width = dormerL * imgWH
      } else {
        theImg.width = dormerL
        theImg.height = dormerL / imgWH
      }
    }
    planBorder()
  }
  // 边界处理
  function planBorder () {
    let borderX = Math.round((containerW + dormerL) / 2 - theImg.width);
    let borderY = Math.round((containerH + dormerL) / 2 - theImg.height);
    moveLeft > dormerLeft && (moveLeft = dormerLeft);
    moveLeft < borderX && (moveLeft = borderX);
    moveTop > dormerTop && (moveTop = dormerTop);
    moveTop < borderY && (moveTop = borderY);
    requestAnimationFrame(drawImage);
  }
  // 监听图片拖动(鼠标按下)
  function mousedownEvent (e) {
    if (theCvs === e.target) {
      isMove = true
      mouseX = e.clientX
      mouseY = e.clientY
      beginLeft = moveLeft
      beginTop = moveTop
      document.documentElement.onselectstart = function () { 
        return false
      }
    }
  }
  // 监听图片拖动(鼠标移动)
  function mousemoveEvent (e) {
    if (isMove) {
      moveLeft = (e.clientX - mouseX) * 2 + beginLeft
      moveTop = (e.clientY - mouseY) * 2 + beginTop
      planBorder()
    }
  }
  // 监听图片拖动(鼠标抬起)
  function mouseupEvent () {
    isMove = false
    document.documentElement.onselectstart = function () { 
      return true
    }
    if (isLeave) {
      document.documentElement.removeEventListener('mousedown', mousedownEvent)
      document.documentElement.removeEventListener('mousemove', mousemoveEvent)
      document.documentElement.removeEventListener('mouseup', mouseupEvent)
    }
  }
  // 绘制canvas
  function drawImage () {
    // 清屏绘制底层图片并保存
    ctx.clearRect(0, 0, containerW, containerH)
    ctx.drawImage(theImg, moveLeft, moveTop, theImg.width, theImg.height)
    ctx.save()
    // 绘制阴影层和高亮视口并保存
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
    ctx.fillRect(0, 0, containerW, containerH)
    ctx.fillStyle = 'rgba(255, 255, 255, 10)'
    ctx.fillRect(dormerLeft, dormerTop, dormerL, dormerL)
    ctx.restore()
    ctx.save()
    // 剪切一块路径(在这个路径内的绘制才可见), 在此绘制整张图片
    ctx.beginPath()
    ctx.rect(dormerLeft, dormerTop, dormerL, dormerL)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(theImg, moveLeft, moveTop, theImg.width, theImg.height)
    ctx.restore()
    // 得到视口内的图片并绘制到预览canvas
    let previewData = ctx.getImageData(dormerLeft, dormerTop, dormerL, dormerL)
    previewCtx.clearRect(0, 0, dormerL, dormerL)
    previewCtx.putImageData(previewData, 0, 0)
  }

  // 监听提交
  submit.onclick = () => {
    isHaveImg && fn(previewCvs.toDataURL('image/jpg', 0.95));
  }
}

export default cutImage;
