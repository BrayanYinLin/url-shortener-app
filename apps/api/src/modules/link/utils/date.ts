import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
export const timestampTz = dayjs().utc().format('YYYY-MM-DD HH:mm[Z]')
