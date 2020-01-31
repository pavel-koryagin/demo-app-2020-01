// @flow
import _ from 'lodash';
import { By } from 'selenium-webdriver';
import { defineParameterType } from 'cucumber';
import assert from 'assert';
import { FRONTEND_URL, getDriver, xpathStringLiteral } from '../../../.tests/connectWebDriver';
import UnexpectedCaseException from '../../../src/errors/UnexpectedCaseException';
import { E2eSelector } from '../../../.tests/E2eSelector';
import type { Container } from '../../../.tests/E2eSelector';

/* eslint-disable quotes, no-restricted-syntax, no-await-in-loop */
E2eSelector.rootXPath = `//*[${getHasClassXPath('MuiContainer-root')}]//`;

export const fileSamplesPath = __dirname;

const elements = {
  'Add Button': `*[${getHasClassXPath('MuiFab-root')} and @aria-label="Add"]`,

  Header: 'header',
  Hamburger: `*[${getHasClassXPath('top-bar__btn_menu')}]`,
  'Hamburger Button Badge': `*[${getHasClassXPath('top-bar__has-msgs')}]`,
  'Hamburger Menu': `*[${getHasClassXPath('profile-menu')}]`,
  'Hamburger Menu Close': `*[${getHasClassXPath('profile-menu__close')}]`,
  'Hamburger Menu Badge': `*[${getHasClassXPath('profile-menu__has-msgs')}]`,
  'Event Menu': `*[${getHasClassXPath('event-menu')}]`,
  'Menu Badge': `*[${getHasClassXPath('event-menu__btn-badge')}]`,
  Dialog: `//*[${getHasClassXPath('modal')}]`,

  'Chat Area': `*[${getHasClassXPath('chat__body')}]`,
  'Chat Message': `*[${getHasClassXPath('chat__message')}]`,
  'Send Form': `*[${getHasClassXPath('send-message')}]`,
};

const elementTypes = {
  fab: `*[self::a or ${getHasClassXPath('MuiFab-root')}]`,
  fabs: `*[self::a or ${getHasClassXPath('MuiFab-root')}]`,


  button: `*[self::a or ${getHasClassXPath('btn')}]`,
  buttons: `*[self::a or ${getHasClassXPath('btn')}]`,
  card: `*[${getHasClassXPath('card')}]`,
  cards: `*[${getHasClassXPath('card')}]`,
  link: `a`,
  links: `a`,
  'text field': `input[@type='text']`,
  'text fields': `input[@type='text']`,
  avatar: `img[${getHasClassXPath('g__avatar')}]`,
  avatars: `img[${getHasClassXPath('g__avatar')}]`,
  'table row': `tr`,
  'table rows': `tr`,
  'select option': `option`,
  'select options': `option`,
  'event item': `*[${getHasClassXPath('events-list__event')}]`,
  'event items': `*[${getHasClassXPath('events-list__event')}]`,
  'chat item': `*[${getHasClassXPath('chats-list__chat')}]`,
  'chat items': `*[${getHasClassXPath('chats-list__chat')}]`,
};

const elementTypesTestForTable = {
  links: async (
    selector: E2eSelector,
    container?: ?Container,
    table: Array<Array<string>>
  ) => {
    const items = await selector.list(container);

    // Map by title
    const itemByTitle = {};
    for (const item of items) {
      const title = await item.getText();
      assert.ok(!itemByTitle[title], `Duplicate items titled "${title}"`);
      itemByTitle[title] = item;
    }

    // Check links
    const restingTitles = new Set(Object.keys(itemByTitle));
    for (const row of table) {
      const [title, link] = row;
      assert.ok(itemByTitle[title], `${selector.name} with "${title}" not found among the titles: ${Object.keys(itemByTitle).join(', ')}`);
      restingTitles.delete(title);
      if (link) {
        const itemLink = await itemByTitle[title].getAttribute('href');
        const isAnchor = _.startsWith(link, '#');
        const actual = isAnchor ? itemLink.replace(/[^#]+/, '') : itemLink;
        const expected = isAnchor ? link : (FRONTEND_URL + link);
        assert.strictEqual(
          actual,
          expected,
          `${selector.name} with "${title}" has link to "${itemLink}" while expecting link to "${link}"`
        );
      }
    }

    // Ensure no surprises
    assert.ok(restingTitles.size === 0, `There are also items, not listed in the test: "${Array.from(restingTitles).join('", "')}"`);
  },
};
/* eslint-enable quotes, no-restricted-syntax, no-await-in-loop */

defineParameterType({
  name: 'element',
  regexp: [
    /the (\w[\w'\s]*?[\w'])()/, //            'the {word}'           => elementName
    /"([^"]*)(")/, //                     '{string}'             => text
    /(\w[\w'\s]*?[\w']) (w)ith "([^"]*)"/, // '{word} with {string}' => elementName, text
    /"([^"]*)"( )(\w[\w'\s]*?[\w'])/, //      '{string} {word}',     => text, elementType
  ],
  transformer(a, marker, b) {
    switch (marker) {
      case null: return new E2eSelector('el:' + a, `Element ${a}`, getElementXPath(a));
      case '"': return new E2eSelector(null, `Element with text "${a}"`, '*' + getHasTextXPath(a) + ' | self::node()' + getHasTextXPath(a));
      case 'w': return new E2eSelector('el:' + a, `Element ${a} with text ${b}`, getElementXPath(a) + getContainsTextXPath(b));
      case ' ': return new E2eSelector('type:' + b, `Element of type ${b} with text ${a}`, getTypeXPath(b) + getContainsTextXPath(a));
      default: throw new UnexpectedCaseException();
    }
  },
});

defineParameterType({
  name: 'type',
  regexp: [
    /\w[\w\s]*?\w/,
  ],
  transformer(type) {
    return new E2eSelector('type:' + type, `Element of type ${type}`, getTypeXPath(type),
      { testForTable: elementTypesTestForTable[type] });
  },
});

defineParameterType({
  name: 'ref',
  regexp: [
    /\w[\w\s]*?\w/,
  ],
  transformer(name) {
    if (elementTypes[name]) {
      return 'type:' + name;
    }
    if (elements[name]) {
      return 'el:' + name;
    }
    assert.fail(`There is no element or type ${name} known`);
    return null; // This is for eslint
  },
});

export function getTextSelector(text) {
  return new E2eSelector(null, `Text "${text}"`, '*' + getHasTextXPath(text));
}

function getHasClassXPath(className) {
  return `contains(concat(' ',normalize-space(@class),' '),' ${className} ')`;
}

function getElementXPath(elementName) {
  assert.ok(_.has(elements, elementName), `There's no element known as "${elementName}"`);
  return elements[elementName];
}

function getTypeXPath(elementType) {
  assert.ok(_.has(elementTypes, elementType), `There's no element type "${elementType}"`);
  return elementTypes[elementType];
}

function getHasTextXPath(text) {
  return `[text()=${xpathStringLiteral(text)}]`;
}

function getContainsTextXPath(text) {
  const escapedText = xpathStringLiteral(text);
  return `[text()=${escapedText} or @title=${escapedText} or .//*[text()=${escapedText}]]`;
}

export async function analysePage() {
  let error = null;

  // Page-level errors
  const [h1] = await getDriver().findElements(By.xpath('//h1'));
  if (h1) {
    const h1Text = await h1.getText();
    if (['404'].indexOf(h1Text) !== -1) {
      error = h1Text;
    }
  }

  // Load failed alerts
  if (!error) {
    // TODO: Update these
    const [failureAlert] = await getDriver().findElements(By.xpath('//strong[text()="Load failed."]'));
    if (failureAlert) {
      const msgElement = await failureAlert.findElement(By.xpath('../../p[2]'));
      error = await msgElement.getText();
    }
  }

  return {
    error,
  };
}
