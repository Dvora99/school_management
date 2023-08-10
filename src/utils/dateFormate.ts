import moment from 'moment';

moment.defaultFormat = 'DD-MM-YYYY HH:MM';

export const TIMESTAPS = moment().format();
export const DATE = TIMESTAPS.split(' ');