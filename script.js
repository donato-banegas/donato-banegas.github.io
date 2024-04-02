let nightMode = false;
let currentPage = "home-page";
let currentLanguage = "English";


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

function updateVersant(){
  // Mostrar Prueba Versant correcta.
  let versantTest1 = document.getElementById("versant1");
  let versantTest2 = document.getElementById("versant2");
  if (currentLanguage === "English") {
    if (nightMode) {
      versantTest1.src = "./img/versant1-en-d.png";
      versantTest2.src = "./img/versant2-en-d.png";
    } else {
      versantTest1.src = "./img/versant1-en-l.png";
      versantTest2.src = "./img/versant2-en-l.png";
    }
  } else {  // Entonces es "Spanish"
    if (nightMode) {
      versantTest1.src = "./img/versant1-es-d.png";
      versantTest2.src = "./img/versant2-es-d.png";
    } else {
      versantTest1.src = "./img/versant1-es-l.png";
      versantTest2.src = "./img/versant2-es-l.png";
    }
  }
}

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

  updateVersant();
};

function changeLanguage(){
  let languageButton = document.getElementById('change-language-button');

  // Change the Text.
  if(languageButton.textContent === "Cambiar a Español"){
    languageButton.textContent = "Change to English";
    currentLanguage = "Spanish";
    // Ocultar contenido en inglés y mostrar contenido en español
    document.querySelectorAll('.en').forEach(element => {
      element.style.display = 'none';
    });
    document.querySelectorAll('.es').forEach(element => {
      element.style.display = 'block';
    });

  } else {
    languageButton.textContent = "Cambiar a Español";
    currentLanguage = "English";
    // Ocultar contenido en español y mostrar contenido en inglés
    document.querySelectorAll('.es').forEach(element => {
      element.style.display = 'none';
    });
    document.querySelectorAll('.en').forEach(element => {
      element.style.display = 'block';
    });
  }

  updateVersant();
  updatePage(currentPage);
}

function calculateCareerProgress(){
  // Get all rows from the subject table
  let rows = document.querySelectorAll("#subject-table tr");
  let totalSubjects = rows.length - 1; // We subtract 1 because the first row is the header

  // Counters to keep track of approved subjects and sum for the average.
  let approvedSubjects = 0;
  let sumGrades = 0;

  // Iterate over every row except the first (header)
  for (let i = 1; i < rows.length; i++) {
    // Get the cell corresponding to "Aprobado" of the current row
    let cellApproved = rows[i].querySelectorAll("td")[1];
    let cellGrade = rows[i].querySelectorAll("td")[2];
            
    // Check if the subject is approved (if it contains "Sí")
    if (cellApproved.textContent.trim() === "Sí") {
      approvedSubjects++;
      // Check if there is a grade or if the subject is approved without a grade
      if (cellGrade.textContent.trim() !== "Aprobado" && cellGrade.textContent.trim() !== "-") {
        sumGrades += parseInt(cellGrade.textContent.trim());
      }
    }
  }

  // Calculate the percentage of progress and the average.
  let percentageProgress = (approvedSubjects / totalSubjects) * 100;
  let averageGrade = (sumGrades / approvedSubjects).toFixed(2);

  // Get elements from the HTML.
  let progressBar = document.getElementById('progressBar');
  let progressValue = document.getElementById('progressValue');
  let averageGradeElement = document.getElementById('averageGrade');

  // Update the contents.
  progressBar.value = percentageProgress;
  progressValue.textContent = Math.round(percentageProgress);
  averageGradeElement.textContent = averageGrade;
}


updatePage(currentPage);
calculateCareerProgress();