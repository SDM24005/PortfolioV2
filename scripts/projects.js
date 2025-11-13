// Script per gestire i percorsi delle immagini e delle pagine dei progetti

// Progetti base con tag lunghi fittizi e anni vari
const baseProjects = [
    {
        name: "Biocare",
        page: "../Progetti/biocare/progetto.html",
        preview: "../Progetti/biocare/img/preview.jpg",
        description: "Questo è il testo descrittivo del Progetto 1.",
        tags: ["packaging", "grafica", "brand identity", "design system", "typography", "visual communication"],
        startDate: "2024",
        endDate: "",
        images: [
            "../Progetti/biocare/img/packaging-front.jpg",
            "../Progetti/biocare/img/packaging-back.jpg" ]
    },
    {
        name: "Test",
        page: "../Progetti/progetto-normale/progetto.html",
        preview: "../Progetti/progetto-normale/img/preview.png",
        description: "Questo è il testo descrittivo del Progetto Test.",
        tags: ["test", "grafica", "web design", "user interface", "digital", "interaction design"],
        startDate: "2024",
        endDate: "",
        images: []
    },
    {
        name: "Progetto 2023",
        page: "../Progetti/biocare/progetto.html",
        preview: "../Progetti/biocare/img/preview.jpg",
        description: "Progetto dell'anno 2023.",
        tags: ["editorial design", "print", "layout", "photography", "art direction"],
        startDate: "2023",
        endDate: "",
        images: []
    },
    {
        name: "Progetto 2022",
        page: "../Progetti/biocare/progetto.html",
        preview: "../Progetti/biocare/img/preview.jpg",
        description: "Progetto dell'anno 2022.",
        tags: ["motion graphics", "animation", "video", "post-production", "color grading"],
        startDate: "2022",
        endDate: "",
        images: []
    },
    {
        name: "Progetto 2021",
        page: "../Progetti/biocare/progetto.html",
        preview: "../Progetti/biocare/img/preview.jpg",
        description: "Progetto dell'anno 2021.",
        tags: ["illustration", "drawing", "sketching", "character design", "concept art"],
        startDate: "2021",
        endDate: "",
        images: []
    },
    {
        name: "Progetto 2020",
        page: "../Progetti/biocare/progetto.html",
        preview: "../Progetti/biocare/img/preview.jpg",
        description: "Progetto dell'anno 2020.",
        tags: ["social media", "content creation", "strategy", "campaign", "advertising"],
        startDate: "2020",
        endDate: "",
        images: []
    },
    {
        name: "Progetto 2019",
        page: "../Progetti/biocare/progetto.html",
        preview: "../Progetti/biocare/img/preview.jpg",
        description: "Progetto dell'anno 2019.",
        tags: ["exhibition design", "spatial design", "installation", "museography", "lighting design"],
        startDate: "2019",
        endDate: "",
        images: []
    },
    {
        name: "Progetto 2018",
        page: "../Progetti/biocare/progetto.html",
        preview: "../Progetti/biocare/img/preview.jpg",
        description: "Progetto dell'anno 2018.",
        tags: ["corporate identity", "logo design", "branding", "stationery", "business cards"],
        startDate: "2018",
        endDate: "",
        images: []
    }
];

// Funzione per mischiare un array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Duplica alternando i progetti per avere più varietà (10 volte = 80 progetti)
const projectsTemp = [];
for (let i = 0; i < 10; i++) {
    baseProjects.forEach((project, index) => {
        projectsTemp.push({
            ...project,
            name: `${project.name} ${i + 1}`
        });
    });
}

// Mischia l'array dei progetti per distribuire casualmente le preview
const projects = shuffleArray(projectsTemp);

// Esempio di come accedere alle preview per la galleria
const galleryPreviews = projects.map(p => p.preview);

// Esempio di come accedere alle immagini dei progetti
const allProjectImages = projects.flatMap(p => p.images);

// Esempio di come accedere alle pagine dei progetti
const projectPages = projects.map(p => p.page);

