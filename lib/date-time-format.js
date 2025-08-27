const MONTHS = [
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

const WEEK_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

module.exports = class DateTimeFormat {
  constructor(
    locales,
    opts = { year: 'numeric', month: 'numeric', day: 'numeric' }
  ) {
    switch (opts.dateStyle) {
      case undefined:
        this.opts = opts
        break
      case 'short':
        this.opts = { month: 'numeric', day: 'numeric', year: '2-digit' }
        break
      case 'medium':
        this.opts = { month: 'short', day: 'numeric', year: 'numeric' }
        break
      case 'long':
        this.opts = { month: 'long', day: 'numeric', year: 'numeric' }
        break
      default: // full
        this.opts = {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
    }
  }

  // https://tc39.es/ecma402/#sec-intl.datetimeformat.prototype.format
  format(date = Date.now()) {
    const w = this._weekday(date)
    const m = this._month(date)
    const d = this._day(date)
    const y = this._year(date)

    if (w && !m && !d && !y) return w
    if (!w && m && !d && !y) return m
    if (!w && !m && d && !y) return d
    if (!w && !m && !d && y) return y

    if (m) {
      const isNumeric = !isNaN(m)

      if (w) {
        if (!d && !y) return `${m} ${w}`

        if (isNumeric) {
          if (d && y) return `${w}, ${m}/${d}/${y}`
          if (d) return `${w}, ${m}/${d}`
          if (y) return `${m}/${y} ${w}`
        } else {
          if (d && y) return `${w}, ${m} ${d}, ${y}`
          if (d) return `${w}, ${m} ${d}`
          if (y) return `${m} ${y} ${w}`
        }
      } else {
        if (isNumeric) {
          if (d && y) return `${m}/${d}/${y}`
          if (d) return `${m}/${d}`
          if (y) return `${m}/${y}`
        } else {
          if (d && y) return `${m} ${d}, ${y}`
          if (d) return `${m} ${d}`
          if (y) return `${m} ${y}`
        }
      }
    }

    if (w) {
      if (d && y) return `${d} ${w} ${y}`
      if (d) return `${d} ${w}`
      if (y) return `${y} ${w}`
    }

    if (d && y) return `${d} ${y}`

    throw new Error(
      `Cannot format the date: ${date} with given the options: ${JSON.stringify(this.opts)}`
    )
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

  _weekday(date) {
    if (!this.opts.weekday) return null

    const w = date.getDay()

    switch (this.opts.weekday) {
      case 'narrow':
        return WEEK_DAYS[w][0]
      case 'short':
        return WEEK_DAYS[w].substring(0, 3)
      default: // long
        return WEEK_DAYS[w]
    }
  }

  _month(date) {
    if (!this.opts.month) return null

    const m = date.getMonth()

    switch (this.opts.month) {
      case 'numeric':
        return String(m + 1)
      case '2-digit':
        return String(m + 1).padStart(2, '0')
      case 'narrow':
        return MONTHS[m][0]
      case 'short':
        return MONTHS[m].substring(0, 3)
      default: // long
        return MONTHS[m]
    }
  }

  _day(date) {
    if (!this.opts.day) return null

    const d = date.getDate()

    switch (this.opts.day) {
      case 'numeric':
        return String(d)
      default: // 2-digit
        return String(d).padStart(2, '0')
    }
  }

  _year(date) {
    if (!this.opts.year) return null

    let y = date.getFullYear()

    switch (this.opts.year) {
      case 'numeric':
        return String(y)
      default: // 2-digit
        return String(y % 100)
    }
  }
}
