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