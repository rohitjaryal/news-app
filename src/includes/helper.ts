import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
export default {
  convertTimeStampToTimeAgo(time: string) {
    return time ? dayjs(dayjs(time)).fromNow() : '';
  }
};
