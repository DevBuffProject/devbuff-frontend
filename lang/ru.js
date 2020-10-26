import languages from './common/languages'
import specializations from './common/specializations'

export default {
  ...languages,
  ...specializations,
  components: {
    header: {
      ideas: 'Идеи',
      dashboard: 'Ваши идеи'
    },
    skillEditor: {
      header: {
        languagesSlide: {
          language: 'Выберите ЯП с которыми вы работали',
          specialization: 'Специальности',
        },
        specializationsSlide: {
          specialization: 'В каком направлении вы работали на ЯП: ',
        },
        technologiesSlide:{
          technology: 'Технологии для языка %s в специальности %s'
        },
      },
      controls: {
        back: 'Назад'
      }
    }
  },
  page: {
    index: {
      title: 'Место где собирают команды',
      description: 'это площадка для разработчиков, которые хотят привлечь единомышленников для совместной реализации своих идей',
      oAuth: {
        gitHub: 'Войти через GitHub'
      },
      action: {
        about: 'подробнее',
        projects: 'Посмотреть проекты'
      }
    },
    profile: {
      skillsLoading: 'Загрузка скиллов'
    },
    callback: {
      status: {
        error: {
          text: 'Что-то пошло не так',
          retryButton: 'Повторить'
        }
      },
      success: {
        text: 'Загружаем'
      },
      processing: {
        text: 'Авторизация...'
      }
    },
    dashboard: {
      title: 'Персональная страница'
    },
    ideas: {
      explore: {
        ideas: 'Идеи',
        new: 'Создать',
        advancedSearch: 'Расширенный поиск'
      }
    }
  },
  layouts: {
    error: {
      oAuth: {
        gitHub: 'Войти через GitHub'
      },
      action: {
        index: 'На главную'
      }
    }
  }
};
