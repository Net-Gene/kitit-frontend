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
│   ├── assets/          // Kuvia ja muita staattisia resursseja
│   ├── components/      // Yhteiset käyttöliittymäkomponentit
│   │   ├── navigation/
│   │   │   ├── Header.js // Navigointipalkki/Yläpalkki
│   │   │   └── Footer.js // Alapalkki
│   │   ├── auth/
│   │   │   └── PrivateRoute.js // Reittien suojaukset
│   │   ├── shared/
│   │       └── Button.js
│   ├── config/          // Konfiguraatiot, kuten API:n perus-URL
│   │   └── config.js
│   ├── context/         // (Ei käytössä)
│   ├── hooks/           // Mukautetut useMethodit
│   │   └── useFetchUserAuth.js
│   ├── pages/           // Erilliset sivut, kuten Etusivu ja Ostoskori
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   │   └── Home.css
│   │   ├── Cart/
│   │   │   ├── Cart.js
│   │   │   └── Cart.css
│   │   ├── ...
│   │   ...
│   ├── services/        // API-kutsut ja liiketoimintalogiikka (ei käytössä)
│   │   └── api.js
│   ├── styles/          // Tyylitiedostot
│   │   ├── backButton.css // Takaisin nappi css komponentti
│   │   └── buttons.css // Nappi css komponentit
│   ├── App.js           // Sovelluksen päälogiikka
│   ├── index.js         // Sovelluksen sisäänkäyntipiste
├── package.json         // Pakettien määrittelyt
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
