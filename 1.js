/*
Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео). 
При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.
*/
let btn = document.querySelector('.j-btn-test');
let svgUse = document.querySelector('.btn_icon svg use')

btn.addEventListener('click', () => {
    let href = svgUse.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
    svgUse.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href', href == '#arrow-down-left-circle' ? '#arrow-down-left-circle-fill' : '#arrow-down-left-circle')
});