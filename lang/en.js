import languages from './common/languages'

export default {
  ...languages,
  components: {
    header: {
      ideas: 'ideas',
      dashboard: 'Dashboard'
    }
  },
  page: {
    index: {
      title: "Место где собирают команды",
      description: "это площадка для разработчиков, которые хотят привлечь единомышленников для совместной реализации своих идей",
      oAuth: {
        gitHub: "Login via GitHub"
      },
      action: {
        about: "see about",
        projects: "Посмотреть проекты"
      }
    },
    callback: {
      status: {
        error: {
          text: "Something wrong",
          retryButton: "Try again please"
        }
      },
      success: {
        text: "Loading your data"
      },
      processing: {
        text: "Authorization..."
      }
    },
    dashboard: {
      title: "Dashboard"
    },
    ideas: {
      explore: {
        ideas: 'Ideas',
        new: 'Create',
        advancedSearch: 'Advanced search'
      }
    }
  },
  layouts: {
    error: {
      oAuth: {
        gitHub: "Login vie GitHub"
      },
      action: {
        index: "Return"
      }
    }
  }
};
