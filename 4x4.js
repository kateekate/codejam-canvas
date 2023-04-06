const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
canvas.width = 512
canvas.height = 512

// fetch('./4x4.json')
//   .then(response => response.json())
//   .then(data => {
//     const colors = data
//     const squareSize = 128
//     const rows = canvas.height / squareSize
//     const cols = canvas.width / squareSize

//     for (let row = 0; row < rows; row++) {
//       for (let col = 0; col < cols; col++) {
//         ctx.fillStyle = '#' + colors[row][col]
//         ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize)
//       }
//     }
//   })

// fetch('./32x32.json')
//   .then(response => response.json())
//   .then(data => {
//     const colors = data
//     const squareSize = 16
//     const rows = canvas.height / squareSize
//     const cols = canvas.width / squareSize

//     for (let row = 0; row < rows; row++) {
//       for (let col = 0; col < cols; col++) {
//         ctx.fillStyle = `rgba(${colors[row][col]})`
//         ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize)
//       }
//     }
//   })

const img = new Image()
img.src = './assets/image.png'
img.onload = function () {
  ctx.drawImage(img, 0, 0, 512, 512)
}