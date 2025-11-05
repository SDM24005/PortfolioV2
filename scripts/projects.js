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
		tags: ["open", "fotografia", "tag1", "tag2"],
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
		tags: ["open", "ritratto", "tag3", "tag4"],
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
	},
	{
		name: "Progetto 3",
		page: "../Progetti Open/Progetto 1/progetto.html",
		preview: "../Progetti Open/Progetto 2/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 3.",
		tags: ["open", "architettura", "tawawaa"],
		startDate: "2024-02",
		endDate: "2024-04",
		images: [
			"../Progetti Open/Progetto 1/img/_MG_8638.jpg",
			"../Progetti Open/Progetto 1/img/_MG_8646.jpg",
			"../Progetti Open/Progetto 1/img/_MG_8652-2.jpg",
			"../Progetti Open/Progetto 1/img/_MG_8669.jpg"
		]
	},
	{
		name: "Progetto 4",
		page: "../Progetti Open/Progetto 2/progetto.html",
		preview: "../Progetti Open/Progetto 1/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 4.",
		tags: ["open", "fotografia", "studio", "taegrrgdswa6", "tfsfsfsds"],
		startDate: "2023-11",
		endDate: "2024-01",
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
	},
	{
		name: "Progetto 5",
		page: "../Progetti Open/Progetto 1/progetto.html",
		preview: "../Progetti Open/Progetto 1/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 5.",
		tags: ["open", "ritratto", "architettura", "tarearesgeg", "tarearesgeg", "tarsearesgeg", "tarearfeesgesaag", "taefrearesgeg"],
		startDate: "2024-03",
		endDate: "2024-05",
		images: [
			"../Progetti Open/Progetto 1/img/_MG_8638.jpg",
			"../Progetti Open/Progetto 1/img/_MG_8646.jpg",
			"../Progetti Open/Progetto 1/img/_MG_8652-2.jpg",
			"../Progetti Open/Progetto 1/img/_MG_8669.jpg"
		]
	},
	{
		name: "Progetto 6",
		page: "../Progetti Open/Progetto 2/progetto.html",
		preview: "../Progetti Open/Progetto 2/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 6.",
		tags: ["open", "studio", "tagggs10rgr"],
		startDate: "2023-09",
		endDate: "2023-11",
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
