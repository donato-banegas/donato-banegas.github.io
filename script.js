let nightMode = false;
let currentPage = "home-page";

function updateButtonColor(pageId) {
  let buttons = document.querySelectorAll(".topnav button");

  buttons.forEach((button, index) => {
    // Reiniciamos el color de fondo solo de los primeros tres botones
    if (index < 3) {
      button.style.backgroundColor = "white";
    }
  });
  
  // Obtenemos el ID del botón correspondiente a la página actual
  let buttonId = pageId.replace("-page", "-button");
  let currentButton = document.getElementById(buttonId);
  
  if (currentButton) {
    // Establecemos el color de fondo del botón actual a verde
    currentButton.style.backgroundColor = "green";
  } else {
    console.error("No se encontró ningún botón correspondiente a la página:", pageId);
  }
}

function renderPage(pageId) {
  // Oculta todas las páginas
  let homePage = document.getElementById("home-page");
  let projectsPage = document.getElementById("projects-page");
  let aboutMePage = document.getElementById("about-me-page");
  
  if (homePage) {
    homePage.style.display = "none";
  }
  if (projectsPage) {
    projectsPage.style.display = "none";
  }
  if (aboutMePage) {
    aboutMePage.style.display = "none";
  }
  
  // Muestra la página deseada
  let currentPageElement = document.getElementById(pageId);
  if (currentPageElement) {
    currentPageElement.style.display = "block";
  } else {
    console.error("No se encontró ningún elemento con el ID proporcionado:", pageId);
  }
}

function updatePage(pageId){
  currentPage = pageId;
  updateButtonColor(currentPage);
  renderPage(currentPage);
}

// Function to change to Light or Dark Mode.
function Dark_Light_Mode(){
  let toggleButtonId = document.getElementById('dark-light-button');

  // Cambiar el estilo del botón
  if (nightMode == true) {
    toggleButtonId.style.backgroundColor = 'white';
  } else {
    toggleButtonId.style.backgroundColor = 'yellow';
  }


  // Cambiar el estilo del cuerpo (body)
  let body = document.body;
  if (nightMode == true) {
    body.style.backgroundColor = 'white';
    body.style.color = 'black';  
  } else {
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
  }

  // Change the Text.
  if(toggleButtonId.textContent === "Turn Light ON"){
    toggleButtonId.textContent = "Turn Light OFF ";
  } else {
    toggleButtonId.textContent = "Turn Light ON";
  }

  // Invert the state.
  nightMode = !nightMode;
};

function changeLanguage(){
  console.log("You changed the Language...!");
}

function calculateCareerProgress(){
  // Obtener todas las filas de la tabla de materias
  let filas = document.querySelectorAll("#tablaMaterias tr");
  let totalMaterias = filas.length - 1; // Restamos 1 porque la primera fila es el encabezado

  // Contador para llevar la cuenta de las materias aprobadas
  let materiasAprobadas = 0;
  let sumaNotas = 0;

  // Iterar sobre cada fila excepto la primera (encabezado)
  for (let i = 1; i < filas.length; i++) {
    // Obtener la celda correspondiente a "Aprobada" de la fila actual
    let celdaAprobada = filas[i].querySelectorAll("td")[1];
    let celdaNota = filas[i].querySelectorAll("td")[2];
            
    // Verificar si la materia está aprobada (si contiene "Sí")
    if (celdaAprobada.textContent.trim() === "Sí") {
      materiasAprobadas++;
      // Verificar si hay una nota o si la materia está aprobada sin nota
      if (celdaNota.textContent.trim() !== "Aprobado" && celdaNota.textContent.trim() !== "-") {
          sumaNotas += parseInt(celdaNota.textContent.trim());
      }
    }
  }

  // Calcular el porcentaje de progreso
  let porcentajeProgreso = (materiasAprobadas / totalMaterias) * 100;

  // Calcular el promedio de notas
  let promedioNotas = (sumaNotas / materiasAprobadas).toFixed(2);

  // Actualizar la barra de progreso
  let progressBar = document.getElementById('progressBar');
  progressBar.value = porcentajeProgreso;

  let progressValue = document.getElementById('progressValue');
  progressValue.textContent = Math.round(porcentajeProgreso);

  // Mostrar el promedio de notas
  let promedioNotasElement = document.getElementById('promedioNotas');
  promedioNotasElement.textContent = promedioNotas;


}


updatePage(currentPage);
calculateCareerProgress();