const test = require('brittle')
const Intl = require('..')

const date = new Date(2010, 1, 5) // day 5, February, 2010, Friday

test('format', (t) => {
  testFormat(undefined, '2/5/2010', t) // default

  testFormat({ month: 'numeric' }, '2', t)
  testFormat({ day: 'numeric' }, '5', t)
  testFormat({ year: 'numeric' }, '2010', t)

  testFormat({ month: 'numeric', day: '2-digit' }, '2/05', t)
  testFormat(
    { weekday: 'short', month: 'numeric', day: 'numeric' },
    'Fri, 2/5',
    t
  )
  testFormat({ month: 'short', day: '2-digit' }, 'Feb 05', t)
})

function testFormat(opts, expected, t) {
  const dateTimeFormat = new Intl.DateTimeFormat('en', opts)

  t.is(dateTimeFormat.format(date), expected)
}
