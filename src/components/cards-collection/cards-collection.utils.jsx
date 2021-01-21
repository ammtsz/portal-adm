import { renderDate } from "../../utils/utils";

// EVENT INFOS
// returns event infos ready to be displayed, each info is an item of an array
export const returnEventInfos = (event) => {
  let { startDate, endDate, startTime, endTime, location } = event;
  const infos = [];

  // convert dates, when exist, to the displayed format (dd/mm/yyy)
  if (startDate) startDate = renderDate(startDate);
  if (endDate) endDate = renderDate(endDate);

  // defines whether it will display both or only one date, depending on if `start date` is the same as `end date`
  if (startDate) {
    const date = endDate
      ? startDate === endDate
        ? startDate
        : `${startDate} a ${endDate}`
      : startDate;
    infos.push(date);
  }

  // defines whether it will display both or only one time, depending on if there is an `end time`
  if (startTime) {
    const time = endTime ? `${startTime} às ${endTime}` : startTime;
    infos.push(time);
  }

  if (location) infos.push(location);

  return infos;
};

// EVENT EXTRA INFOS
// returns `event modreInfos` ready to be displayed, each info is an item of an array
export const returnMoreInfos = (event) => {
  const moreInfos = [];
  const { publicEvent, organizers, description } = event;

  if (organizers) moreInfos.push(`Responsáveis: ${organizers}`);
  moreInfos.push(publicEvent ? "(Aberto ao Público)" : "(Evento Restrito)");
  if (description) moreInfos.push(description);

  return moreInfos;
};
