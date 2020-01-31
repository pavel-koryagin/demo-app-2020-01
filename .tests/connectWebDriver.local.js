// @flow
import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { config } from './connectWebDriver.config';

export function setupLocal(builder: Builder, capabilitiesId: string) {

  const chromeOptions = new chrome.Options();

  if (!config.localShowWindow) {
    chromeOptions.headless();
  } else {
    chromeOptions.addArguments('--start-maximized');
  }

  builder
    .forBrowser(capabilitiesId)
    .setChromeOptions(chromeOptions);
}
