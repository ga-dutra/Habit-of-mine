import dayjs from "dayjs";

const updateLocale = require("dayjs/plugin/updateLocale/");
dayjs.extend(updateLocale);
require("dayjs/locale/pt-br");
dayjs.locale("pt-br");
dayjs.updateLocale("pt-br", {
  weekdays: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
});
const todaydate = String(dayjs().format("dddd, DD/MM"));
export default todaydate;
