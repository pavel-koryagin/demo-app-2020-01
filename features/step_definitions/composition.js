// @flow
import _ from 'lodash';
import { By, Key, until } from 'selenium-webdriver';
import assert from 'assert';
import { Given, When, Then } from 'cucumber';
import { E2eSelector } from '../../.tests/E2eSelector';
import { getTextSelector } from './app/selectors';

Then('{element} contains {element}', async function (
  containerSelector: E2eSelector,
  elementSelector: E2eSelector,
) {
  const container = await containerSelector.get();
  const element = await elementSelector.get(container);
  this.refs.callItThat(containerSelector.refId, container);
  this.refs.callItThat(elementSelector.refId, element);
});

Then('{element} contains a/an {type}', async function (
  containerSelector: E2eSelector,
  typeSelector: E2eSelector,
) {
  const container = await containerSelector.get();
  const element = await typeSelector.get(container);
  this.refs.callItThat(containerSelector.refId, container);
  this.refs.callItThat(typeSelector.refId, element);
});

Then('{element} does not contain {element}', async function (
  containerSelector: E2eSelector,
  elementSelector: E2eSelector,
) {
  const container = await containerSelector.get();
  await elementSelector.requireAbsence(container);
  this.refs.callItThat(containerSelector.refId, container);
});

Then('{element} does not contain a/an {type}', async function (
  containerSelector: E2eSelector,
  typeSelector: E2eSelector,
) {
  const container = await containerSelector.get();
  await typeSelector.requireAbsence(container);
  this.refs.callItThat(containerSelector.refId, container);
});

Then('there is {element}', async function (elementSelector: E2eSelector) {
  const element = await elementSelector.get();
  this.refs.callItThat(elementSelector.refId, element);
});

Then('{element} is not there', async function (elementSelector: E2eSelector) {
  await elementSelector.requireAbsence();
});

Then('that {ref} contains {element}', async function (
  refId: string,
  elementSelector: E2eSelector,
) {
  const container = this.refs.getThat(refId);
  const element = await elementSelector.get(container);
  this.refs.callItThat(elementSelector.refId, element);
});

Then('that {ref} contains a/an {type}', async function (
  refId: string,
  typeSelector: E2eSelector,
) {
  const container = this.refs.getThat(refId);
  const element = await typeSelector.get(container);
  this.refs.callItThat(typeSelector.refId, element);
});

Then('{element} contains these {type}', async function (
  containerSelector: E2eSelector,
  typeSelector: E2eSelector,
  dataTable,
) {
  this.refs.callItThat(containerSelector);
  const container = await containerSelector.get();
  await typeSelector.testForTable(container, dataTable.rawTable);
  this.refs.callItThat(containerSelector.refId, container);
});

Then('There are texts', async function (
  dataTable,
) {
  for (const text of dataTable.rawTable) {
    const selector = getTextSelector(text);
    await selector.get();
  }
});

Then('that {ref} does not contain {element}', async function (
  refId: string,
  elementSelector: E2eSelector,
) {
  const container = this.refs.getThat(refId);
  await elementSelector.requireAbsence(container);
});

Then('that {ref} does not contain a/an {type}', async function (
  refId: string,
  typeSelector: E2eSelector,
) {
  const container = this.refs.getThat(refId);
  await typeSelector.requireAbsence(container);
});

Then('that {ref} has {type}', async function (
  refId: string,
  typeSelector: E2eSelector,
  dataTable,
) {
  const container = this.refs.getThat(refId);
  const elements = await typeSelector.list(container);
  const column = dataTable.raw().map(row => row[0]);

  const found = new Set();
  const expect = new Set(column);
  for (const element of elements) {
    const text = await element.getText();
    assert.ok(expect.has(text), `${typeSelector.name} with "${text}" is found, but not listed`);
    assert.ok(!found.has(text), `Duplicate ${typeSelector.name} with "${text}"`);
    expect.delete(text);
    found.add(text);
  }
  assert.ok(expect.size === 0, `${typeSelector.name} with "${Array.from(expect).join(', ')}" not found`);
});
