let url = "http://makeup-api.herokuapp.com/api/v1/products.json";
let marca = "";
let opcionesProducto = "";
let listaProductos = [];
let producto = "";
let listaMarcas = [];
let opcionesMarca = "";
let opcionesFinales = "";
let favorito = "";
let listaEnsenyados = [];
let favoritos = [];
let misFavoritos = "";

eligeMarca();
eligeProducto();
actualizaFavorito();

function eligeMarca() {
  listaProductos = [];
  opcionesProducto = "";
  document.getElementById("resultados").innerHTML = "<h2>CARGANDO...</h2>";
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
  listaEnsenyados = [];
  opcionesFinales = "";
  console.log(url + "?brand=" + marca + "&product_type=" + producto);
  fetch(url + "?brand=" + marca + "&product_type=" + producto)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      console.log(datos);
      if (datos.length == 0) {
        document.getElementById("resultados").innerHTML =
          "<h1>No se encuentran resultados</h1>";
      } else {
        for (i = 0; i < datos.length; i++) {
          listaEnsenyados.push({
            id: datos[i].id,
            image: datos[i].image_link,
            name: datos[i].name,
            link: datos[i].product_link,
            description: datos[i].description,
          });
          opcionesFinales += `
        <div id="producto">
        <div id="productoIMG">
        <img src="${datos[i].image_link}" alt="${datos[i].name}" />
        </div>
        <div id="productoDatos">
        <a href="${datos[i].product_link}" /><h3>${datos[i].name}</h3></a>
        <p>${datos[i].description}</p>
        <a onclick="hacerFavorito(${i})">Añadir a favorito</a>
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

function hacerFavorito(i) {
  console.log(listaEnsenyados[i]);
  favoritos.push(listaEnsenyados[i]);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function actualizaFavorito() {
  if (localStorage.getItem("favoritos") == null) {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }
  favoritos = JSON.parse(localStorage.getItem("favoritos"));
  console.log(favoritos);
}

function ensenyaFavoritos() {
  actualizaFavorito();
  for (i = 0; i < favoritos.length; i++) {
    misFavoritos += `
  <div id="producto">
  <div id="productoIMG">
  <img src="${favoritos[i].image}" alt="${favoritos[i].name}" />
  </div>
  <div id="productoDatos">
  <a href="${favoritos[i].link}" /><h3>${favoritos[i].name}</h3></a>
  <p>${favoritos[i].description}</p>
  </div>
  </div>
  `;
  }
  document.getElementById("misFavoritos").innerHTML = misFavoritos;
}
