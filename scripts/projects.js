// Script per gestire i percorsi delle immagini e delle pagine dei progetti
const projects = [
	{
		name: "Progetto 1",
		page: "../Progetti/Progetto 1/progetto.html",
		preview: "../Progetti/Progetto 1/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto 1.",
		tags: ["fotografia", "architettura"],
		startDate: "2024-01",
		endDate: "2024-03",
		images: [
			"../Progetti/Progetto 1/img/_MG_8638.jpg",
			"../Progetti/Progetto 1/img/_MG_8646.jpg",
			"../Progetti/Progetto 1/img/_MG_8652-2.jpg",
			"../Progetti/Progetto 1/img/_MG_8669.jpg"
		]
	},
	{
		name: "Progetto 2",
		page: "../Progetti/Progetto 2/progetto.html",
		preview: "../Progetti/Progetto 2/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto 2.",
		tags: ["ritratto", "studio"],
		startDate: "2023-10",
		endDate: "2023-12",
		media: [
			"../Progetti/Progetto 2/img/578079302214894359-loop.mp4",
			"../Progetti/Progetto 2/img/segno contrasti.pdf"
		],
		images: [
			"../Progetti/Progetto 2/img/_MG_8638.jpg",
			"../Progetti/Progetto 2/img/_MG_8646.jpg",
			"../Progetti/Progetto 2/img/_MG_8652-2.jpg",
			"../Progetti/Progetto 2/img/_MG_8669.jpg"
		]
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
		page: "../Progetti Open/Progetto 1/progetto.html",
		preview: "../Progetti Open/Progetto 1/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 1.",
		tags: ["open", "fotografia"],
		startDate: "2024-01",
		endDate: "2024-03",
		images: [
			"../Progetti Open/Progetto 1/img/_MG_8638.jpg",
			"../Progetti Open/Progetto 1/img/_MG_8646.jpg",
			"../Progetti Open/Progetto 1/img/_MG_8652-2.jpg",
			"../Progetti Open/Progetto 1/img/_MG_8669.jpg"
		]
	},
	{
		name: "Progetto 2",
		page: "../Progetti Open/Progetto 2/progetto.html",
		preview: "../Progetti Open/Progetto 2/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 2.",
		tags: ["open", "ritratto"],
		startDate: "2023-10",
		endDate: "2023-12",
		media: [
			"../Progetti Open/Progetto 2/img/578079302214894359.mp4",
			"../Progetti Open/Progetto 2/img/segno contrasti.pdf"
		],
		images: [
			"../Progetti Open/Progetto 2/img/_MG_8638.jpg",
			"../Progetti Open/Progetto 2/img/_MG_8646.jpg",
			"../Progetti Open/Progetto 2/img/_MG_8652-2.jpg",
			"../Progetti Open/Progetto 2/img/_MG_8669.jpg"
		]
	}
];
