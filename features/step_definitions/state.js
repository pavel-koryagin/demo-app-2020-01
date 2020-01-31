// @flow
import _ from 'lodash';
import moment from 'moment';
import { By, Key, until } from 'selenium-webdriver';
import assert from 'assert';
import { Given, When, Then } from 'cucumber';
import { getDriver, FRONTEND_URL } from '../../.tests/connectWebDriver';

Given('I am signed in as {word}', async function (userId) {
  const effectiveUserId = _.camelCase(userId);
  await getDriver().get(FRONTEND_URL + '/?_qaUser=' + effectiveUserId);
});

Given('It is {word} {word} {int} {int}:{int} now', async function (day, month, year, hour, minute) {
  const formatted = moment(
    day.replace(/st|nd|rd|th/, '') + ' ' + month + ' ' + year + ' ' + hour + ' ' + minute,
    'D MMM YYYY H mm'
  ).format('YYYY-MM-DD HH:mm:ss');
  await getDriver().get(FRONTEND_URL + '/?_qaNow=' + formatted);
});

Given('It is {word} {word} {int} {int}:{int} {word} now', async function (day, month, year, hour, minute, ampm) {
  const formatted = moment(
    day.replace(/st|nd|rd|th/, '') + ' ' + month + ' ' + year + ' ' + hour + ' ' + minute + ' ' + ampm,
    'D MMM YYYY h mm a'
  ).format('YYYY-MM-DD HH:mm:ss');
  await getDriver().get(FRONTEND_URL + '/?_qaNow=' + formatted);
});
