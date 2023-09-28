const tiklanmaFnc = (e) => {
    let deger = e.type;
    console.log(deger);
    e.preventDefault();
}
document.querySelector('.link.link-facebook').addEventListener('click',tiklanmaFnc);
document.querySelector('.link.link-google').addEventListener('dblclick',tiklanmaFnc);

