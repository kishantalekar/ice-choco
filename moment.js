import moment from "moment";

export const getCurrentTime = () => {
  const time = moment().format("lll");
  return time;
};
