/*
Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.
*/
const button = document.getElementById('winSize')

button.addEventListener('click', (e) => {
   e.preventDefault()

   let screenHeight = window.screen.height
   let screenWidth = window.screen.width

   alert(`Размеры экрана ${screenWidth}x${screenHeight}`)
})