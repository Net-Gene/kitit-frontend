import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/OrderAppointments.css';

import Button from '../components/Button';
import logo_with_catchphrase from '../assets/Logo with catchphrase.png';
import back_arrow from '../assets/back_arrow.png';

const OrderAppointments = () => {

  
    const [date, setDate] = useState(new Date()); // valitun päivämäärän state

    const handleDateChange = (selectedDate) => {
      setDate(selectedDate); // päivitetään valittu päivämäärä
      alert(`You selected ${selectedDate.toDateString()}`); // Example action
    };
  
    return (
      // Ajanvaraus sivu
    <div class="orderAppointments">
      {/*Takaisin nappi*/}
      <div class ="back-button">
        {/*Linkki pääsivulle, jossa on nuolikuvake*/}
        <a href="/home">
          <img src={back_arrow} alt="back_arrow" class="back_arrow-img"></img>
        </a>
        <img src={logo_with_catchphrase} alt="logo_with_catchphrase" class="logo_with_catchphrase-img"></img>
      </div>

      {/* Kalenteri */}
      <div className="calendar-container">
        <h1>Select an Appointment Date</h1>
        <Calendar
          onChange={handleDateChange} // Triggeröityy, kun aika valitaan
          value={date}
          minDate={new Date()} // Käyttäjä ei voi valita menneisyyden päiviä
        />
        <p>Selected date: {date.toDateString()}</p>
      </div>

      <div class ="make_appointment_button">
        {/*Käyttäjän poisto nappi*/}
        <Button onClick={handleSave/* Todo logiikka*/} className="button">Make Appointment</Button>
      </div>
      
    </div>
  
    );
  };
  
  export default OrderAppointments;