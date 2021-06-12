import {withKnobs, array} from '@storybook/addon-knobs'

export default {
  title: 'SpecialistPicker',
  decorators: [withKnobs]
};

export const Default = () => ({
  props: {
    specialists: {
      default: array('Data', [
        {
          "name": "CSharp",
          "specializations": [
            {
              "name": "back-end",
              "frameworks": [
                {
                  "name": ".NET Framework"
                }
              ]
            },
            {
              "name": "game",
              "frameworks": [
                {
                  "name": "Unity"
                }
              ]
            },
            {
              "name": "desktop",
              "frameworks": []
            }
          ]
        },
        {
          "name": "JavaScript",
          "specializations": [
            {
              "name": "back-end",
              "frameworks": [
                {
                  "name": "Node.js"
                }
              ]
            },
            {
              "name": "front-end",
              "frameworks": [
                {
                  "name": "Vue.js"
                },
                {
                  "name": "Angular"
                },
                {
                  "name": "React"
                }
              ]
            }
          ]
        },
        {
          "name": "TypeScript",
          "specializations": [
            {
              "name": "back-end",
              "frameworks": [
                {
                  "name": "Node.js"
                }
              ]
            },
            {
              "name": "front-end",
              "frameworks": [
                {
                  "name": "Vue.js"
                },
                {
                  "name": "Angular"
                },
                {
                  "name": "React"
                }
              ]
            }
          ]
        },
        {
          "name": "Java",
          "specializations": [
            {
              "name": "back-end",
              "frameworks": [
                {
                  "name": "Spring Framework"
                },
                {
                  "name": "Spring Boot"
                },
                {
                  "name": "Spring Cloud"
                },
                {
                  "name": "Spring Cloud Data Flow"
                },
                {
                  "name": "Spring Integration"
                },
                {
                  "name": "Spring Batch"
                },
                {
                  "name": "Spring Security"
                },
                {
                  "name": "Spring Session"
                },
                {
                  "name": "Spring HATEOS"
                },
                {
                  "name": "Spring Flo"
                },
                {
                  "name": "Spring Shell"
                },
                {
                  "name": "Spring Web Flow"
                },
                {
                  "name": "Spark"
                },
                {
                  "name": "Struts"
                }
              ]
            },
            {
              "name": "android",
              "frameworks": []
            },
            {
              "name": "desktop",
              "frameworks": [
                {
                  "name": "JavaFX"
                }
              ]
            }
          ]
        },
        {
          "name": "Kotlin",
          "specializations": [
            {
              "name": "back-end",
              "frameworks": [
                {
                  "name": "Spring Framework"
                },
                {
                  "name": "Spring Boot"
                },
                {
                  "name": "Spring Cloud"
                },
                {
                  "name": "Spring Cloud Data Flow"
                },
                {
                  "name": "Spring Integration"
                },
                {
                  "name": "Spring Batch"
                },
                {
                  "name": "Spring Security"
                },
                {
                  "name": "Spring Session"
                },
                {
                  "name": "Spring HATEOS"
                },
                {
                  "name": "Spring Flo"
                },
                {
                  "name": "Spring Shell"
                },
                {
                  "name": "Spring Web Flow"
                },
                {
                  "name": "Spark"
                },
                {
                  "name": "Struts"
                }
              ]
            },
            {
              "name": "android",
              "frameworks": []
            },
            {
              "name": "desktop",
              "frameworks": [
                {
                  "name": "JavaFX"
                }
              ]
            }
          ]
        },
        {
          "name": "PHP",
          "specializations": [
            {
              "name": "back-end",
              "frameworks": [
                {
                  "name": "Laravel"
                },
                {
                  "name": "Symfony"
                },
                {
                  "name": "CodeIgniter"
                },
                {
                  "name": "Yii 2"
                },
                {
                  "name": "Phalcon"
                },
                {
                  "name": "CakePHP"
                },
                {
                  "name": "Zend Framework"
                },
                {
                  "name": "Slim"
                }
              ]
            }
          ]
        },
        {
          "name": "Python",
          "specializations": [
            {
              "name": "back-end",
              "frameworks": [
                {
                  "name": "Django"
                },
                {
                  "name": "Flask"
                }
              ]
            },
            {
              "name": "ML",
              "frameworks": [
                {
                  "name": "TensorFlow"
                }
              ]
            }
          ]
        },
        {
          "name": "Swift",
          "specializations": [
            {
              "name": "apple",
              "frameworks": [
                {
                  "name": "Swift UI"
                }
              ]
            }
          ]
        },
        {
          "name": "CPlusPlus",
          "specializations": [
            {
              "name": "desktop",
              "frameworks": []
            },
            {
              "name": "microcontrollers",
              "frameworks": []
            },
            {
              "name": "game",
              "frameworks": [
                {
                  "name": "Unreal Engine"
                }
              ]
            }
          ]
        }
      ])
    },
    userData: {
      default: array('User_Data', [
        {
          "name": "back-end",
          "count": 12312,
          "languages": [
            {
              "name": "Java",
              "frameworks": [
                {
                  "name": "Spring Cloud"
                }
              ]
            }
          ]
        },
        {
          "name": "game",
          "count": -124124,
          "languages": []
        },
        {
          "name": "desktop",
          "count": 3,
          "languages": [
            {
              "name": "Java",
              "frameworks": [
                {
                  "name": "InvalidFramework"
                },
                {
                  "name": "JavaFX"
                }
              ]
            },
            {
              "name": "InvalidLang",
              "frameworks": []
            }
          ]
        },
        {
          "name": "InvalidSpec",
          "count": 1,
          "languages": [
            {
              "name": "Java",
              "frameworks": []
            }
          ]
        }
      ])
    }
  },
  data: () => ({
    result: []
  }),
  methods: {
    onChanged(data) {
      this.result = data
    }
  },
  template: `
    <v-app>
    <v-specialist-picker
      :specialists="specialists"
      :userData="userData"
      @change="onChanged"
    />

    <hr>
    <h1>
      Story data: {{ result }}
    </h1>
    </v-app>
  `
})