### **Frontend Repository README**

# Kit-IT:n käyttöliittymävarasto

Tämä arkisto sisältää Kit-IT-projektin käyttöliittymäkoodin. Käyttöliittymä vastaa käyttöliittymästä ja kommunikoi taustaohjelman API:n kanssa.

## Sisällysluettelo
- [Käytetyt tekniikat](#käytetyt-tekniikat)
- [Asennusohjeet](#asennusohjeet)
- [Projektin suorittaminen](#käynnistys)
- [Reitit ja navigointi](#reitit-ja-navigointi)
- [Kansiorakenne](#struktuuri)
- [Osallistuminen](#osallistuminen)

## Käytetyt tekniikat
- **React.js**: Pääasiallinen käyttöliittymäkirjasto.
- **CSS**: Ulkoasujen ja tyylien määrittely.
- **React Router DOM**: Sivun sisäinen navigointi ja reititys.
- **Axios**: API-kutsujen suorittamiseen.
- **PrivateRoute-komponentti**: Suojattujen reittien hallintaan.

---

## Reitit ja navigointi

Projektin navigointi on rakennettu **React Router DOM** -kirjastolla. Reitit on jaettu julkisiin ja suojattuihin reitteihin. Julkiset reitit eivät vaadi kirjautumista, mutta kaikki muut reitit on suojattu ja edellyttävät autentikointia.

### **Julkiset reitit**
- `/` - Kirjautumissivu
- `/register` - Rekisteröitymissivu

### **Suojatut reitit**
- `/home` - Etusivu
- `/about` - Tietoa meistä
- `/orderAppointments` - Tee ajanvaraus
- `/services` - Palvelut
- `/accountControl` - Tilin hallinta
- `/purchase` - Ostoprosessi
- `/shoppingCart` - Ostoskori

**Huom:** Julkiset reitit `/` ja `/register` ovat ainoat reitit, joille pääsee ilman kirjautumista. 

---

## Struktuuri

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/ // Kuvia ja muita staattisia resursseja
│   ├── components/ // Yhteiset käyttöliittymäkomponentit
│   │   ├── PrivateRoute.js // Reittien suojaukset
│   │   ├── config.js // Konfiguraatiot, kuten API:n perus-URL
│   │   ├── Header.js // Navigointipalkki/Yläpalkki
│   │   ├── Footer.js // Alapalkki 
│   ├── pages/ // Erilliset sivut, kuten Etusivu ja Ostoskori 
│   ├── services/ // API-kutsut ja liiketoimintalogiikka
│   ├── styles/ // Tyylitiedostot
│   ├── App.js  // Sovelluksen päälogiikka
│   ├── index.js // Sovelluksen sisäänkäyntipiste
│   └── context/ // (Ei käytössä)
├── package.json // Pakettien määrittelyt
```



## Asennusohjeet

Kloonaa arkisto:
   ```
   git clone <repository-url>
   cd frontend
   ```

## Käynnistys
   ```
   npm start
   ```

## Osallistuminen

1. Tee oma haara (branch) ja tee muutokset.
2. Testaa muutoksesi paikallisesti.
3. Lähetä **pull request** GitHubiin.
