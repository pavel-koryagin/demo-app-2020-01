// @flow
import _ from 'lodash';
import { By, Key, until } from 'selenium-webdriver';
import assert from 'assert';
import { Given, When, Then } from 'cucumber';
import { executeInBrowser, getDriver } from '../../.tests/connectWebDriver';
import { fileSamplesPath } from './app/selectors';
import { E2eSelector } from '../../.tests/E2eSelector';

const fileRegExp = /^<File:\s*(.+?)\s?>$/;
const checkedMarker = '<Checked>';
const uncheckedMarker = '<Unchecked>';

When('I submit the form', async function (dataTable) {
  // Get form shape
  function collectIds() {
    return getDriver().executeScript(`
      var labels = document.evaluate(
        ${JSON.stringify(E2eSelector.rootXPath)} + 'label',
        document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
      );
      var result = {};
      for (var i = 0; i < labels.snapshotLength; i++) {
        var label = labels.snapshotItem(i);
        if (label.htmlFor) {
          result[label.innerText] = label.htmlFor;
        } else {
          var item = label.querySelector('input, textarea, select');
          if (!item) {
            continue;
          }
          if (!item.id) {
            window.tmpId || (window.tmpId = 0);
            window.tmpId++;
            item.id = 'tmp-' + window.tmpId; 
          }
          result[label.innerText] = item.id;
        }
      }
      return result;
    `);
  }
  let idsFromLabels = await collectIds();

  // Fill the fields
  for (const [labelText, value] of dataTable.raw()) {
    if (!_.has(idsFromLabels, labelText)) {
      // It might change after previous input
      idsFromLabels = await collectIds();
      if (!_.has(idsFromLabels, labelText)) {
        assert.fail(`Field "${labelText}" is not at the page\nThere are: "${Object.keys(idsFromLabels).join('", "')}"`);
      }
    }
    const elementPromise = getDriver().findElement(By.id(idsFromLabels[labelText]));

    if (fileRegExp.test(value)) {
      // File select
      const [, fileName] = value.match(fileRegExp);
      await elementPromise.sendKeys(fileSamplesPath + '/' + fileName);
    } else if (value === checkedMarker || value === uncheckedMarker) {
      // Checkbox
      const isChecked = await elementPromise.isSelected();
      if (
        (isChecked && value === uncheckedMarker)
        || (!isChecked && value === checkedMarker)
      ) {
        await elementPromise.click();
      }
    } else {
      const tagName = (await elementPromise.getTagName()).toLowerCase();
      if (tagName === 'select') {
        // Select
        await elementPromise.sendKeys(value);
      } else {
        // Text
        await elementPromise
          .sendKeys(Key.chord(Key.CONTROL, 'a'), value);
      }
    }
    /* TODO: Optimize
    https://hustle.bizongo.in/simulate-react-on-change-on-controlled-components-baa336920e04

    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;
    nativeInputValueSetter.call(input, "is working");

    var inputEvent = new Event("input", { bubbles: true });
    input.dispatchEvent(inputEvent);
    */
  }

  // Submit
  await getDriver().findElement(
    By.xpath(E2eSelector.rootXPath + '*[@type="submit"]')
  ).click();

  // Not implemented in this platform // await getDriver().wait(() => getDriver().executeScript('return !window.e2eHelpers.isSubmittingForm()'));
  await new Promise(resolve => setTimeout(resolve, 300));
});

When('the form submit is completed', async function () {
  // Not implemented in this platform // await getDriver().wait(() => getDriver().executeScript('return !window.e2eHelpers.isSubmittingForm()'));
  await new Promise(resolve => setTimeout(resolve, 300));
});

Then('I see the errors in the form', async function (dataTable) {
  // Get form shape
  const messages = await getDriver().executeScript(`
    var messages = {};
    var form = document.querySelector('[role=main] form');

    var globalValidation = form.querySelector('.alert.alert-danger');
    messages['(form)'] = globalValidation ? globalValidation.innerText : '';

    var formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(function (formGroup) {
      var message = formGroup.querySelector('.invalid-feedback');
      var label = formGroup.querySelector('label');
      if (label && message) {
        messages[label.innerText] = message.innerText;
      } else if (label) {
        messages[label.innerText] = '';
      } else if (message) {
        throw new Error('Cannot determine the label for the error message "' + message.innerText + '"');
      }
    });

    return messages;
  `);

  // Check the messages
  const unprocessedMessages = new Set(_.keys(messages));
  for (const [labelText, message] of dataTable.raw()) {
    if (!_.has(messages, labelText)) {
      assert.fail(`Field "${labelText}" is not at the page\nThere are: "${Object.keys(messages).join('", "')}"`);
    }
    assert.strictEqual(messages[labelText], message);
    unprocessedMessages.delete(labelText);
  }

  // Check, if some messages are not mentioned in the step
  const missedMessages = [];
  for (const labelText of unprocessedMessages.values()) {
    if (messages[labelText]) {
      missedMessages.push(labelText + ' | ' + messages[labelText]);
    }
  }
  assert.ok(
    missedMessages.length === 0,
    `There are unlisted error messages in the form: \n| ${missedMessages.join('|\n|')} |`
  );
});

Then('The form is populated with', async function (dataTable) {
  // TODO: Move the extraction logic into selectors.js. It is app-specific

  // Get form values
  const values = await executeInBrowser(function () {
    const result = {};

    const labels = document.evaluate(
      '//*[@role="main"]//label',
      document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    );
    for (let i = 0; i < labels.snapshotLength; i++) {
      const label = labels.snapshotItem(i);

      // Get input
      const input = label.htmlFor
        ? document.getElementById(label.htmlFor)
        : label.querySelector('input, textarea, select');
      if (!input) {
        console.log('Label with no input', label);
        throw new Error('Label with no input');
      }

      // Read
      result[label.innerText] = (input.type === 'checkbox' || input.type === 'radio') ? input.checked : input.value;
    }

    return result;
  });

  // Check the values
  for (const [labelText, value] of dataTable.raw()) {
    if (!_.has(values, labelText)) {
      assert.fail(`Field "${labelText}" is not at the page\nThere are: "${Object.keys(values).join('", "')}"`);
    }
    assert.strictEqual(values[labelText], value);
  }
});
