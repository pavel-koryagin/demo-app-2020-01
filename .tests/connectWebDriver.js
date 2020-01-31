// @flow
import _ from 'lodash';
import { Builder, By, until, WebDriver, WebElement, WebElementPromise } from 'selenium-webdriver';
import assert from 'assert';
import { config } from './connectWebDriver.config';
import { setupCrossBrowserTesting } from './connectWebDriver.CrossBrowserTesting';
import { setupLocal } from './connectWebDriver.local';
import UnexpectedCaseException from '../src/errors/UnexpectedCaseException';

export const FRONTEND_URL = config.frontendUrl;
export const BACKEND_URL = config.backendUrl;
export const WEBDRIVER_TIMEOUT = config.webdriverTimeout;
export const E2E_TEST_TIMEOUT = config.testTimeout;

/**
 * @see https://stackoverflow.com/a/3425925/698843
 */
export function xpathStringLiteral(s) {
  if (s.indexOf('"')===-1) {
    return '"' + s + '"';
  }
  if (s.indexOf("'")===-1) {
    return "'" + s + "'";
  }
  return 'concat("' + s.replace(/"/g, '",\'"\',"') + '")';
}

export function byText(text) {
  return By.xpath(`//*[text()=${xpathStringLiteral(text)}]`);
}

export async function connectWebDriver(capabilitiesId = config.defaultCapabilitiesId) {
  const builder = new Builder();
  switch (config.hub) {
    case 'local':
      setupLocal(builder, capabilitiesId);
      break;
    case 'cbt':
      setupCrossBrowserTesting(builder, capabilitiesId);
      break;
    default:
      throw new UnexpectedCaseException();
  }
  const driver = await builder.build();

  return {
    driver,
    async release() {
      return driver.close(); // Note: quit() closes everything
    }
  };
}

const devices = {};
let currentDevice;

export function getDriver(): WebDriver {
  return currentDevice.driver;
}

export function wrapWebElementPromise(code: () => Promise<WebElement>): WebElementPromise {
  return new WebElementPromise(getDriver(), code());
}

export async function connectDriver() {
  if (currentDevice) {
    throw new UnexpectedCaseException();
  }
  currentDevice = await connectWebDriver();
  devices[1] = currentDevice;
}

export async function tearDownDriver() {
  await getDriver().quit();
  for (const id in devices) {
    // getDriver().quit() is a bit faster than this // await devices[id].release();
    delete devices[id];
  }
  currentDevice = null;
}

export async function executeInBrowser(functionWithCode: () => any) {
  // Extract code
  const functionCode = functionWithCode.toString();
  const prefix = functionCode.match(/^function\s*(\w*)\(\)\s*{\s*/);
  assert.ok(prefix, `Function has a wrong header`);
  const suffix = functionCode.match(/\s*}$/);
  const code = functionCode.substr(
    prefix[0].length,
    functionCode.length - prefix[0].length - suffix[0].length
  );

  // Execute
  return getDriver().executeScript(code);
}

export async function takeNewDevice() {
  const id = _.findKey(devices, currentDevice);
  await currentDevice.release();
  currentDevice = await connectWebDriver();
  devices[id] = currentDevice;
}

export async function takeDevice(id) {
  // Run another browser for new device
  if (!devices[id]) {
    devices[id] = await connectWebDriver();
  }

  currentDevice = devices[id];
  return currentDevice;
}
