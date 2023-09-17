import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
  convertTimeStampToTimeAgo(time: string) {
    return time ? dayjs(dayjs(time)).fromNow() : '';
  }
};
