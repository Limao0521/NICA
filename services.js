const apiUrl = 'https://script.google.com/macros/s/AKfycbx7Kq3NZXDzwyOnrjQER0sCTJFiSVHB2IBxFoNDq2V0cU9WPrNbIKioOA83I-I8fHOKXg/exec ';

let tito = {};
let croqui = {};
let addi = {};
let logo = {}; 

// Variables para almacenar los datos fuera de la función fetch
let nombres = [];
let descripciones = [];
let imagenes = [];

// Array personas que se llenará dinámicamente
let personas = [];
// Mostrar información e imagen según el índice
function mostrarPersona(index) {
    const persona = personas[index];
    document.getElementById('title').textContent = persona.nombre;
    document.getElementById('description').textContent = persona.descripcion;
    document.getElementById('image').src = persona.imagen;
}

// Mostrar la persona anterior
function showPrevious() {
    currentIndex = (currentIndex - 1 + personas.length) % personas.length;
    mostrarPersona(currentIndex);
}

// Mostrar la siguiente persona
function showNext() {
    currentIndex = (currentIndex + 1) % personas.length;
    mostrarPersona(currentIndex);
}

// Obtener los parámetros de la URL
function obtenerParametroURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

// Elegir una persona aleatoria
function personaAleatoria() {
    return Math.floor(Math.random() * personas.length);
}

// Cargar la información basada en el parámetro QR o aleatoriamente si no hay parámetro
window.onload = function () {
    // Hacer la solicitud GET
    fetch(apiUrl)
    .then(response => response.json())
    .then(result => {
        const productos = result.data; // Accede al array dentro de 'data'

        // Filtrar productos específicos por ID
        tito = productos.find(item => item.ID === 21);
        croqui = productos.find(item => item.ID === 22);
        addi = productos.find(item => item.ID === 23);
        logo = productos.find(item => item.ID === 24);

        // Extraer nombres, descripciones e imágenes
        nombres = productos.filter(item => [21, 22, 23].includes(item.ID)).map(item => item.Nombre);
        descripciones = productos.filter(item => [21, 22, 23].includes(item.ID)).map(item => item.Descripción);
        imagenes = productos.filter(item => [21, 22, 23].includes(item.ID)).map(item => item.Imagen);

        // Llenar el array personas con los datos obtenidos
        personas = nombres.map((nombre, index) => ({
            nombre: nombre,
            descripcion: descripciones[index],
            imagen: imagenes[index]
        }));

        console.log('Personas:', personas); // Verificar los datos cargados

        // Iniciar el carrusel
        const personaParam = obtenerParametroURL('persona');
        if (personaParam) {
            const index = personas.findIndex(p => p.nombre.toLowerCase() === personaParam.toLowerCase());
            currentIndex = index !== -1 ? index : personaAleatoria();
        } else {
            currentIndex = personaAleatoria();
        }

        mostrarPersona(currentIndex); // Mostrar la primera persona
    })
    .catch(error => console.error('Error:', error));
};
