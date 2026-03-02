# Matrimonio Giacomo & Sabina — Project Brief

> Documento master del progetto. Aggiornalo ogni volta che si definisce un'informazione nuova.
> I placeholder sono marcati con `[PLACEHOLDER ...]` e raccolti nel TODO tracker in fondo.

---

## 1. Info Progetto

| Campo | Valore |
|-------|--------|
| Sposi | Giacomo & Sabina |
| Data | 6 settembre 2026 |
| Deploy | Vercel (dominio gratuito `.vercel.app`) |
| Stack | HTML / CSS / JS puro — GSAP 3 (CDN) — nessun build tool |
| Lingua | Solo italiano |
| Accesso | QR code sull'invito cartaceo |

---

## 2. Design System

### Palette colori

| Token | Hex | Uso |
|-------|-----|-----|
| `--ivory` | `#F5F0E8` | Background principale |
| `--olive` | `#7A8C6A` | Accent primario (titoli, bottoni, linee) |
| `--olive-dark` | `#4A5C3A` | Testo principale, hover |
| `--olive-light` | `#B5C4A5` | Sfondi secondari, bordi |
| `--cream` | `#FDFAF4` | Card, sezioni alternate |
| `--text` | `#2C3020` | Testo corpo |

> Valori provvisori — definire la palette definitiva prima di aprire il CSS.

### Tipografia (da confermare)

- **Titoli principali**: Cormorant Garamond (elegante, serif classico)
- **Titoli sezione**: Playfair Display o Cinzel
- **Testo corpo**: Cormorant Garamond Regular o Lato
- **Accenti/script**: Great Vibes (per nomi sposi, citazioni)

### Stile animazioni
- Molte animazioni: scroll-triggered, parallax, fade-in, counters
- Libreria: GSAP 3 + ScrollTrigger (via CDN jsDelivr)
- Stile visivo: essenziale ed elegante, mai sovraccarico

---

## 3. Struttura Sezioni del Sito

| # | Sezione | Stato | Note |
|---|---------|-------|------|
| 1 | **Hero** | Da costruire | Nomi + data + animazione d'entrata spettacolare |
| 2 | **Countdown** | Da costruire | Conto alla rovescia: 6/9/2026 ore 12:00 |
| 3 | **La Nostra Storia** | Da costruire | 6 perle — PLACEHOLDER testi |
| 4 | **La Cerimonia** | Da costruire | Venue, orari, mappa, parcheggio |
| 5 | **I Testimoni** | Da costruire | 4 testimoni — PLACEHOLDER bio/foto |
| 6 | **Info Pratiche** | Da costruire | Hotel, come arrivare — PLACEHOLDER hotel |
| 7 | **Lista Nozze** | Da costruire | IBAN + testo viaggio di nozze |
| 8 | **RSVP** | Da costruire | Form completo → n8n → Google Sheets |
| 9 | **Footer** | Da costruire | Contatti testimoni |

---

## 4. Contenuti — Venue & Logistica

### Cerimonia
- **Ora**: 12:00
- **Luogo**: Grotta di Lourdes fam. Ganora, San Giorgio Monferrato
- **Google Maps**: https://maps.app.goo.gl/3TAU9HqGsEMTk6HVA
- **Tipo**: Religiosa
- **Location**: All'aperto
- **Nota meteo**: tono simpatico e sicuro, tipo _"Vi promettiamo che non pioverà"_ — trovare frase definitiva

### Aperitivo & Ricevimento
- **Ora**: 13:30
- **Luogo**: stessa location (Grotta di Lourdes)

### Parcheggio
- **Google Maps**: https://maps.app.goo.gl/Rum9fBjNQa6yjd5aA
- Cartelli in loco per guidare gli ospiti
- Nessuna navetta prevista

### Hotel convenzionati
> [PLACEHOLDER — aggiungere 2-3 hotel nelle vicinanze con nome, link prenotazione, eventuale codice sconto o tariffa convenzionata]

---

## 5. Contenuti — La Nostra Storia

6 tappe significative della storia di Giacomo e Sabina:

1. [PLACEHOLDER — storia 1]
2. [PLACEHOLDER — storia 2]
3. [PLACEHOLDER — storia 3]
4. [PLACEHOLDER — storia 4]
5. [PLACEHOLDER — storia 5]
6. [PLACEHOLDER — storia 6]

> Stile: brevi, poetiche, con una data e un luogo. Possono includere anche momenti difficili, con delicatezza.

---

## 6. Contenuti — I Testimoni

| Nome | Lato | Ruolo | Telefono | Bio/Foto |
|------|------|-------|----------|----------|
| **Mattia** | Giacomo | Fratello | 345 803 3908 | [PLACEHOLDER bio divertente + foto] |
| **Giulio** | Giacomo | Amico | 348 905 7894 | [PLACEHOLDER bio divertente + foto] |
| **Martina** | Sabina | Sorella | 392 828 6696 | [PLACEHOLDER bio divertente + foto] |
| **Caterina** | Sabina | Sorella | 377 706 3367 | [PLACEHOLDER bio divertente + foto] |

> I numeri saranno visibili nel footer come contatti di riferimento per gli ospiti.

---

## 7. Contenuti — Lista Nozze

- **Formato**: solo contributo monetario (nessuna lista oggetti)
- **Destinazione**: viaggio di nozze
- **IBAN**: [PLACEHOLDER]
- **Testo da scrivere**: tono romantico/scherzoso, es. _"Il regalo più bello? Aiutarci a vivere la luna di miele dei nostri sogni."_

---

## 8. Contenuti — Note Editoriali

### Bambini
Non sono previsti al matrimonio. Da comunicare con tono leggero ma inequivocabile nel sito.
Suggerimento: _"La giornata è pensata per adulti che vogliono festeggiare con noi senza pensieri"_ — trovare frase definitiva.

### Programma della giornata
Non pubblicato. Sarà tutto una sorpresa per gli ospiti.

### Dress code
Non specificato nel sito.

### Foto
Nessuna restrizione — gli ospiti sono liberi di fotografare durante tutto l'evento.

---

## 9. RSVP — Specifiche Form

**Scadenza**: 8 agosto 2026
**Backend**: form → webhook n8n → Google Sheets

### Campi obbligatori
- Nome e cognome
- Conferma presenza: `Sì` / `No` / `Forse`
- Email (per conferme e comunicazioni)
- Telefono

### Campi logistici
- Presenza al ricevimento (ore 13:30): `Sì` / `No`
- Necessità di pernottamento: `Sì` / `No`
  > Nota da mostrare: _"L'alloggio è a carico di ciascun ospite — vi aiutiamo a trovare qualcosa di comodo nelle vicinanze!"_
- Numero di auto per il parcheggio

### Esigenze alimentari
- Allergie e intolleranze: campo testo libero
- Regime alimentare: `Vegetariano` / `Vegano` / `Celiaco` / `Kosher` / `Halal` / `Altro`

### Campi opzionali
- Come conosci gli sposi: `Amico` / `Famiglia` / `Collega` / `Altro`
- Messaggio agli sposi: campo testo libero
- Canzone preferita per il DJ: campo testo libero

### Dati tecnici
- **Webhook n8n**: [PLACEHOLDER — inserire URL dopo configurazione]
- **Google Sheet**: [PLACEHOLDER — creare foglio e collegare]
- **Payload JSON** (suggerito):
```json
{
  "nome_cognome": "",
  "presenza": "",
  "email": "",
  "telefono": "",
  "ricevimento": "",
  "pernottamento": "",
  "auto": 0,
  "allergie": "",
  "dieta": "",
  "come_conosci": "",
  "messaggio": "",
  "canzone": "",
  "timestamp": ""
}
```

---

## 10. TODO — Placeholder Tracker

### Contenuti da completare
- [ ] 6 storie della coppia (testi definitivi)
- [ ] Bio divertenti dei 4 testimoni
- [ ] Foto dei 4 testimoni
- [ ] 2-3 hotel convenzionati con link e prezzi
- [ ] IBAN lista nozze
- [ ] Testo romantico/scherzoso lista nozze
- [ ] Frase sui bambini (tono leggero ma chiaro)
- [ ] Frase meteo location (tono simpatico)

### Tecnico da configurare
- [ ] Webhook n8n (configurare workflow e incollare URL in `main.js`)
- [ ] Google Sheet per raccolta RSVP
- [ ] URL Vercel definitivo (dopo primo deploy)

### Design da definire
- [ ] Palette colori esatta (confermare hex avorio + verde oliva)
- [ ] Font definitivi (da testare e scegliere)
- [ ] Eventuali foto di coppia da usare nel sito

---

_Ultima modifica: febbraio 2026_
