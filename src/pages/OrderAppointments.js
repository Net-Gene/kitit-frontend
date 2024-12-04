import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/OrderAppointments.css";

import Button from "../components/Button";
import axios from "axios";

const OrderAppointments = () => {
  const [date, setDate] = useState(new Date()); // Valittu päivämäärä


  const [reservedDates, setReservedDates] = useState([]); // Päivämäärät jo varattu


  const [showTimeInput, setShowTimeInput] = useState(false); // Näytä/piilota ajan syöttölomake


  const [startTime, setStartTime] = useState(""); // Aloitusajan syöttö


  const [endTime, setEndTime] = useState(""); // Päättymisajan syöttö
  const [userId, setUserId] = useState(null); // User ID state


  // Hae varatut päivämäärät taustajärjestelmästä


  const [loading, setLoading] = useState(false);

   // Fetch user ID on component mount
   useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/check-auth-token', { withCredentials: true })
      .then((response) => {
        console.log('Fetched User ID:', response.data.userId);
        setUserId(response.data.userId); // Store user ID
      })
      .catch((error) => {
        console.error('Error fetching user ID:', error);
      });
  }, []);
  

  const fetchReservedDates = useCallback(async (selectedDate) => {
     setLoading(true); // Aloita lataaminen


    try {
      // Säädä valittua päivämäärää lisäämällä 2 tuntia


      selectedDate.setHours(selectedDate.getHours() + 2); // Lisää 2 tuntia vastaamaan aikavyöhykettä


      // Muotoile päivämäärä muotoon "vvvv-KK-pp"


      const formattedDate = selectedDate.toISOString().split("T")[0];

      const response = await axios.get(
        `http://localhost:3001/api/appointments/reserved-appointments?date=${formattedDate}`
      );

    // Jos varattuja paikkoja ei ole, aseta tyhjä joukko

     const reservedSlotsWithDate = response.data.reservedSlots.map((slot) => ({
      ...slot,
      date: formattedDate,
    })) || [];

      setReservedDates(reservedSlotsWithDate);
    } catch (error) {
      alert("Virhe haettaessa varattuja paikkoja:", error);
    } finally {
      setLoading(false); // Lopeta lataus

    }
  }, []); // Tyhjä riippuvuustaulukko, joten se luodaan kerran


  // useEffect hook noutaa varatut päivämäärät, kun komponentti latautuu


  useEffect(() => {
    if (date) {
      fetchReservedDates(date);
    }
  }, [date, fetchReservedDates]);  // Suorita uudelleen aina, kun "päivämäärä" muuttuu


  // Käsittele päivämäärän muutos kalenterissa


  const handleDateChange = (selectedDate) => {
    // Ohita nouto, jos valittu päivämäärä on sama kuin nykyinen päivämäärä

    if (selectedDate.toDateString() !== date.toDateString()) {
      setDate(new Date(selectedDate)); // Päivitä tila oikealla päivämäärällä

      fetchReservedDates(selectedDate); // Hae varatut päivämäärät valitulle päivälle

    }
  };

  const handleSave = async () => {
    if (!startTime || !endTime) {
      alert("Täytä sekä alkamis-että päättymisajat.");
      return;
    }

    if (!userId) {
      alert("Käyttäjä ei ole kirjautunut.");
      return;
    }

    try {
      // Varmista, että ajat ovat oikeassa muodossa: HH:MM:00


      const formattedStartTime = `${startTime}:00`;
      const formattedEndTime = `${endTime}:00`;

      // Käytä päivämäärälle ISO-merkkijonomuotoa (vvvv-kk-pp)


      const formattedDate = date.toISOString().split("T")[0]; // Hanki päiväosa (vvvv-kk-pp)


      // Lähetä tiedot API:lle


      await axios.post("http://localhost:3001/api/appointments/book-appointment", {
        date: formattedDate,
        user_id: userId, // Use the fetched user ID
        start_time: formattedStartTime,
        end_time: formattedEndTime,
      });

      // Ilmoita käyttäjälle, että tapaaminen on tallennettu


      alert(
        `Tapaaminen tallennettu ${formattedDate} ajalta ${formattedStartTime} -${formattedEndTime}`
      );

      // Päivitä paikallinen osavaltio vastaamaan varattua päivämäärää


      setReservedDates((prev) => [
        ...prev,
        { date: formattedDate, formattedStartTime, formattedEndTime },
      ]);

      // Piilota ajansyöttölomake


      setShowTimeInput(false);
    } catch (error) {
      // Tarkista, onko virhevastaus olemassa ja onko siinä 409-tilakoodi

      if (error.response && error.response.status === 409) {
        alert("Aika on jo varattu.");
        }
      else {
        alert("Virhe tallennettaessa tapaamista: " + error.message + " Tapaamisen tallentaminen epäonnistui. Yritä uudelleen.");
      }
    }
  }

  // Tarkista, onko päivämäärä jo varattu


  const isDateReserved = (currentDate) =>
    reservedDates.some(
      ({ date: reservedDate }) =>
        new Date(reservedDate).toDateString() === currentDate.toDateString()
    );

  const getReservedSlots = () => {
    return reservedDates.filter((slot) => {
      // Vertaa pelipaikan päivämäärää valittuun päivämäärään


      return slot.date === date.toISOString().split("T")[0]; // Varmista, että päivämäärä on samassa muodossa

    });
  };

  return (
    <div className="orderAppointments">
      {/* Takaisin painike */}
      <a href="/home"><button className="back-btn"><i class="fa-solid fa-arrow-left"></i></button></a>

      {/* Kalenteri */}
      <div className="calendar-container">
        <h1>Valitse tapaamispäivä</h1>
        <Calendar
          onChange={handleDateChange}
          value={date}
          minDate={new Date()} // Estä menneet päivämäärät

          locale="fi-FI" // Aseta kieli-asetus yhdenmukaista päivämäärän muotoilua varten

          tileDisabled={({ date }) => isDateReserved(date) || loading} // Poista laatta käytöstä, jos se on varattu tai ladataan

          />
        <p>Valittu päivämäärä: {date.toLocaleDateString("fi-FI")}</p>
      </div>

      {/* Varatut Slots */}
      <div className="reserved-slots">
        {getReservedSlots().length > 0 ? (
          <>
            <h2>Varatut ajat {date.toLocaleDateString("fi-FI")}</h2>
            <ul>
              {getReservedSlots().map((slot, index) => (
                <li key={index}>
                  {slot.start_time} - {slot.end_time} {/* Korjatut avaimet */}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Ei varattuja aikoja tälle päivälle.</p>
        )}
      </div>

      {/* Ajanvarauslomake */}
      <div className="make_appointment_button">
        {!showTimeInput ? (
          <Button onClick={() => setShowTimeInput(true)} className="button">
            Varaa aika
          </Button>
        ) : (
          <div className="time-input-form">
            <h2>Määritä aikaväli varaukselle</h2>
            <label>
              Aloitusaika:
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>
            <label>
              Päättymisaika:
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>
            <div className="time-form-buttons">
              <Button onClick={handleSave} className="button">
                Tallenna varaus
              </Button>
              <Button
                onClick={() => setShowTimeInput(false)}
                className="button cancel-button"
              >
                Peruuttaa
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderAppointments;
