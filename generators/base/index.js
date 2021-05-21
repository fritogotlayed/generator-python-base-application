const _ = require('lodash');
const snakeCase = require('snake-case');

const Generator = require('../BaseGenerator');
const { template } = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    var prompts = [];

    this.conditionalPrompt(prompts, {
      type: 'input',
      name: 'githubName',
      message: 'GitHub Repository Name',
      default: this.options.githubName || this.appname // default to the current folder
    })

    const firstAnswers = await this.prompt(prompts);
    prompts = [];

    this.conditionalPrompt(prompts, {
      type: 'input',
      name: 'sourceFolder',
      message: 'Module name for the source folder',
      default: snakeCase.snakeCase(this.options.sourceFolder || this.appname, { delimiter: '_' })
    });
    this.conditionalPrompt(prompts, {
      type: 'input',
      name: 'description',
      message: 'A short description of the project',
      default: ''
    })
    this.conditionalPrompt(prompts, {
      type: 'input',
      name: 'consoleCommand',
      message: 'In the event this module is installed what will the console command be',
      default: snakeCase.snakeCase(this.options.consoleCommand || this.appname, { delimiter: '-' })
    })
    this.conditionalPrompt(prompts, {
      type: 'input',
      name: 'author',
      message: 'The author of this application or module',
      default: snakeCase.snakeCase(this.options.consoleCommand || this.appname, { delimiter: '-' })
    })

    const secondAnswers = await this.prompt(prompts);
    this.answers = _.merge({}, firstAnswers, secondAnswers, this.options);
  }

  async writing() {
    const templateArgs = {
      ...this.answers,
      currentYear: new Date().getFullYear(),
    };

    // Standardize
    if (templateArgs.dockerRegistryPrefix && !templateArgs.dockerRegistryPrefix.endsWith('/')) {
      templateArgs.dockerRegistryPrefix = templateArgs.dockerRegistryPrefix + '/';
    }

    this.copyFile({ key: '.coveragerc', templateArgs });
    this.copyFile({ key: '.flake8' });
    this.copyFile({ key: '.gitignore' });
    this.copyFile({ key: '.pylintrc' });
    this.copyFile({ key: 'LICENSE', templateArgs });
    this.copyFile({ key: 'Makefile', templateArgs });
    this.copyFile({ key: 'README.md' , templateArgs });
    this.copyFile({ key: 'requirements.txt' });
    this.copyFile({ key: 'setup.py', templateArgs });
    this.copyFile({ key: 'tox.ini', templateArgs });

    this.copyFile({ key: 'src/__init__.py', destPath: `${templateArgs.sourceFolder}/__init__.py`, templateArgs });
    this.copyFile({ key: 'src/app.py', destPath: `${templateArgs.sourceFolder}/app.py` });

    this.copyFile({ key: 'tests/__init__.py' })
    this.copyFile({ key: 'tests/requirements.txt' })
    this.copyFile({ key: 'tests/test_dummy.py', templateArgs })

    // this.copyFile({ key: 'src/index.js' });
    // this.copyFile({ key: 'src/index.test.js' });
    // this.copyFile({ key: 'src/globals.js', templateArgs });
    // this.copyFile({ key: 'src/globals.test.js' });
    // this.copyFile({ key: 'src/bunyan-logstash-http.js' });
    // this.copyFile({ key: 'src/bunyan-logstash-http.test.js' });

    // this.copyFile({ key: 'src/handlers/index.js' });
    // this.copyFile({ key: 'src/handlers/index.test.js' });
    // this.copyFile({ key: 'src/handlers/app_shutdown.js' });
  }
};