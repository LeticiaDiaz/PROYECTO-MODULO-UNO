let url = "http://makeup-api.herokuapp.com/api/v1/products.json";
let marca = "";
let opcionesProducto = "";
let listaProductos = [];
let producto = "";
let listaMarcas = [];
let opcionesMarca = "";
let opcionesFinales = "";

function eligeMarca() {
  listaProductos = [];
  opcionesProducto = "";
  marca = document.getElementById("brandSeleccion").value;
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
    <select onchange="eligeProducto()" id="typeSeleccion" name="type">
      ${opcionesProducto}
    </select>
    `;
    });
}

function eligeProducto() {
  listaMarcas = [];
  opcionesMarca = "";
  producto = document.getElementById("typeSeleccion").value;
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
      <select onchange="eligeMarca()" id="brandSeleccion" name="brand">
        ${opcionesMarca}
      </select>
      `;
    });
}

function ensena() {
  opcionesFinales = ""
  marca = document.getElementById("brandSeleccion").value;
  producto = document.getElementById("typeSeleccion").value;
  fetch(url + "?brand=" + marca + "&product_type=" + producto)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      for (i = 0; i < datos.length; i++) {
        opcionesFinales += `
        <div id="producto">
        <div id="productoIMG">
        <img src="${datos[i].image_link}" alt="${datos[i].name}" />
        </div>
        <div id="productoDatos">
        <a href="${datos[i].product_link}" /><h3>${datos[i].name}</h3></a>
        <p>${datos[i].description}</p>
        </div>
        </div>
        `;
      }
      document.getElementById("resultados").innerHTML = opcionesFinales;
    });
}
