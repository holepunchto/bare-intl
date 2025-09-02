const Intl = require('intl/lib/core')

global.IntlPolyfill = Intl

require('intl/locale-data/jsonp/en')

delete global.IntlPolyfill

module.exports = Intl
