# Guida Completa: Come Aggiungere Nuovi Progetti

Questa guida ti aiuterà ad aggiungere nuovi progetti al tuo portfolio in modo semplice e organizzato.

## 📋 Indice

1. [Struttura delle Cartelle](#struttura-delle-cartelle)
2. [Tipi di Progetti](#tipi-di-progetti)
3. [Procedura Passo-Passo](#procedura-passo-passo)
4. [Formati File Supportati](#formati-file-supportati)
5. [Linee Guida Dimensioni Immagini](#linee-guida-dimensioni-immagini)
6. [Configurazione in projects.js](#configurazione-in-projectsjs)
7. [Troubleshooting](#troubleshooting)

---

## 📁 Struttura delle Cartelle

Il portfolio è organizzato in due categorie principali:

```
PortfolioV2/
├── Progetti/              # Progetti normali (sfondo nero)
│   ├── progetto-1/
│   │   ├── img/
│   │   │   ├── preview.jpg
│   │   │   └── [altre immagini/video/pdf]
│   │   └── progetto.html
│   └── progetto-2/
│       └── ...
│
├── Progetti Open/         # Progetti open (sfondo bianco)
│   ├── progetto-1/
│   │   ├── img/
│   │   │   ├── preview.jpg
│   │   │   └── [altre immagini/video/pdf]
│   │   └── progetto.html
│   └── progetto-2/
│       └── ...
│
└── Template/             # Template per nuovi progetti
    ├── progetto-normale/
    └── progetto-open/
```

---

## 🎨 Tipi di Progetti

### Progetto Normale
- **Sfondo**: Nero (#000000)
- **Testo**: Bianco
- **Percorso**: `Progetti/progetto-X/`
- **Template**: `Template/progetto-normale/progetto.html`

### Progetto Open
- **Sfondo**: Bianco (#ffffff)
- **Testo**: Nero
- **Percorso**: `Progetti Open/progetto-X/`
- **Template**: `Template/progetto-open/progetto.html`

---

## 📝 Procedura Passo-Passo

### 1. Scegli il Tipo di Progetto

Decidi se il progetto è **normale** (sfondo nero) o **open** (sfondo bianco).

### 2. Crea la Cartella del Progetto

#### Per Progetto Normale:
```bash
# Crea la cartella (sostituisci X con il numero del progetto)
mkdir Progetti/progetto-X
mkdir Progetti/progetto-X/img
```

#### Per Progetto Open:
```bash
# Crea la cartella (sostituisci X con il numero del progetto)
mkdir "Progetti Open/progetto-X"
mkdir "Progetti Open/progetto-X/img"
```

**⚠️ IMPORTANTE**: 
- Usa sempre il formato `progetto-X` (con trattino, senza spazi)
- I nomi delle cartelle devono essere in minuscolo

### 3. Copia il Template HTML

#### Per Progetto Normale:
```bash
copy Template\progetto-normale\progetto.html Progetti\progetto-X\progetto.html
```

#### Per Progetto Open:
```bash
copy Template\progetto-open\progetto.html "Progetti Open\progetto-X\progetto.html"
```

### 4. Prepara i File Media

Inserisci tutti i file del progetto nella cartella `img/`:

```
progetto-X/
└── img/
    ├── preview.jpg          # IMMAGINE OBBLIGATORIA per la galleria
    ├── immagine1.jpg
    ├── immagine2.jpg
    ├── video.mp4            # Video normale (con controlli)
    ├── video-loop.mp4       # Video loop (autoplay, senza controlli)
    └── documento.pdf        # Documento PDF
```

**⚠️ REGOLE IMPORTANTI per i nomi dei file**:
- ✅ Usa solo lettere, numeri, trattini (`-`) e underscore (`_`)
- ✅ Evita spazi nei nomi dei file (usa `-` o `_` invece)
- ✅ Per video loop: aggiungi `-loop` o `_loop` al nome (es: `video-loop.mp4`)
- ✅ La preview DEVE chiamarsi esattamente `preview.jpg`

### 5. Configura il Progetto in `scripts/projects.js`

Apri il file `scripts/projects.js` e aggiungi l'oggetto progetto nell'array appropriato:

#### Per Progetto Normale (aggiungi a `projects`):

```javascript
{
    name: "Nome del Progetto",
    page: "../Progetti/progetto-X/progetto.html",
    preview: "../Progetti/progetto-X/img/preview.jpg",
    description: "Descrizione del progetto. Può essere lungo e contenere più frasi.",
    tags: ["tag1", "tag2", "tag3"],
    startDate: "2024-01",    // Formato: YYYY-MM (opzionale)
    endDate: "2024-03",      // Formato: YYYY-MM (opzionale)
    images: [
        "../Progetti/progetto-X/img/immagine1.jpg",
        "../Progetti/progetto-X/img/immagine2.jpg",
        "../Progetti/progetto-X/img/immagine3.jpg"
    ],
    media: [                 // Opzionale: per video e PDF
        "../Progetti/progetto-X/img/video.mp4",
        "../Progetti/progetto-X/img/documento.pdf"
    ]
}
```

#### Per Progetto Open (aggiungi a `openProjects`):

```javascript
{
    name: "Nome del Progetto Open",
    page: "../Progetti Open/progetto-X/progetto.html",
    preview: "../Progetti Open/progetto-X/img/preview.jpg",
    description: "Descrizione del progetto open.",
    tags: ["open", "tag1", "tag2"],
    startDate: "2024-01",
    endDate: "2024-03",
    images: [
        "../Progetti Open/progetto-X/img/immagine1.jpg",
        "../Progetti Open/progetto-X/img/immagine2.jpg"
    ],
    media: [
        "../Progetti Open/progetto-X/img/video-loop.mp4",
        "../Progetti Open/progetto-X/img/documento.pdf"
    ]
}
```

**⚠️ IMPORTANTE**:
- I percorsi devono iniziare con `../` (due punti e slash)
- Usa sempre `/` (slash) nei percorsi, mai `\` (backslash)
- Per "Progetti Open", mantieni lo spazio nel percorso
- L'ordine degli elementi in `images` e `media` determina l'ordine di visualizzazione

### 6. Verifica che tutto Funzioni

1. Apri il sito in un browser
2. Vai alla galleria
3. Verifica che il progetto appaia
4. Clicca sul progetto e verifica che:
   - Le immagini si carichino correttamente
   - I video funzionino (se presenti)
   - I PDF si aprano (se presenti)
   - Il testo della descrizione sia corretto

---

## 🎬 Formati File Supportati

### Immagini
- **Formati**: `.jpg`, `.jpeg`, `.png`
- **Raccomandato**: `.jpg` per foto, `.png` per immagini con trasparenza
- **Supporto**: Lazy loading, blur-up effect, animazioni

### Video
- **Formati**: `.mp4`, `.webm`
- **Raccomandato**: `.mp4` (H.264)
- **Tipi**:
  - **Video normale**: Controlli utente, preload metadata
  - **Video loop**: Aggiungi `-loop` o `_loop` al nome → autoplay, loop, muted, senza controlli

### PDF
- **Formato**: `.pdf`
- **Supporto**: Visualizzazione inline con iframe
- **Note**: Evita spazi nel nome del file

---

## 📐 Linee Guida Dimensioni Immagini

### Preview (Galleria)
- **Dimensioni**: 1920x1080px (16:9) o 1200x1600px (3:4)
- **Qualità**: 80-85% (compressione JPEG)
- **Dimensione file**: Max 200-300 KB
- **Formato**: JPG
- **Nome file**: DEVE essere `preview.jpg`

**Perché queste dimensioni?**
- La preview viene mostrata nella griglia della galleria
- Dimensioni più piccole = caricamento più veloce
- Il blur-up effect migliora la percezione di velocità

### Immagini Progetto (Full Gallery)
- **Larghezza consigliata**: 1920px - 2400px
- **Altezza**: Variabile (mantieni proporzioni originali)
- **Qualità**: 85-90% (compressione JPEG)
- **Dimensione file**: Max 500 KB - 1 MB per immagine
- **Formato**: JPG (preferito) o PNG (se serve trasparenza)

**Perché queste dimensioni?**
- Le immagini vengono visualizzate a schermo intero o quasi
- 1920px copre la maggior parte dei monitor (Full HD)
- 2400px per monitor 4K (con upscaling)
- Compressione bilanciata tra qualità e dimensione file

### Video
- **Risoluzione**: 1920x1080px (Full HD) o 1280x720px (HD)
- **Bitrate**: 5-10 Mbps per Full HD, 2-5 Mbps per HD
- **FPS**: 24-30 fps
- **Formato**: MP4 (H.264)
- **Dimensione file**: 
  - Video normale: Max 10-20 MB
  - Video loop: Max 5-10 MB (più corti = meglio)

**Perché queste dimensioni?**
- Video più piccoli = caricamento più veloce
- I video loop dovrebbero essere corti (3-10 secondi)
- H.264 è supportato universalmente

### Best Practices per Ottimizzazione

#### Immagini
1. **Usa strumenti di compressione**:
   - Online: TinyPNG, Squoosh
   - Software: Photoshop (Save for Web), ImageOptim
   
2. **Ridimensiona prima di comprimere**:
   - Non caricare immagini 5000x5000px e ridurle via CSS
   - Ridimensiona al formato finale prima dell'upload

3. **Scegli il formato giusto**:
   - Foto → JPG
   - Immagini con trasparenza → PNG
   - Immagini semplici/illustrazioni → PNG o SVG

4. **Ottimizza per il web**:
   - Rimuovi metadati EXIF
   - Usa compressione progressiva per JPG
   - Considera WebP per browser moderni (opzionale)

#### Video
1. **Comprimi i video**:
   - Usa HandBrake, FFmpeg, o Adobe Media Encoder
   - Imposta bitrate ottimale per la qualità desiderata

2. **Crea versioni multiple** (opzionale):
   - Versione HD per dispositivi mobili
   - Versione Full HD per desktop

3. **Per video loop**:
   - Mantieni durata corta (3-10 secondi)
   - Inizia e finisci con lo stesso frame
   - Usa fade in/out per transizioni smooth

#### PDF
- **Dimensione file**: Max 5-10 MB
- **Numero pagine**: Evita PDF troppo lunghi
- **Ottimizzazione**: Comprimi PDF prima dell'upload

---

## ⚙️ Configurazione in projects.js

### Struttura Completa di un Oggetto Progetto

```javascript
{
    // Nome del progetto (appare nella galleria)
    name: "Nome del Progetto",
    
    // Percorso relativo alla pagina HTML del progetto
    page: "../Progetti/progetto-X/progetto.html",
    
    // Percorso relativo all'immagine preview (OBBLIGATORIA)
    preview: "../Progetti/progetto-X/img/preview.jpg",
    
    // Descrizione testuale (può essere multi-riga)
    description: "Descrizione dettagliata del progetto. Può contenere più paragrafi se necessario.",
    
    // Array di tag per filtri (usati nella galleria Open)
    tags: ["fotografia", "architettura", "2024"],
    
    // Data di inizio (formato: YYYY-MM)
    startDate: "2024-01",
    
    // Data di fine (formato: YYYY-MM)
    endDate: "2024-03",
    
    // Array di immagini (JPG, PNG)
    images: [
        "../Progetti/progetto-X/img/immagine1.jpg",
        "../Progetti/progetto-X/img/immagine2.jpg",
        "../Progetti/progetto-X/img/immagine3.jpg"
    ],
    
    // Array di media (Video e PDF) - OPZIONALE
    media: [
        "../Progetti/progetto-X/img/video.mp4",           // Video normale
        "../Progetti/progetto-X/img/video-loop.mp4",      // Video loop
        "../Progetti/progetto-X/img/documento.pdf"        // PDF
    ]
}
```

### Esempio Completo

```javascript
{
    name: "Progetto Fotografico 2024",
    page: "../Progetti/progetto-3/progetto.html",
    preview: "../Progetti/progetto-3/img/preview.jpg",
    description: "Un progetto fotografico che esplora l'architettura contemporanea attraverso l'obiettivo di una camera analogica. Le immagini catturano l'interazione tra luce e ombra, creando composizioni geometriche che riflettono la complessità dell'ambiente urbano moderno.",
    tags: ["fotografia", "architettura", "analogico", "2024"],
    startDate: "2024-01",
    endDate: "2024-03",
    images: [
        "../Progetti/progetto-3/img/foto1.jpg",
        "../Progetti/progetto-3/img/foto2.jpg",
        "../Progetti/progetto-3/img/foto3.jpg",
        "../Progetti/progetto-3/img/foto4.jpg"
    ],
    media: [
        "../Progetti/progetto-3/img/processo.mp4",
        "../Progetti/progetto-3/img/schizzi.pdf"
    ]
}
```

---

## 🔧 Troubleshooting

### Il progetto non appare nella galleria
- ✅ Verifica che `preview.jpg` esista nella cartella `img/`
- ✅ Controlla che il percorso in `projects.js` sia corretto
- ✅ Assicurati che il progetto sia nell'array corretto (`projects` o `openProjects`)
- ✅ Verifica la sintassi JavaScript (virgole, parentesi graffe)

### Le immagini non si caricano
- ✅ Verifica che i percorsi in `images` e `media` siano corretti
- ✅ Controlla che i nomi dei file non contengano spazi
- ✅ Assicurati che i file esistano nella cartella `img/`
- ✅ Verifica la console del browser per errori 404

### I video non funzionano
- ✅ Per video loop: verifica che il nome contenga `-loop` o `_loop`
- ✅ Verifica che il formato sia `.mp4` o `.webm`
- ✅ Controlla che il video sia codificato in H.264 (MP4)

### I PDF non si aprono
- ✅ Verifica che il nome del file non contenga spazi
- ✅ Controlla che il file PDF non sia corrotto
- ✅ Assicurati che il percorso sia corretto

### Il template non funziona
- ✅ Verifica che il percorso del font sia corretto (`/Fonts/...`)
- ✅ Controlla che il percorso di `projects.js` sia corretto (`../../scripts/projects.js`)
- ✅ Assicurati di aver copiato il template corretto (normale vs open)

---

## 📌 Checklist Finale

Prima di pubblicare un nuovo progetto, verifica:

- [ ] Cartella progetto creata con nome corretto (`progetto-X`)
- [ ] Cartella `img/` creata dentro la cartella progetto
- [ ] File `preview.jpg` presente in `img/`
- [ ] File `progetto.html` copiato dal template corretto
- [ ] Tutti i file media inseriti in `img/`
- [ ] Progetto aggiunto in `scripts/projects.js`
- [ ] Percorsi corretti (usando `/` e `../`)
- [ ] Nomi file senza spazi
- [ ] Video loop con `-loop` nel nome (se necessario)
- [ ] Test in browser locale
- [ ] Verifica responsive (mobile/tablet/desktop)

---

## 💡 Suggerimenti

1. **Ordine dei file**: L'ordine in cui aggiungi i file in `images` e `media` determina l'ordine di visualizzazione
2. **Tag**: Usa tag coerenti per facilitare il filtraggio nella galleria Open
3. **Descrizioni**: Scrivi descrizioni chiare e coinvolgenti
4. **Date**: Mantieni un formato consistente (YYYY-MM) per tutte le date
5. **Backup**: Fai sempre backup prima di modificare `projects.js`

---

## 📞 Supporto

Se hai problemi o domande:
1. Controlla questa guida
2. Verifica la console del browser (F12) per errori
3. Controlla i percorsi dei file
4. Verifica che tutti i file esistano

---

**Buon lavoro! 🎨**

