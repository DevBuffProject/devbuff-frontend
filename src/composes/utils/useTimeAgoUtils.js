import { useTimeAgo } from '@vueuse/core'

const options = {
  arrayFormat: 'comma',
}

export const useTimeAgoUtils = (date) => {
  const timeHelper = (currentValue, messagesPerPart) => {
    while (currentValue > 9) {
      currentValue %= 10
    }

    if (currentValue === 1) {
      return `${currentValue} ${messagesPerPart[0]}`
    } else if (currentValue <= 4) {
      return `${currentValue} ${messagesPerPart[1]}`
    } else {
      return `${currentValue} ${messagesPerPart[2]}`
    }
  }

  return useTimeAgo(date, {
    messages: {
      justNow: 'Только что',
      past: (n) => (n.match(/\d/) ? `${n} назад` : n),
      future: () => `Unsupported`,
      month: (n) => {
        if (n === 1) {
          return 'В прошлом месяце'
        }
        return timeHelper(n, ['В прошлом месяце', 'месяца', 'месяцев'])
      },
      year: (n) => {
        if (n === 1) {
          return 'В прошлом году'
        }
        return timeHelper(n, ['В прошлом году', 'года', 'лет'])
      },
      day: (n) => {
        if (n === 1) {
          return 'вчера'
        }
        return timeHelper(n, ['вчера', 'дня', 'дней'])
      },
      week: (n) => {
        if (n === 1) {
          return 'На прошлой неделе'
        }
        return timeHelper(n, ['На прошлой неделе', 'недели', 'недель'])
      },
      hour: (n) => {
        return timeHelper(n, ['час', 'часа', 'часов'])
      },
      minute: (n) => {
        return timeHelper(n, ['минуту', 'минуты', 'минут'])
      },
      second: (n) => `${n} second${n > 1 ? 's' : ''}`,
    },
  })
}
