// @flow
import _ from 'lodash';
import { By, Key, until } from 'selenium-webdriver';
import assert from 'assert';
import { Given, When, Then } from 'cucumber';
import { E2eSelector } from '../../.tests/E2eSelector';
import { getDriver } from '../../.tests/connectWebDriver';

function scrollIntoView(element) {
  return getDriver().executeScript('arguments[0].scrollIntoView(true)', element);
}

async function click(elementPromise) {
  await scrollIntoView(elementPromise);
  return elementPromise.click();
}

When('I click {element}', async function (elementSelector: E2eSelector) {
  const element = await click(elementSelector.get());
  this.refs.callItThat(elementSelector.refId, element);
});

When('I click that {ref}', async function (refId: string) {
  await click(this.refs.getThat(refId));
});

When('in {element} I click {element}', async function (
  containerSelector: E2eSelector,
  elementSelector: E2eSelector,
) {
  const container = await containerSelector.get();
  const element = await click(elementSelector.get(container));
  this.refs.callItThat(containerSelector.refId, container);
  this.refs.callItThat(elementSelector.refId, element);
});

When('in that {ref} I click {element}', async function (refId: string, elementSelector: E2eSelector) {
  const container = this.refs.getThat(refId);
  const element = await click(elementSelector.get(container));
  this.refs.callItThat(elementSelector.refId, element);
});

When('I type {string} into {element}', async function (text, elementSelector: E2eSelector) {
  const element = await elementSelector.get().sendKeys(text);
  this.refs.callItThat(elementSelector.refId, element);
});

When('I type {string} into that {ref}', async function (text, refId: string) {
  const element = this.refs.getThat(refId);
  await element.sendKeys(text);
});

When('the server action request is completed', async function () {
  await getDriver().wait(() => getDriver().executeScript('return !window.e2eHelpers.isExecutingServerActionRequest()'));
});

async function pressKey(key, elementSelector) {
  const keyId = key.toUpperCase().replace(/ /g, '_');
  assert.ok(Key[keyId], `Key ${key} is not recognized`);
  const element = await elementSelector.get().sendKeys(Key[keyId]);
  this.refs.callItThat(elementSelector.refId, element);
}

When('I press {word} {word} in {element}', async function (key1, key2, elementSelector) {
  return pressKey.call(this, key1 + ' ' + key2, elementSelector);
});

When('I press {word} in {element}', pressKey);
