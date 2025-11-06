// Script per gestire i percorsi delle immagini e delle pagine dei progetti
const projects = [ 
    {
        name: "Biocare",
        page: "../Progetti/biocare/progetto.html",
        preview: "../Progetti/biocare/img/preview.jpg",
        description: "Questo è il testo descrittivo del Progetto 1.",
        tags: ["packaging", "grafica"],
        startDate: "2024",
        endDate: "",
        images: [
            "../Progetti/biocare/img/packaging-front.jpg",
            "../Progetti/biocare/img/packaging-back.jpg" ]
        }
];

// Esempio di come accedere alle preview per la galleria
const galleryPreviews = projects.map(p => p.preview);

// Esempio di come accedere alle immagini dei progetti
const allProjectImages = projects.flatMap(p => p.images);

// Esempio di come accedere alle pagine dei progetti
const projectPages = projects.map(p => p.page);

// Progetti Open
const openProjects = [    
    {
    name: "Biocare",
    page: "../Progetti Open/biocare/progetto.html",
    preview: "../Progetti Open/biocare/img/preview.jpg",
    description: "Questo è il testo descrittivo del Progetto 1.",
    tags: ["packaging", "grafica"],
    startDate: "2024",
    endDate: "",
    images: [
        "../Progetti Open/biocare/img/packaging-front.jpg",
        "../Progetti Open/biocare/img/packaging-back.jpg" ]
    }
];
