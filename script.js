let lightState = "ON"; // Estado inicial de la luz
let currentPage = "home-page";
let currentLanguage = "english";

console.log(lightState);

function updateButtonColor(pageId) {
  let buttons = document.querySelectorAll(".topnav button");

  buttons.forEach((button, index) => {
    // Reiniciamos el color de fondo solo de los primeros cuatro botones
    if (index < 4) {
      button.style.backgroundColor = "white";
    }
  });
  
  // Obtenemos el ID del botón correspondiente a la página actual
  let buttonId = pageId.replace("-page", "-button");
  let currentButton = document.getElementById(buttonId);
  
  if (currentButton) {
    // Establecemos el color de fondo del botón actual a verde
    currentButton.style.backgroundColor = "#98fb98";
  } else {
    console.error("No se encontró ningún botón correspondiente a la página:", pageId);
  }
}

function renderPage(pageId) {

  let elementIds = ["home-page", "education-page", "proyects-page", "inicio-page",
  "educacion-page","proyectos-page","skills-page",
  "habilidades-page","certificados-page","certificates-page"];

  // Ocultar todos los elementos de la lista
  elementIds.forEach(function(elementId) {
    let element = document.getElementById(elementId);
    if (element) {
      element.style.display = "none";
    } else {
      console.error("No se encontró ningún elemento con el ID proporcionado:", elementId);
    }
  });
  
  // Ahora hay que mostrar en pantalla.
  let pageElement = document.getElementById(pageId);
  if (pageElement) {
    // Verificar el estado actual de visibilidad del elemento y cambiarlo
    if (pageElement.style.display === "none") {
      pageElement.style.display = "block"; // Si está oculto, mostrarlo
    } else {
      pageElement.style.display = "none"; // Si está visible, ocultarlo
    }
  } else {
    console.error("No se encontró ningún elemento con el ID proporcionado:", elementId);
  }
}

function translateId(pageId){
  if(currentLanguage === "spanish"){
    switch(pageId){ // Hay que traducir.
      case "home-page":
        return "inicio-page";
      case "education-page":
        return "educacion-page";
      case "proyects-page":
        return "proyectos-page";
      case "skills-page":
        return "habilidades-page";
      case "certificates-page":
        return "certificados-page";
    }
  } else {
    return pageId;
  }
}

function updatePage(pageId){
  currentPage = pageId; // Mantenemos siempre almacenada la pagina actual en una variable.
  updateVersant();
  updateButtonColor(currentPage);
  showLanguageContent(currentLanguage);  
  let translatedId = translateId(pageId);
  renderPage(translatedId);
}

function showLanguageContent(language) {
  let englishDiv = document.getElementById("en");
  let spanishDiv = document.getElementById("es");

  if (language === "english") {
    englishDiv.style.display = "block";
    spanishDiv.style.display = "none";
    console.log("Actualmente deberías estar viendo: inglés");
  } else if (language === "spanish") {
    englishDiv.style.display = "none";
    spanishDiv.style.display = "block";
    console.log("Actualmente deberías estar viendo: español");
  }
}

function updateVersant() {
  let versantTests = document.querySelectorAll(".versant1, .versant2"); // Seleccionamos los elementos con las clases "versant1" y "versant2"
  let languagePrefix = currentLanguage === "english" ? "en" : "es";
  let lightModeSuffix = lightState === "ON" ? "-l.png" : "-d.png";
  
  versantTests.forEach(function(versantTest) {
    let imageName = versantTest.classList.contains("versant1") ? "versant1" : "versant2"; // Determinamos si es versant1 o versant2
    versantTest.src = `./img/${imageName}-${languagePrefix}${lightModeSuffix}`; // Construimos la ruta de la imagen
  });
}

function changeLanguage(){

  if (currentLanguage === "english") {
    // Cambiar a español
    currentLanguage = "spanish";
    document.getElementById("home-button").innerText = "Inicio";
    document.getElementById("education-button").innerText = "Educación";
    document.getElementById("skills-button").innerText = "Habilidades";
    document.getElementById("certificates-button").innerText = "Certificados";
    document.getElementById("proyects-button").innerText = "Proyectos";
    document.getElementById("dark-light-button").innerText = lightState === "ON" ? "Apagar luz" : "Encender luz";
    document.getElementById("change-language-button").innerText = "Switch to English";
  } else if (currentLanguage === "spanish") {
    // Cambiar a inglés
    currentLanguage = "english";
    document.getElementById("home-button").innerText = "Home";
    document.getElementById("education-button").innerText = "Education";
    document.getElementById("skills-button").innerText = "Skills";
    document.getElementById("certificates-button").innerText = "Certificates";
    document.getElementById("proyects-button").innerText = "Proyects";
    document.getElementById("dark-light-button").innerText = lightState === "ON" ? "Turn Light OFF" : "Turn Light ON";
    document.getElementById("change-language-button").innerText = "Cambiar a Español";
  }
  updatePage(currentPage);
}

function toggleLight(){
  let toggleButtonId = document.getElementById("dark-light-button");
  let body = document.body;

  // Cambiar el estilo del botón
  toggleButtonId.style.backgroundColor = (lightState === "ON") ? 'yellow' : 'white';

  // Cambiar el estilo del cuerpo (body)
  body.style.backgroundColor = (lightState === "ON") ? '#121212' : 'whitesmoke';
  body.style.color = (lightState === "ON") ? 'whitesmoke' : 'black';

  // Cambiar el texto del botón
  if (currentLanguage === "english") {
    toggleButtonId.textContent = (lightState === "ON") ? "Turn Light ON" : "Turn Light OFF";
  } else if (currentLanguage === "spanish") {
    toggleButtonId.textContent = (lightState === "ON") ? "Encender Luz" : "Apagar Luz";
  }
  // Cambiar el estado de la luz
  lightState = (lightState === "ON") ? "OFF" : "ON";

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

  // Calculate the average with 2 significant digits
  let averageGrade = (sumGrades / approvedSubjects).toFixed(2);;
  let percentageProgress = (approvedSubjects / totalSubjects) *100;

  // Update the elements of the ES section.
  let progressBarES = document.getElementById('progressBarES');
  let progressValueES = document.getElementById('span-progress-value-ES');
  let averageGradeES = document.getElementById('span-average-grade-ES');

  progressBarES.value = percentageProgress;
  progressValueES.textContent = Math.round(percentageProgress);
  averageGradeES.textContent = averageGrade;

  // Update the elements of the EN section.
  let progressBarEN = document.getElementById('progressBarEN');
  let progressValueEN = document.getElementById('span-progress-value-EN');
  let averageGradeEN = document.getElementById('span-average-grade-EN');

  progressBarEN.value = percentageProgress;
  progressValueEN.textContent = Math.round(percentageProgress);
  averageGradeEN.textContent = averageGrade;
}

updatePage(currentPage);
calculateCareerProgress();