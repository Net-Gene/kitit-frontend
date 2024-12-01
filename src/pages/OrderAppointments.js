import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/OrderAppointments.css";

import Button from "../components/Button";
import back_arrow from "../assets/back_arrow.png";
import axios from "axios";

const OrderAppointments = () => {
  const [date, setDate] = useState(new Date()); // Valittu päivämäärä

  const [reservedDates, setReservedDates] = useState([]); // Päivämäärät jo varattu

  const [showTimeInput, setShowTimeInput] = useState(false); // Näytä/piilota ajan syöttölomake

  const [startTime, setStartTime] = useState(""); // Aloitusajan syöttö

  const [endTime, setEndTime] = useState(""); // Päättymisajan syöttö

  // Hae varatut päivämäärät taustajärjestelmästä

  const [, setLoading] = useState(false);

  const fetchReservedDates = async (selectedDate) => {
    setLoading(true); // Aloita lataaminen

    try {
      // Säädä valittua päivämäärää lisäämällä 2 tuntia

      selectedDate.setHours(selectedDate.getHours() + 2); // Lisää 2 tuntia vastaamaan aikavyöhykettä

      // Muotoile päivämäärä muotoon "vvvv-KK-pp"

      const formattedDate = selectedDate.toISOString().split("T")[0];

      const response = await axios.get(
        `http://localhost:3001/api/appointments/available?date=${formattedDate}`
      );

      const reservedSlotsWithDate = response.data.reservedSlots.map((slot) => ({
        ...slot,
        date: formattedDate,
      }));

      setReservedDates(reservedSlotsWithDate);
    } catch (error) {
      console.error("Error fetching reserved slots:", error);
    } finally {
      setLoading(false); // Lopeta lataus
    }
  };

  // useEffect hook noutaa varatut päivämäärät, kun komponentti latautuu

  useEffect(() => {
    if (date) {
      fetchReservedDates(date);
    }
  }, [date]); // Suorita uudelleen aina, kun "päivämäärä" muuttuu

  // Käsittele päivämäärän muutos kalenterissa

  const handleDateChange = (selectedDate) => {
    setDate(new Date(selectedDate)); // Päivitä tila oikealla päivämäärällä
    fetchReservedDates(selectedDate); // Hae varatut päivämäärät valitulle päivälle
  };

  const handleSave = async () => {
    if (!startTime || !endTime) {
      alert("Please fill in both start and end times.");
      return;
    }

    try {
      // Varmista, että ajat ovat oikeassa muodossa: HH:MM:00

      const formattedStartTime = `${startTime}:00`;
      const formattedEndTime = `${endTime}:00`;

      // Käytä päivämäärälle ISO-merkkijonomuotoa (vvvv-kk-pp)

      const formattedDate = date.toISOString().split("T")[0]; // Hanki päiväosa (vvvv-kk-pp)

      // Näytä hälytys virheenkorjausta varten (valinnainen)

      alert(
        `date: ${formattedDate} startTime: ${formattedStartTime} endTime: ${formattedEndTime}`
      );

      // Lähetä tiedot API:lle

      await axios.post("http://localhost:3001/api/appointments", {
        date: formattedDate, // Päivämäärä muotoiltu vvvv-kk-pp

        user_id: 1, // Korvaa todellisella käyttäjätunnuksella

        start_time: formattedStartTime, // 24 tunnin formaattiaika

        end_time: formattedEndTime, // 24 tunnin formaattiaika
      });

      // Ilmoita käyttäjälle, että tapaaminen on tallennettu

      alert(
        `Appointment saved for ${formattedDate} from ${formattedStartTime} to ${formattedEndTime}`
      );

      // Päivitä paikallinen osavaltio vastaamaan varattua päivämäärää

      setReservedDates((prev) => [
        ...prev,
        { date: formattedDate, formattedStartTime, formattedEndTime },
      ]);

      // Piilota ajansyöttölomake

      setShowTimeInput(false);
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to save the appointment. Please try again.");
    }
  };

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
      <div className="back-button">
        <a href="/home">
          <img src={back_arrow} alt="back_arrow" className="back_arrow-img" />
        </a>
      </div>

      {/* Kalenteri */}
      <div className="calendar-container">
        <h1>Valitse tapaamispäivä</h1>
        <Calendar
          onChange={handleDateChange}
          value={date}
          minDate={new Date()} // Estä menneet päivämäärät
          locale="fi-FI" // Aseta kieli-asetus yhdenmukaista päivämäärän muotoilua varten
          tileDisabled={({ date }) => isDateReserved(date)} // Poista varatut päivämäärät käytöstä
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
