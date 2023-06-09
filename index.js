const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const tools = document.querySelectorAll('.tools__tool')
let activeTool = null
const pencilTool = document.querySelector('.pencil-tool')
const options = document.querySelectorAll('.switcher__option-square')
const currentColor = document.querySelector('.current-color')
let prevColor = document.querySelector('.prev-color')
let currentColorPicker = currentColor.value
let prevColorPicker = currentColorPicker
const prev = document.querySelector('.prev')
const fillTool = document.querySelector('.fill-tool')
const redColor = document.querySelector('.red-color')
const blueColor = document.querySelector('.blue-color')
const chooseColor = document.querySelector('.choose-color')

// Choose color tool(pipetka)
function rgbToHex(rgbColor) {
  const matches = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  const r = parseInt(matches[1])
  const g = parseInt(matches[2])
  const b = parseInt(matches[3])
  const hexColor = ((r << 16) | (g << 8) | b).toString(16)
  return "#" + ("000000" + hexColor).slice(-6)
}

function canvasChooseColorHandler(e) {
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const pixel = ctx.getImageData(x, y, 1, 1).data
  const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`

  const hexColor = rgbToHex(color)
  updatePrevColor()
  updateCurrentColor(hexColor)
}

// Change background-color of active tool
tools.forEach(tool => {
  tool.addEventListener('click', () => {
    canvas.removeEventListener('click', canvasChooseColorHandler)
    if (activeTool !== null) {
      activeTool.classList.remove('tool-active')
    }
    if (tool !== activeTool) {
      tool.classList.add('tool-active')
      activeTool = tool
    } else {
      activeTool = null
    }
  })
})

// For change size-img on the canvas
options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(option => option.classList.remove('selected'))
    option.classList.add('selected')
    if (option.classList.contains('size-four') && option.classList.contains('selected')) {
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

// Pencil tool
pencilTool.addEventListener('click', function () {
  let isDrawing = false
  let lastX = 0
  let lastY = 0

  canvas.addEventListener('mousedown', function (e) {
    ctx.strokeStyle = currentColor.value
    isDrawing = true
    lastX = e.offsetX
    lastY = e.offsetY
  })

  canvas.addEventListener('mousemove', function (e) {
    ctx.strokeStyle = currentColor.value
    if (isDrawing) {
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()

      lastX = e.offsetX
      lastY = e.offsetY
    }
  })

  canvas.addEventListener('mouseup', function (e) {
    isDrawing = false
  })

  canvas.addEventListener('mouseout', function (e) {
    isDrawing = false
  })
})

// Fill tool
fillTool.addEventListener('click', function () {
  ctx.fillStyle = currentColor.value
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fill()
})

// For change current and prev colors
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
prevColor.addEventListener('click', function () {
  const copyPrevColorPicker = prevColorPicker
  updatePrevColor()
  updateCurrentColor(copyPrevColorPicker)
})

// Red & Blue color picker
redColor.addEventListener('click', function () {
  updatePrevColor()
  updateCurrentColor('#FF0000')
})
blueColor.addEventListener('click', function () {
  updatePrevColor()
  updateCurrentColor('#41b7f7')
})

// Choose color tool(pipetka)  
chooseColor.addEventListener('click', function () {
  canvas.addEventListener('click', canvasChooseColorHandler)
})
