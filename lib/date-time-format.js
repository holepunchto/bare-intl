module.exports = class DateTimeFormat {
  constructor(
    locales,
    opts = { year: 'numeric', month: 'numeric', day: 'numeric' }
  ) {
    this._opts = opts
    this._format = this._formatMatcher(opts)
  }

  // https://tc39.es/ecma402/#sec-intl.datetimeformat.prototype.format
  format(date = new Date()) {
    return this._format
      .replace('{year}', this._year(date))
      .replace('{month}', this._month(date))
      .replace('{weekday}', this._weekday(date))
      .replace('{day}', this._day(date))
  }

  // https://tc39.es/ecma402/#sec-intl.datetimeformat.prototype.formatRange
  formatRange() {
    throw new Error('Not implemented')
  }

  // https://tc39.es/ecma402/#sec-Intl.DateTimeFormat.prototype.formatRangeToParts
  formatRangeToParts() {
    throw new Error('Not implemented')
  }

  // https://tc39.es/ecma402/#sec-Intl.DateTimeFormat.prototype.formatToParts
  formatToParts() {
    throw new Error('Not implemented')
  }

  _year(date) {
    if (this._opts.year === undefined) return

    const y = date.getFullYear()

    switch (this._opts.year) {
      case 'numeric':
        return String(y)
      default: // 2-digit
        return String(y % 100)
    }
  }

  _month(date) {
    if (this._opts.month === undefined) return

    const m = date.getMonth()

    switch (this._opts.month) {
      case 'numeric':
        return String(m + 1)
      case '2-digit':
        return String(m + 1).padStart(2, '0')
      case 'narrow':
        return localeData.month.narrow[m]
      case 'short':
        return localeData.month.short[m]
      default: // long
        return localeData.month.long[m]
    }
  }

  _weekday(date) {
    if (this._opts.weekday === undefined) return

    const w = date.getDay()

    switch (this._opts.weekday) {
      case 'narrow':
        return localeData.weekday.narrow[w]
      case 'short':
        return localeData.weekday.short[w]
      default: // long
        return localeData.weekday.long[w]
    }
  }

  _day(date) {
    if (this._opts.day === undefined) return

    const d = date.getDate()

    switch (this._opts.day) {
      case 'numeric':
        return String(d)
      default: // 2-digit
        return String(d).padStart(2, '0')
    }
  }

  _formatMatcher(opts) {
    let key = ''

    if ('year' in opts) key += 'y'
    if ('month' in opts) {
      const isNumeric = opts.month === 'numeric' || opts.month === '2-digit'
      key += isNumeric ? 'M' : 'MMMM'
    }
    if ('weekday' in opts) key += 'E'
    if ('day' in opts) key += 'd'

    const format = localeData.formats[key]

    if (!format) throw new RangeError('Unsupported options configuration')

    return format
  }
}

// https://github.com/unicode-org/cldr-json/blob/main/cldr-json/cldr-dates-full/main/en/ca-gregorian.json
const localeData = {
  month: {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    short: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    long: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  },
  weekday: {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    long: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  },
  // y = year
  // M, MMMM = month
  // E = weekday
  // d = day
  formats: {
    d: '{day}',
    E: '{weekday}',
    Ed: '{weekday} {day}',
    M: '{month}',
    Md: '{month}/{day}',
    MEd: '{weekday}, {month}/{day}',
    MMMM: '{month}',
    MMMMd: '{month} {day}',
    MMMMEd: '${weekday}, {month} {day}',
    y: '{year}',
    yM: '{month}/{year}',
    yMd: '{month}/{day}/{year}',
    yMEd: '${weekday}, {month}/{day}/{year}',
    yMMMM: '{month} {year}',
    yMMMMd: '{month} {day}, {year}',
    yMMMMEd: '{weekday}, {month} {day}, {year}'
  }
}
