$( document ).ready(function() 
{
   console.log( "El DOM esta listo" );
});

$("h1").html("etiqueta h1").addClass(`text-danger`);
$("body").css("background-color", "pink");
$("h2").css("text-align","center").css("font-size", "70px").css("color", "red");
$("h5").css("color","gold")

const  Clickbutton = document.querySelectorAll (`.button`);
const tbody = document.querySelector (`.tbody`);
let carrito = [];


Clickbutton.forEach (btn => {
    btn.addEventListener("click", addToCarritoItem)
})

function addToCarritoItem (e) {
    const button = e.target;
    const item = button.closest (`.card`);
    const itemTitle = item.querySelector (`.card-title`).textContent;
    const itemPrice = item.querySelector (`.precio`).textContent;
    const itemImg = item.querySelector (`.card-img-top`).src;
    
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }
    addItemCarrito (newItem)

}

function addItemCarrito (newItem) {
   
    carrito.push (newItem);
    renderCarrito ()
}

function renderCarrito () {
    tbody.innerHTML = ` `;
    carrito.map (item => {
        const tr = document.createElement (`tr`);
        tr.classList.add (`itemCarrito`);
        const Content = `
        <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
        `
        tr.innerHTML = Content;
        tbody.appendChild (tr);
    })
    
    addLocalStorage ()
}

function addLocalStorage () {
    localStorage.setItem (`carrito`, JSON.stringify (carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem(`carrito`));
    if (storage) {
        carrito = storage;
        renderCarrito ()
    }
}
