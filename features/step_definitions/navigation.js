// @flow
import _ from 'lodash';
import { By, Key, until } from 'selenium-webdriver';
import assert from 'assert';
import { Given, When, Then, Before, After, setWorldConstructor } from 'cucumber';
import { config } from '../../.tests/connectWebDriver.config';
import {
  connectDriver, FRONTEND_URL, getDriver, takeDevice, takeNewDevice, tearDownDriver,
} from '../../.tests/connectWebDriver';
import { analysePage } from './app/selectors';
import E2eRefs from '../../.tests/E2eRefs';
import { resetDatabase } from '../../backend/model/resetDatabase';

setWorldConstructor(function CustomWorld({ attach, parameters }) {
  this.attach = attach;
  this.parameters = parameters;
  this.refs = new E2eRefs();
});

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const wildcard = /:\w+/g;

async function ensureCurrentPageIsValid(expectedRelativeUrl) {
  const actualUrl = await getDriver().getCurrentUrl();
  let pattern = null;
  if (wildcard.test(expectedRelativeUrl)) {
    pattern = new RegExp(
      '^' + escapeRegExp(FRONTEND_URL) + escapeRegExp(expectedRelativeUrl).replace(wildcard, '[\\w\\-]+') + '$'
    );
  }
  assert.ok(
    pattern ? pattern.test(actualUrl) : actualUrl === (FRONTEND_URL + expectedRelativeUrl),
    `Current page is ${actualUrl}, not ${FRONTEND_URL + expectedRelativeUrl}`
  );
  const { error } = await analysePage();
  assert.ok(!error, `Target page ${actualUrl} shows the error "${error}"`);
}

Before(async function (scenario) {
  // Let's do those in parallel
  await Promise.all([
    resetDatabase(),
    connectDriver(),
  ]);
});

After(async function (scenario) {
  if (config.pauseOnFail && scenario.result.status === 'failed') {
    setTimeout(tearDownDriver, 3000);
  } else {
    await tearDownDriver();
  }
});

When('wait for {int} sec', { timeout: 3600 * 1000 }, async function (time) {
  await new Promise(resolve => setTimeout(resolve, time * 1000));
});

Given('I am at {word}', async function (url) {
  // Act
  await getDriver().get(FRONTEND_URL + url);

  // Assert
  await ensureCurrentPageIsValid(url);
});

Then('I am redirected to {word}', async function (url) {
  await ensureCurrentPageIsValid(url);
});

Given('I take a new device', async function () {
  await takeNewDevice();
});

When('I go offline', async function () {
  await getDriver().setNetworkConditions({
    offline: true,
    latency: 0,
    throughput: 0,
  });
});

When('I go online', async function () {
  await getDriver().setNetworkConditions(null);
});

When('I hit refresh', async function () {
  await getDriver().navigate().refresh();

  // TODO: Add the complete reload marker here, instead of this
  await new Promise(resolve => setTimeout(resolve, 500));
});

When('I take device #{int}', async function (id) {
  await takeDevice(id);
});
