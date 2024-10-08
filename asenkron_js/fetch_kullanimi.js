const btnapicall = document.querySelector('.kaynak-getir');
btnapicall.addEventListener('click',getJSON);
function getJSON(e){
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then(response => response.json())
      .then(json => console.log(json))
}