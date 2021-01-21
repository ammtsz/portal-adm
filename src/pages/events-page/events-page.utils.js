

// show event form
export const addEventClick = () => {
    document.querySelectorAll(".events__modal")[0].style.height = "auto";
    document.querySelectorAll(".events__modal")[0].style.transform = "scale(1)";
    document.querySelectorAll(".events__modal")[0].style.margin = "50px auto";
    document.querySelectorAll(".events__modal")[0].scrollIntoView(false);
  };

  // get events from a specific year
  export const getEventsByYear = (year, allEvents) => {
    return allEvents
      .filter((event) => event.startDate.substr(0, 4) === year)
      .sort(function (a, b) {
        return b - a;
      });
  };

  // get future events
  export const getNextEvents = (allEvents) => {
    const returnNextEvents = [];
    allEvents.forEach((event) => {
      const eventDate = new Date(
        event.endDate ? event.endDate : event.startDate
      );
      const stringDate = `${eventDate.getFullYear()}-${
        eventDate.getMonth() + 1
      }-${eventDate.getDate() + 1}`;
      const today = `${new Date().toJSON().substr(0, 10)}`;

      if (new Date(stringDate) >= new Date(today)) returnNextEvents.push(event);
    });

    return returnNextEvents;
  };