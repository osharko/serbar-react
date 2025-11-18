# TODO - Completamento Sito Ser.Bar.

## Immagini da Aggiungere

### 1. Foto Banner Principale
- **File da sostituire**: `src/assets/carousel1.jpg`
- **Formato consigliato**: JPG o WebP
- **Dimensioni consigliate**:
  - Larghezza: 1080-1920px
  - Altezza: 1350-2400px (formato verticale/ritratto)
- **Ottimizzazione**: Comprimi l'immagine per web (< 500KB)
- **Nota**: La foto verticale funzionerà perfettamente con il nuovo layout responsive

### 2. Favicon e Icone PWA
Crea le seguenti immagini per il branding:
- `public/favicon.svg` o `public/favicon.png` (32x32px o 64x64px)
- `public/icon-192x192.png` (192x192px)
- `public/icon-512x512.png` (512x512px)
- `public/apple-touch-icon.png` (180x180px)

**Tool consigliati per generare favicon**:
- https://realfavicongenerator.net/
- https://favicon.io/

### 3. Immagine Open Graph
- **File**: `public/og-image.jpg`
- **Dimensioni**: 1200x630px
- **Uso**: Anteprima quando condividi il link sui social media
- **Contenuto consigliato**: Logo Ser.Bar. + foto rappresentativa del Kung Fu

## SEO e Configurazione Dominio

### 1. Dominio
- Aggiorna tutti i riferimenti a `https://www.serbar.it/` con il tuo dominio reale
- File da modificare:
  - `index.html` (linee 15, 19, 22, 28, 31, 56)

### 2. Google Search Console
1. Registra il sito su [Google Search Console](https://search.google.com/search-console)
2. Verifica la proprietà del sito
3. Invia la sitemap quando disponibile

### 3. Google Business Profile
1. Crea/aggiorna il profilo su [Google Business](https://www.google.com/business/)
2. Verifica la posizione (Palazzetto dello Sport)
3. Aggiungi foto, orari, contatti

### 4. Sitemap.xml
Dopo il deploy, genera una sitemap:
- Usa tool come [XML-Sitemaps.com](https://www.xml-sitemaps.com/)
- Carica `public/sitemap.xml`
- Aggiorna il link in `public/robots.txt`

## Ottimizzazioni Opzionali

### 1. Google Analytics
Aggiungi Google Analytics 4 in `index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Cookie Consent
Implementa un banner per cookie GDPR-compliant

### 3. Performance
- Comprimi tutte le immagini (usa WebP quando possibile)
- Abilita lazy loading per immagini
- Minifica CSS/JS in produzione

## Social Media

### Profili da Creare/Aggiornare
1. **Facebook**: Pagina business
2. **Instagram**: Profilo ufficiale
3. **TikTok**: Contenuti video corsi

Aggiungi i link social nel footer del sito e nell'HTML (schema.org `sameAs`)

## Deploy

### Opzioni di Hosting Consigliate
1. **Vercel** (consigliato, gratuito): https://vercel.com/
2. **Netlify** (gratuito): https://www.netlify.com/
3. **GitHub Pages** (gratuito): https://pages.github.com/

### Comandi Build
```bash
npm run build        # Crea la build di produzione
npm run preview      # Anteprima locale della build
```

## Checklist Finale

- [ ] Sostituire foto banner con immagine verticale
- [ ] Creare favicon e icone PWA
- [ ] Creare immagine Open Graph
- [ ] Aggiornare URL dominio reale
- [ ] Verificare email e telefono corretti
- [ ] Testare su mobile (Chrome DevTools)
- [ ] Testare burger menu su mobile
- [ ] Verificare mappa Google Maps funzionante
- [ ] Deploy su hosting
- [ ] Configurare Google Search Console
- [ ] Configurare Google Business Profile
- [ ] Generare e caricare sitemap.xml
- [ ] (Opzionale) Aggiungere Google Analytics
- [ ] (Opzionale) Aggiungere link social media

## Contatti e Supporto

Per problemi o domande tecniche:
- Email sviluppatore: [inserire email]
- Repository: [inserire link GitHub se applicabile]
