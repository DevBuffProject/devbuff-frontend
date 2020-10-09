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
        language: "Языки программирования",
        specialization: "Специальности для языка: ",
        technology: "Технологии для специальности: "
      },
      controls: {
        back: "Назад"
      }
    }
  },
  page: {
    index: {
      title: "Место где собирают команды",
      description: "это площадка для разработчиков, которые хотят привлечь единомышленников для совместной реализации своих идей",
      oAuth: {
        gitHub: "Войти через GitHub"
      },
      action: {
        about: "подробнее",
        projects: "Посмотреть проекты"
      }
    },
    callback: {
      status: {
        error: {
          text: "Что-то пошло не так",
          retryButton: "Повторить"
        }
      },
      success: {
        text: "Загружаем ваш профиль"
      },
      processing: {
        text: "Авторизация..."
      }
    },
    dashboard: {
      title: "Персональная страница"
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
        gitHub: "Войти через GitHub"
      },
      action: {
        index: "На главную"
      }
    }
  }
};
