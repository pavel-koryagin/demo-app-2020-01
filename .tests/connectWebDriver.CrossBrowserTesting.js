// @flow
import { Builder } from 'selenium-webdriver';
import UnexpectedCaseException from '../src/errors/UnexpectedCaseException';
import { config } from './connectWebDriver.config';

const hub = 'http://hub.crossbrowsertesting.com:80/wd/hub';
const capabilities = {
  chrome: {
    'name': 'Basic Test Example',
    'build': '1.0',
    'browserName': 'Chrome',
    'version': '76x64',
    'platform': 'Windows 10',
    'screenResolution': '1366x768',
    'record_video': 'true',
  },
};

export function setupCrossBrowserTesting(builder: Builder, capabilitiesId: string) {
  if (!capabilities[capabilitiesId]) {
    throw new UnexpectedCaseException();
  }

  builder
    .usingServer(hub)
    .withCapabilities({
      ...capabilities[capabilitiesId],
      username: config.crossBrowserTestingUsername,
      password: config.crossBrowserTestingAuthKey,
    });
}
