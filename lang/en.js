import languages from './common/languages'

export default {
  ...languages,
  specializations: {
    "back-end": {
      title: "Backend developer",
      description: "Разработчики в этой сфере занимаются созданием функционала сервиса"
    },
    "ML": {
      title: "ML Specialist",
      description: "Это специалист, эксперт в области искусственного интеллекта."
    },
    "android": {
      title: "Android developer",
      description: "Разработчики, которые пишут код под платформу Android"
    },
    "desktop": {
      title: "Desktop Developer",
      description: "Занимается разработкой приложений для компьютеров"
    },
    "apple": {
      title: "Apple developer",
      description: "Разработчики данной специализации создают приложения для таких OS, как IOS/MacOs/IPadOS"
    },
    "front-end": {
      title: "Frontend developer",
      description: "Frontend разработчики создают интерфейсы приложений"
    },
    "game": {
      title: "Game developer",
      description: "Разработчики из данной сферы занимаются созданием игр"
    },
    "microcontrollers": {
      title: "Разработчики микроконтроллеров",
      description: "Написание кода для микроконтроллеров"
    }
  },

  common: {
    cancel: 'cancel',
    save: 'save',
    apply: 'apply',
  },
  country: {
    default: "Not selected",
    "AF": "Afghanistan",
    "AX": "Åland Islands",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua & Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BA": "Bosnia & Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "VG": "British Virgin Islands",
    "BN": "Brunei",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CV": "Cape Verde",
    "BQ": "Caribbean Netherlands",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo - Brazzaville",
    "CD": "Congo - Kinshasa",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "CI": "Côte d’Ivoire",
    "HR": "Croatia",
    "CU": "Cuba",
    "CW": "Curaçao",
    "CY": "Cyprus",
    "CZ": "Czechia",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "SZ": "Eswatini",
    "ET": "Ethiopia",
    "FK": "Falkland Islands",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard & McDonald Islands",
    "HN": "Honduras",
    "HK": "Hong Kong SAR China",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Laos",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao SAR China",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar (Burma)",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "KP": "North Korea",
    "MK": "North Macedonia",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestinian Territories",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PN": "Pitcairn Islands",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RE": "Réunion",
    "RO": "Romania",
    "RU": "Russia",
    "RW": "Rwanda",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "São Tomé & Príncipe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SX": "Sint Maarten",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia & South Sandwich Islands",
    "KR": "South Korea",
    "SS": "South Sudan",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "BL": "St. Barthélemy",
    "SH": "St. Helena",
    "KN": "St. Kitts & Nevis",
    "LC": "St. Lucia",
    "MF": "St. Martin",
    "PM": "St. Pierre & Miquelon",
    "VC": "St. Vincent & Grenadines",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard & Jan Mayen",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syria",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad & Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks & Caicos Islands",
    "TV": "Tuvalu",
    "UM": "U.S. Outlying Islands",
    "VI": "U.S. Virgin Islands",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VA": "Vatican City",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "WF": "Wallis & Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
  },
  components: {
    header: {
      ideas: 'ideas',
      dashboard: 'Dashboard',
      create: 'Create'
    },
    skillEditor: {
      header: {
        languagesSlide: {
          language: 'Select languages with whom you have worked',
          specialization: 'Specializations',
        },
        specializationsSlide: {
          specialization: 'In what specialisation did you work for this language: ',
        },
        technologiesSlide: {
          technology: 'Technology for language %s in specialization %s'
        },
      },
      controls: {
        back: 'Back'
      }
    },
    ideaCard: {
      name: "Name",
      dateCreation: "Date creation",
      description: "Description",
      specialists: "Specialists",
      languages: "Languages",
      technologies: "Technologies"
    }
  },
  page: {
    index: {
      title: 'Место где собирают команды',
      description: 'это площадка для разработчиков, которые хотят привлечь единомышленников для совместной реализации своих идей',
      oAuth: {
        gitHub: 'Login via GitHub'
      },
      action: {
        about: 'see about',
        projects: 'Посмотреть проекты'
      }
    },
    profile: {
      userName: 'username',
      firstName: 'firstname',
      lastName: 'lastname',
      birthdate: 'birthdate',
      about: 'about',
      country: 'country',
      city: 'city',
      socialNetworks: 'Social networks',
      vk: 'vkontakte',
      emailSendVerifyMail: 'send verification mail',
      emailVerificationMailSent: 'verification mail sent',
      emailVerified: 'e-mail verified',
      emailNoVerified: 'e-mail no verified',
      skillsLoading: 'Загрузка скиллов'
    },
    callback: {
      status: {
        error: {
          text: 'Something wrong',
          retryButton: 'Try again please'
        }
      },
      success: {
        text: 'Loading'
      },
      processing: {
        text: 'Authorization...'
      }
    },
    dashboard: {
      search: 'Search',
      title: 'Dashboard',
      noIdeas: 'No ideas',
      respond: {
        title: 'Responses',
        viewIdea: 'View idea',
        specialization: 'Specialization',
        contacts: {
          vk: "VK"
        },
        accept: "Accept",
        notFound: "No response yet"
      }
    },
    ideas: {
      explore: {
        ideas: 'Ideas',
        new: 'Create',
        filter: {
          all: 'All',
          specializations: 'Specializations',
          languages: 'Languages',
          datePublish: 'By publication date',
          lastUpdate: 'Last update',
        },
        notFound: 'Not found'
      },
      view: {
        back: 'Back',
        dateCreation: 'Date creation',
        status: {
          title: 'Status idea',
          PUBLISH: 'Published',
          WAITING_FULL_TEAM: 'Waiting full team',
          WORKING: 'Development',
          FINISHED: 'Done.',
          PAUSED: 'Paused',
          STOPPED: 'Project closed :('
        },
        statusModeration: {
          title: 'Status of moderation',
          waitingValidation: 'Pending to moderation',
          alreadyApproved: 'Approved moderation'
        },
        action: {
          title: 'Action',
          change: 'Change',
          delete: 'Delete',
          respond: 'Respond'
        },
        team: {
          countSpecialists: 'List of positions',
          countPositionsPerSpecialists: 'Count',
          languages: "Languages",
          technologies: "Technologies",
          statusPending: {
            not: 'Respond',
            pending: 'Your already pending',
            ownerIdea: 'Your owner of idea'
          }
        }
      }
    },
    editor: {
      title: {
        ideaNew: 'New idea',
        ideaEdit: 'Change idea',
        publish: 'Idea publish'
      },
      idea: {
        heading: 'idea heading',
        desc: 'short description',
        text: 'idea text',
        selectForFormat: 'select for format',
        positions: 'team positions',
      }
    }
  },
  layouts: {
    error: {
      oAuth: {
        gitHub: 'Login vie GitHub'
      },
      action: {
        index: 'Return'
      }
    }
  }
};