# Istruzioni per Rinominare le Cartelle

## ⚠️ IMPORTANTE: Rinomina le cartelle manualmente

Le cartelle devono essere rinominate manualmente perché contengono file che potrebbero essere aperti.

## Cartelle da Rinominare:

1. **Progetti/Progetto 1** → **Progetti/progetto-1**
2. **Progetti/Progetto 2** → **Progetti/progetto-2**
3. **Progetti Open/Progetto 1** → **Progetti Open/progetto-1**
4. **Progetti Open/Progetto 2** → **Progetti Open/progetto-2**

## Come fare:

1. Chiudi tutti i file aperti nei progetti
2. In Esplora File, rinomina manualmente le cartelle:
   - `Progetto 1` → `progetto-1`
   - `Progetto 2` → `progetto-2`
3. Dopo la rinomina, fai commit e push su GitHub:
   ```bash
   git add .
   git commit -m "Rinomino cartelle progetto senza spazi"
   git push
   ```

## ✅ File già aggiornati:

- ✅ `scripts/projects.js` - tutti i percorsi aggiornati a `progetto-1` e `progetto-2`
- ✅ Font: tutti i file usano `/Fonts/` (maiuscola) invece di `/fonts/`

## 📝 Note:

- I file HTML dei progetti usano `window.location.pathname` per trovare la cartella, quindi si adatteranno automaticamente dopo la rinomina
- Assicurati che il file video in `Progetti/Progetto 2/img/` si chiami `578079302214894359-loop.mp4` (con `-loop`) per funzionare come video loop


