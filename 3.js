/*
1. Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат
2. Добавить в чат механизм отправки гео-локации
При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ 
с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.
*/
let form = document.getElementById('form')
let body = document.getElementById('chat_body')
let btnGeo = document.getElementById('geo')
let websocket = new WebSocket('wss://echo-ws-service.herokuapp.com')

let isSendGeolocation = false

function sendMessage(e) {
   e.preventDefault()
   let text = form.elements['text'].value
   let span = document.createElement('span')
   span.classList.add('text')
   span.textContent = text
   body.appendChild(span)
   span.classList.add('client')
   isSendGeolocation = false
   websocket.send(text)
}

function sendGeolocation(e) {
   e.preventDefault()
   if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
         let span = document.createElement('span')
         let aElement = document.createElement('a')
         aElement.textContent = 'Гео-локация'
         span.appendChild(aElement)
         aElement.setAttribute('href', `https://www.openstreetmap.org/#map=16/${position.coords.latitude}/${position.coords.longitude}`)
         aElement.setAttribute('target', '_blank')
         span.classList.add('text')
         body.appendChild(span)
         span.classList.add('client')
         isSendGeolocation = true
         websocket.send(text)
      })
   }
}

websocket.onopen = function () {
   form.addEventListener('submit', sendMessage)
   btnGeo.addEventListener('click', sendGeolocation)
}

websocket.onmessage = function (e) {
   if (!isSendGeolocation) {
      let span = document.createElement('span')
      span.classList.add('text')
      span.textContent = e.data
      body.appendChild(span)
      span.classList.add('server')
   }
}

websocket.onerror = function (e) {
   console.log('Error', e)
}

function success() {
   if (document.getElementById("text").value == "") {
      document.getElementById('submit_button').disabled = true;
   } else {
      document.getElementById('submit_button').disabled = false;
   }
}