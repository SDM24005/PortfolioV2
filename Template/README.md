# Template Progetti Portfolio

Questa cartella contiene i template per creare nuovi progetti nel portfolio.

## 📁 Struttura

```
Template/
├── progetto-normale/      # Template per progetti normali (sfondo nero)
│   ├── progetto.html
│   └── img/               # Cartella per i file media
│
└── progetto-open/          # Template per progetti open (sfondo bianco)
    ├── progetto.html
    └── img/               # Cartella per i file media
```

## 🎨 Differenze tra i Template

### Progetto Normale
- **Sfondo**: Nero (#000000)
- **Testo**: Bianco
- **Header**: Testo bianco con mix-blend-mode
- **Uso**: Per progetti standard con sfondo scuro

### Progetto Open
- **Sfondo**: Bianco (#ffffff)
- **Testo**: Nero
- **Header**: Testo nero con mix-blend-mode
- **Uso**: Per progetti con sfondo chiaro

## 🚀 Come Usare

1. **Scegli il template appropriato** (normale o open)
2. **Crea la cartella del progetto** in `Progetti/` o `Progetti Open/`
3. **Copia il file `progetto.html`** nella nuova cartella
4. **Crea la cartella `img/`** e inserisci i file media
5. **Aggiungi il progetto** in `scripts/projects.js`

Per istruzioni dettagliate, consulta [GUIDA_PROGETTI.md](./GUIDA_PROGETTI.md)

## 📝 Note Importanti

- I template supportano automaticamente: immagini (JPG, PNG), video (MP4, WebM), PDF
- I video loop devono avere `-loop` o `_loop` nel nome del file
- Il percorso del font e di `projects.js` è già configurato correttamente
- Non modificare la struttura HTML/CSS del template a meno che non sia necessario

## ✅ Funzionalità Supportate

- ✅ Caricamento lazy delle immagini
- ✅ Blur-up effect per immagini
- ✅ Video con controlli o autoplay loop
- ✅ Visualizzazione PDF inline
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Cursore custom (disabilitato su mobile)
- ✅ Animazioni al caricamento
- ✅ Menu responsive con animazioni

