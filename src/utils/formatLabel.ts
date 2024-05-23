import moment from 'moment/moment';
import { PERIOD } from '../constants';

type Period = typeof PERIOD[keyof typeof PERIOD];

export const formatLabel = (labels: string[], period: Period) => labels?.map((label) => {
  if (PERIOD.SEC === period || PERIOD.HRS === period) {
    return moment(label).format('HH:mm:ss, MMM DD');
  }
  return moment(label).format('MMM DD YYYY');
});
