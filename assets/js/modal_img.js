// Based in w3school modal example
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_img

function openInModal(img) {
    const div = document.createElement('div');
    div.className = 'modal';
    div.id = 'modal'
    div.style.display = "block";
    const span = document.createElement('span');
    span.innerHTML = '&times;';
    span.className = 'close'
    span.onclick = () => { 
        img.parentNode.removeChild(div);
    };
    div.appendChild(span);
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    div.appendChild(modalImg);
    
    img.parentNode.appendChild(div)
    
}