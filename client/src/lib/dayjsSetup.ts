import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.locale("ko");

dayjs.updateLocale("ko", {
  relativeTime: {
    future: "%s 후",
    past: "%s 전",
    d: "하루",
    dd: "%d일",
    M: "한 달",
    MM: "%d달",
    y: "1년",
    yy: "%d년",
  },
});

export default dayjs;
