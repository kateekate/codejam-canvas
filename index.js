const options = document.querySelectorAll('.switcher__option-square')

options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(option => option.classList.remove('selected'))
    option.classList.add('selected')
    if (option.classList.contains('size-four') && option.classList.contains('selected')) {
      const canvas = document.getElementById('myCanvas')
      const ctx = canvas.getContext('2d')

      canvas.width = 512
      canvas.height = 512

      fetch('./4x4.json')
        .then(response => response.json())
        .then(data => {
          const colors = data
          const squareSize = 128
          const rows = canvas.height / squareSize
          const cols = canvas.width / squareSize

          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              ctx.fillStyle = '#' + colors[row][col]
              ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize)
            }
          }
        })
    } else if (option.classList.contains('size-thirty-two') && option.classList.contains('selected')) {
      const canvas = document.getElementById('myCanvas')
      const ctx = canvas.getContext('2d')

      canvas.width = 512
      canvas.height = 512

      fetch('./32x32.json')
        .then(response => response.json())
        .then(data => {
          const colors = data
          const squareSize = 16
          const rows = canvas.height / squareSize
          const cols = canvas.width / squareSize

          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              ctx.fillStyle = `rgba(${colors[row][col]})`
              ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize)
            }
          }
        })
    } else if (option.classList.contains('size-img') && option.classList.contains('selected')) {
      const canvas = document.getElementById('myCanvas')
      const ctx = canvas.getContext('2d')

      canvas.width = 512
      canvas.height = 512
      const img = new Image()
      img.src = './assets/image.png'
      img.onload = function () {
        ctx.drawImage(img, 0, 0, 512, 512)
      }

    }
  })
})

const pencilTool = document.querySelector('.pencil-tool')
pencilTool.addEventListener('mousedown', function () {
  pencilTool.classList.add('tool-selected')
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  let isDrawing = false
  let lastX = 0
  let lastY = 0

  canvas.addEventListener('mousedown', function (e) {
    const currentColor = document.querySelector('.current-color')
    let colorPick = currentColor.value
    ctx.strokeStyle = colorPick;
    isDrawing = true
    lastX = e.offsetX
    lastY = e.offsetY
  })

  canvas.addEventListener('mousemove', function (e) {
    const currentColor = document.querySelector('.current-color')
    let colorPick = currentColor.value
    ctx.strokeStyle = colorPick;
    if (isDrawing) {
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()

      lastX = e.offsetX
      lastY = e.offsetY
    }
  })

  canvas.addEventListener('mouseup', function () {
    isDrawing = false
  })

  canvas.addEventListener('mouseout', function () {
    isDrawing = false
  })
})

const fillTool = document.querySelector('.fill-tool')
fillTool.addEventListener('mousedown', function () {
  fillTool.classList.add('tool-selected')
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  const currentColor = document.querySelector('.current-color')
  let colorPick = currentColor.value

  ctx.fillStyle = colorPick
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fill()
})


const currentColor = document.querySelector('.current-color')
let prevColor = document.querySelector('.prev-color')
const prev = document.querySelector('.prev')
const redColor = document.querySelector('.red-color')
const blueColor = document.querySelector('.blue-color')

let currentColorPicker = currentColor.value
let prevColorPicker = currentColorPicker

function updatePrevColor() {
  prevColorPicker = currentColorPicker
  prev.style.background = currentColorPicker
}

function updateCurrentColor(color) {
  currentColor.value = color
  currentColorPicker = color
}

currentColor.addEventListener('input', function (event) {
  updatePrevColor()
  currentColorPicker = event.target.value
})
prevColor.addEventListener('click', function (event) {
  const copyPrevColorPicker = prevColorPicker
  updatePrevColor()
  updateCurrentColor(copyPrevColorPicker)
})

redColor.addEventListener('click', function (event) {
  updatePrevColor()
  updateCurrentColor('#FF0000')
})

blueColor.addEventListener('click', function (event) {
  updatePrevColor()
  updateCurrentColor('#41b7f7')
})



