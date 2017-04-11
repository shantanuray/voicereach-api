var os = require('os');
var commandLineArgs = process.argv;
var nodeUtility    = require('nodeUtility');
// This module initializes the sessionManager Web API with the required configuration.
var mainConfig = require('./main');
// Load configuration from the configuration system
var appConfig = new nodeUtility.AppConfig({config:mainConfig}, true);

function SettingsConfig() {
  this.settings = {};
  this.settings = appConfig.config;
  this.logger = appConfig.logger;
  this.consoleLogger = appConfig.consoleLogger;

  //initializeSettings(this.settings, this.logger);
  initializeSettings(this.settings);
}

function initializeSettings(settings) {
  createArgumentSettings(settings);
  loadConfigSettings(settings);
  loadServerSettings(settings);
}

function createArgumentSettings(settings) {
  settings.clusterEnabled = commandLineArgs[2] ? parseInt(commandLineArgs[2]) : 0;
  settings.environment = commandLineArgs[3] ? commandLineArgs[3].toLowerCase() : 'local';
  settings.hostName = commandLineArgs[4] ? commandLineArgs[4] : '127.0.0.1';
  settings.masterPort =  commandLineArgs[5] ? parseInt(commandLineArgs[5]) : 3000;
  settings.workerPort =  commandLineArgs[6] ? parseInt(commandLineArgs[6]) : 9000;
}

function loadConfigSettings(settings) {
  var config = loadEnvironmentConfigFile(settings);

  var settingsLength = config.settings.length;

  for(var i = 0; i < settingsLength; i++) {
    var configSetting = config.settings[i];

    if(configSetting.name && configSetting.value) {
      settings[configSetting.name] = configSetting.value;
    }
  }
}

function loadServerSettings(settings) {
  settings.serverName = os.hostname().toLowerCase();
  settings.serverCores = os.cpus().length;
}

function loadEnvironmentConfigFile(settings) {
  var config;

  var configLocation = './settings.config.prod.json';

  switch(settings.environment) {
    case 'dev':
      configLocation = './settings.config.dev.json';
      break;
    case 'test':
      configLocation = './settings.config.test.json';
      break;
  }

  try {
    config = require(configLocation);
  }
  catch(e) {
    throw 'Unable to parse "lib/config/settings/"' + configLocation + ': ' + e;
  }

  if(!config.settings) {
    throw 'Property "settings" is no defined: ' + configLocation;
  }

  return config;
}

var settingsConfig = new SettingsConfig();

module.exports = settingsConfig;
