// Script per gestire i percorsi delle immagini e delle pagine dei progetti
const projects = [
	{
		name: "Packaging Biocare",
		page: "../Progetti/packaging-biocare/progetto.html",
		preview: "../Progetti/packaging-biocare/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto 1.",
		tags: ["packaging", "grafica"],
		startDate: "",
		endDate: "",
		images: [
			"../Progetti/packaging-biocare/img/packaging-front.jpg",
			"../Progetti/packaging-biocare/img/packaging-back.jpg",
			"../Progetti/packaging-biocare/img/etichetta.png"		]
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
		name: "Progetto 1",
		page: "../Progetti Open/progetto-1/progetto.html",
		preview: "../Progetti Open/progetto-1/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 1.",
		tags: ["open", "fotografia"],
		startDate: "2024-01",
		endDate: "2024-03",
		images: [
			"../Progetti Open/progetto-1/img/MG_8638.jpg",
			"../Progetti Open/progetto-1/img/MG_8646.jpg",
			"../Progetti Open/progetto-1/img/MG_8652-2.jpg",
			"../Progetti Open/progetto-1/img/MG_8669.jpg"
		]
	}
];
