let url = "http://makeup-api.herokuapp.com/api/v1/products.json";
let marca = "";
let opcionesProducto = "";
let listaProductos = [];
let producto = "";
let listaMarcas = [];
let opcionesMarca = "";
let opcionesFinales = "";
let favorito = "";

eligeMarca();
eligeProducto();

function eligeMarca() {
  listaProductos = [];
  opcionesProducto = "";
  document.getElementById("resultados").innerHTML = "<h2>CARGANDO...</h2>";
  /* marca = document.getElementById("brandSeleccion").value; */
  console.log(url + "?brand=" + marca);
  fetch(url + "?brand=" + marca)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      for (let i = 0; i < datos.length; i++) {
        if (!listaProductos.includes(datos[i].product_type)) {
          listaProductos.push(datos[i].product_type);
          opcionesProducto += `
      <option value="${datos[i].product_type}">${datos[i].product_type}</option>
      `;
        }
      }
      document.getElementById("type").innerHTML = `
    <select onchange="seleccionaTipo(event)" id="typeSeleccion" name="type">
      ${opcionesProducto}
    </select>
    `;
      document.getElementById("resultados").innerHTML = "";
    });
}

function eligeProducto() {
  listaMarcas = [];
  opcionesMarca = "";
  /* producto = document.getElementById("typeSeleccion").value; */
  console.log(url + "&product_type=" + producto);
  fetch(url + "?product_type=" + producto)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      for (let i = 0; i < datos.length; i++) {
        if (!listaMarcas.includes(datos[i].brand)) {
          listaMarcas.push(datos[i].brand);
          opcionesMarca += `
        <option value="${datos[i].brand}">${datos[i].brand}</option>
        `;
        }
      }
      document.getElementById("brand").innerHTML = `
      <select onchange="seleccionaMarca(event)" id="brandSeleccion" name="brand">
        ${opcionesMarca}
      </select>
      `;
    });
}

function ensena() {
  opcionesFinales = "";
  console.log(url + "?brand=" + marca + "&product_type=" + producto);
  fetch(url + "?brand=" + marca + "&product_type=" + producto)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      console.log(datos)
      if (datos.length == 0) {
        document.getElementById("resultados").innerHTML =
          "<h1>No se encuentran resultados</h1>";
      } else {
        for (i = 0; i < datos.length; i++) {
          opcionesFinales += `
        <div id="producto">
        <div id="productoIMG">
        <img src="${datos[i].image_link}" alt="${datos[i].name}" />
        </div>
        <div id="productoDatos">
        <a href="${datos[i].product_link}" /><h3>${datos[i].name}</h3></a>
        <p>${datos[i].description}</p>
        <a onclick="hacerFavorito()">Añadir a favorito</a>
        </div>
        </div>
        `;
        }
        document.getElementById("resultados").innerHTML = opcionesFinales;
      }
    });
} 

function genera() {
  eligeMarca();
  eligeProducto();
}

function seleccionaMarca(e) {
  console.log(e.target.value);
  marca = e.target.value;
}
function seleccionaTipo(e) {
  producto = e.target.value;
  console.log(producto);
}

function hacerFavorito(){
  fetch(url + "?brand=" + marca + "&product_type=" + producto)

  favorito = document.getElementById('favorito').value;
  document.getElementById('resultado').innerHTML = favorito;
  localStorage.setItem('favorito', favorito);

}