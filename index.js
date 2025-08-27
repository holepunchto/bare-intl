exports.Collator = require('./lib/collator')
exports.DateTimeFormat = require('./lib/date-time-format')
exports.DisplayNames = require('./lib/display-names')
exports.DurationFormat = require('./lib/duration-format')
exports.ListFormat = require('./lib/list-format')
exports.Locale = require('./lib/locale')
exports.NumberFormat = require('./lib/number-format')
exports.PluralRules = require('./lib/plural-rules')
exports.RelativeTimeFormat = require('./lib/relative-time-format')
exports.Segmenter = require('./lib/segmenter')

// https://tc39.es/ecma402/#sec-intl.getcanonicallocales
exports.getCanonicalLocales = function getCanonicalLocales() {
  throw new Error('Not implemented')
}
