import moment from 'moment/moment';

export const formatDate = (date:string, smUp: boolean) =>
  moment(new Date(date)).format(smUp ? 'MMM D, h:mm:ssa' : 'MMM D, h:mm');
