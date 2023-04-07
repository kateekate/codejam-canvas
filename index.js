const options = document.querySelectorAll('.switcher__option-square')

options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(option => option.classList.remove('selected'))
    console.log(option.classList.add('selected'))
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

