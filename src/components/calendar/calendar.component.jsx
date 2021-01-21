import React from "react";
import "./calendar.styles.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

const Calendar = () => (
  <div className="calendar_">
    <FullCalendar
      plugins={[dayGridPlugin, googleCalendarPlugin]}
      initialView="dayGridMonth"
      googleCalendarApiKey="AIzaSyDj5dQ8-q8FCGcX649wDBRmx4KzbrQQpus"
      events={{
        // google calendar id (can be found on calendar's settings) - can be replaced by any other google calendar
        googleCalendarId:
          "m82rp56st5fhfscm98keqfa6n4@group.calendar.google.com",
      }}
      height="88vh"
      locale="br"
    />
    <p>
      *Para adicionar eventos a este calendário, é necessário utilizar o Google
      Calendar da conta
    </p>
  </div>
);

export default Calendar;
