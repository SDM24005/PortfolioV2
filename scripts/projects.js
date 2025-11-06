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
	},
	{
		name: "Progetto Test 2",
		page: "../Progetti/progetto-2/progetto.html",
		preview: "../Progetti/progetto-2/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Test 2.",
		tags: ["test", "grafica"],
		startDate: "",
		endDate: "",
		images: [
			"../Progetti/progetto-2/img/packaging-front.jpg",
			"../Progetti/progetto-2/img/packaging-back.jpg",
			"../Progetti/progetto-2/img/etichetta.png"		]
	},
	{
		name: "Progetto Test 3",
		page: "../Progetti/progetto-3/progetto.html",
		preview: "../Progetti/progetto-3/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Test 3.",
		tags: ["test", "packaging"],
		startDate: "",
		endDate: "",
		images: [
			"../Progetti/progetto-3/img/packaging-front.jpg",
			"../Progetti/progetto-3/img/packaging-back.jpg",
			"../Progetti/progetto-3/img/etichetta.png"		]
	},
	{
		name: "Progetto Test 4",
		page: "../Progetti/progetto-4/progetto.html",
		preview: "../Progetti/progetto-4/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Test 4.",
		tags: ["test", "design"],
		startDate: "",
		endDate: "",
		images: [
			"../Progetti/progetto-4/img/packaging-front.jpg",
			"../Progetti/progetto-4/img/packaging-back.jpg",
			"../Progetti/progetto-4/img/etichetta.png"		]
	},
	{
		name: "Progetto Test 5",
		page: "../Progetti/progetto-5/progetto.html",
		preview: "../Progetti/progetto-5/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Test 5.",
		tags: ["test", "grafica"],
		startDate: "",
		endDate: "",
		images: [
			"../Progetti/progetto-5/img/packaging-front.jpg",
			"../Progetti/progetto-5/img/packaging-back.jpg",
			"../Progetti/progetto-5/img/etichetta.png"		]
	},
	{
		name: "Progetto Test 6",
		page: "../Progetti/progetto-6/progetto.html",
		preview: "../Progetti/progetto-6/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Test 6.",
		tags: ["test", "packaging"],
		startDate: "",
		endDate: "",
		images: [
			"../Progetti/progetto-6/img/packaging-front.jpg",
			"../Progetti/progetto-6/img/packaging-back.jpg",
			"../Progetti/progetto-6/img/etichetta.png"		]
	},
	{
		name: "Progetto Test 7",
		page: "../Progetti/progetto-7/progetto.html",
		preview: "../Progetti/progetto-7/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Test 7.",
		tags: ["test", "design"],
		startDate: "",
		endDate: "",
		images: [
			"../Progetti/progetto-7/img/packaging-front.jpg",
			"../Progetti/progetto-7/img/packaging-back.jpg",
			"../Progetti/progetto-7/img/etichetta.png"		]
	},
	{
		name: "Progetto Test 8",
		page: "../Progetti/progetto-8/progetto.html",
		preview: "../Progetti/progetto-8/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Test 8.",
		tags: ["test", "grafica"],
		startDate: "",
		endDate: "",
		images: [
			"../Progetti/progetto-8/img/packaging-front.jpg",
			"../Progetti/progetto-8/img/packaging-back.jpg",
			"../Progetti/progetto-8/img/etichetta.png"		]
	},
	{
		name: "Progetto Test 9",
		page: "../Progetti/progetto-9/progetto.html",
		preview: "../Progetti/progetto-9/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Test 9.",
		tags: ["test", "packaging"],
		startDate: "",
		endDate: "",
		images: [
			"../Progetti/progetto-9/img/packaging-front.jpg",
			"../Progetti/progetto-9/img/packaging-back.jpg",
			"../Progetti/progetto-9/img/etichetta.png"		]
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
		name: "Progetto Open 1",
		page: "../Progetti Open/progetto-1/progetto.html",
		preview: "../Progetti Open/progetto-1/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 1.",
		tags: ["fotografia professionale avanzata", "ritratto contemporaneo", "open"],
		startDate: "2024-01",
		endDate: "2024-03",
		images: [
			"../Progetti Open/progetto-1/img/preview.jpg"
		]
	},
	{
		name: "Progetto Open 2",
		page: "../Progetti Open/progetto-2/progetto.html",
		preview: "../Progetti Open/progetto-2/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 2.",
		tags: ["design grafico innovativo", "branding creativo", "open"],
		startDate: "2024-02",
		endDate: "2024-04",
		images: [
			"../Progetti Open/progetto-2/img/preview.jpg"
		]
	},
	{
		name: "Progetto Open 3",
		page: "../Progetti Open/progetto-3/progetto.html",
		preview: "../Progetti Open/progetto-3/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 3.",
		tags: ["illustrazione digitale moderna", "arte concettuale", "open"],
		startDate: "2024-03",
		endDate: "2024-05",
		images: [
			"../Progetti Open/progetto-3/img/preview.jpg"
		]
	},
	{
		name: "Progetto Open 4",
		page: "../Progetti Open/progetto-4/progetto.html",
		preview: "../Progetti Open/progetto-4/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 4.",
		tags: ["packaging design sostenibile", "ecologia e ambiente", "open"],
		startDate: "2024-04",
		endDate: "2024-06",
		images: [
			"../Progetti Open/progetto-4/img/preview.jpg"
		]
	},
	{
		name: "Progetto Open 5",
		page: "../Progetti Open/progetto-5/progetto.html",
		preview: "../Progetti Open/progetto-5/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 5.",
		tags: ["tipografia sperimentale", "lettering artistico", "open"],
		startDate: "2024-05",
		endDate: "2024-07",
		images: [
			"../Progetti Open/progetto-5/img/preview.jpg"
		]
	},
	{
		name: "Progetto Open 6",
		page: "../Progetti Open/progetto-6/progetto.html",
		preview: "../Progetti Open/progetto-6/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 6.",
		tags: ["fotografia di moda editoriale", "styling creativo", "open"],
		startDate: "2024-06",
		endDate: "2024-08",
		images: [
			"../Progetti Open/progetto-6/img/preview.jpg"
		]
	},
	{
		name: "Progetto Open 7",
		page: "../Progetti Open/progetto-7/progetto.html",
		preview: "../Progetti Open/progetto-7/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 7.",
		tags: ["web design responsive", "user experience design", "open"],
		startDate: "2024-07",
		endDate: "2024-09",
		images: [
			"../Progetti Open/progetto-7/img/preview.jpg"
		]
	},
	{
		name: "Progetto Open 8",
		page: "../Progetti Open/progetto-8/progetto.html",
		preview: "../Progetti Open/progetto-8/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 8.",
		tags: ["animazione motion graphics", "video editing creativo", "open"],
		startDate: "2024-08",
		endDate: "2024-10",
		images: [
			"../Progetti Open/progetto-8/img/preview.jpg"
		]
	},
	{
		name: "Progetto Open 9",
		page: "../Progetti Open/progetto-9/progetto.html",
		preview: "../Progetti Open/progetto-9/img/preview.jpg",
		description: "Questo è il testo descrittivo del Progetto Open 9.",
		tags: ["scultura digitale 3D", "modellazione avanzata", "open"],
		startDate: "2024-09",
		endDate: "2024-11",
		images: [
			"../Progetti Open/progetto-9/img/preview.jpg"
		]
	}
];
