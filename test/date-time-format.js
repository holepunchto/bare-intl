const test = require('brittle')
const Intl = require('..')

const date = new Date(2010, 1, 5) // day 5, February, 2010, Friday

test('format - solo value', (t) => {
  t.test('month', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { month: 'numeric' })

    t.is(dateTimeFormat.format(date), '2')
  })

  t.test('day', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { day: 'numeric' })

    t.is(dateTimeFormat.format(date), '5')
  })

  t.test('year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric' })

    t.is(dateTimeFormat.format(date), '2010')
  })
})

test('format - numeric month duets', (t) => {
  t.test('day', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      month: 'numeric',
      day: '2-digit'
    })

    t.is(dateTimeFormat.format(date), '2/05')
  })

  t.test('year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      month: 'numeric',
      year: '2-digit'
    })

    t.is(dateTimeFormat.format(date), '2/10')
  })

  t.test('weekday', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      weekday: 'short',
      month: 'numeric'
    })

    t.is(dateTimeFormat.format(date), '2 Fri')
  })
})

test('format - extended month duets', (t) => {
  t.test('day', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric'
    })

    t.is(dateTimeFormat.format(date), 'Feb 5')
  })

  t.test('year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      month: 'short',
      year: 'numeric'
    })

    t.is(dateTimeFormat.format(date), 'Feb 2010')
  })

  t.test('weekday', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      weekday: 'short',
      month: 'short'
    })

    t.is(dateTimeFormat.format(date), 'Feb Fri')
  })
})

test('format - other duets', (t) => {
  t.test('day + year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      year: '2-digit',
      day: 'numeric'
    })

    t.is(dateTimeFormat.format(date), '5 10')
  })

  t.test('weekday + day', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      weekday: 'short',
      day: 'numeric'
    })

    t.is(dateTimeFormat.format(date), '5 Fri')
  })

  t.test('format - weekday + year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      weekday: 'short',
      year: 'numeric'
    })

    t.is(dateTimeFormat.format(date), '2010 Fri')
  })
})

test('format - extended month trios', (t) => {
  t.test('day + year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    })

    t.is(dateTimeFormat.format(date), 'Feb 05, 2010')
  })

  t.test('weekday + day', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      month: 'short',
      day: '2-digit',
      weekday: 'short'
    })

    t.is(dateTimeFormat.format(date), 'Fri, Feb 05')
  })

  t.test('weekday + year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      month: 'short',
      year: 'numeric',
      weekday: 'short'
    })

    t.is(dateTimeFormat.format(date), 'Feb 2010 Fri')
  })
})

test('format - numeric month trios', (t) => {
  t.test('day + year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    })

    t.is(dateTimeFormat.format(date), '2/5/10')
  })

  t.test('weekday + day', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric'
    })

    t.is(dateTimeFormat.format(date), 'Fri, 2/5')
  })

  t.test('weekday + year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      weekday: 'short',
      month: 'numeric',
      year: 'numeric'
    })

    t.is(dateTimeFormat.format(date), '2/2010 Fri')
  })
})

test('format - all together', (t) => {
  t.test('weekday + day + year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      weekday: 'short',
      day: 'numeric',
      year: 'numeric'
    })

    t.is(dateTimeFormat.format(date), '5 Fri 2010')
  })

  t.test('weekday + numeric month + day + year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    })

    t.is(dateTimeFormat.format(date), 'Fri, 2/5/2010')
  })

  t.test('weekday + extended month + day + year', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    t.is(dateTimeFormat.format(date), 'Fri, February 5, 2010')
  })
})

test('format - dateStyle', (t) => {
  test('short', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { dateStyle: 'short' })

    t.is(dateTimeFormat.format(date), '2/5/10')
  })

  test('medium', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      dateStyle: 'medium'
    })

    t.is(dateTimeFormat.format(date), 'Feb 5, 2010')
  })

  test('long', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { dateStyle: 'long' })

    t.is(dateTimeFormat.format(date), 'February 5, 2010')
  })

  test('full', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { dateStyle: 'full' })

    t.is(dateTimeFormat.format(date), 'Friday, February 5, 2010')
  })
})

test('format - weekday labels', (t) => {
  t.test('narrow', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { weekday: 'narrow' })

    t.is(dateTimeFormat.format(date), 'F')
  })

  t.test('short', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { weekday: 'short' })

    t.is(dateTimeFormat.format(date), 'Fri')
  })

  t.test('long', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { weekday: 'long' })

    t.is(dateTimeFormat.format(date), 'Friday')
  })
})

test('format - month labels', (t) => {
  t.test('narrow', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { month: 'narrow' })

    t.is(dateTimeFormat.format(date), 'F')
  })

  t.test('format - month - short', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { month: 'short' })

    t.is(dateTimeFormat.format(date), 'Feb')
  })

  t.test('format - month - long', (t) => {
    const dateTimeFormat = new Intl.DateTimeFormat('en', { month: 'long' })

    t.is(dateTimeFormat.format(date), 'February')
  })
})
