import dayjs from "dayjs";

export const getLatestMessageDate = (date) => {
  let msgDate = dayjs(date);

  if (msgDate.isSame(new Date(), "date")) {
    msgDate = msgDate.format("HH:mm");
  } else {
    msgDate = msgDate.format("DD/MM/YYYY");
  }

  return msgDate;
};
