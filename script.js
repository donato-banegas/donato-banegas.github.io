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


updatePage(currentPage);