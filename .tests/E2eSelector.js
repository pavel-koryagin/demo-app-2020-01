// @flow
import assert from 'assert';
import { WebElement, WebElementPromise, By, error } from 'selenium-webdriver';
import { getDriver, wrapWebElementPromise } from './connectWebDriver';

export type Container = WebElement | WebElementPromise;
type CustomFns = {
  testForTable?: (selector: E2eSelector, container?: ?Container, table: Array<Array<string>>) => Promise<void>,
}

export class E2eSelector {
  static rootXPath = '//';
  refId: ?string;
  name: string;
  xPath: string;
  customFns: CustomFns;

  constructor(refId: ?string, name: string, xPath: string, customFns: CustomFns = {}) {
    this.refId = refId;
    this.name = name;
    this.xPath = xPath;
    this.customFns = customFns;
  }

  get(container?: ?Container): WebElementPromise {
    return wrapWebElementPromise(async () => {
      let effectiveSelector;
      try {
        // Execute the request as usual
        if (container) {
          effectiveSelector = './/' + this.xPath;
          return await container.findElement(By.xpath(effectiveSelector));
        } else {
          effectiveSelector = /^\/\//.test(this.xPath)
            ? this.xPath // Global
            : (E2eSelector.rootXPath + this.xPath);
          return await getDriver().findElement(By.xpath(effectiveSelector));
        }
      } catch (e) {
        // Make exceptions more readable
        if (e instanceof error.NoSuchElementError) {
          assert.fail(`${this.name} is not found.\nXPath selector:\n    ${effectiveSelector}`);
        }
        throw e;
      }
    });
  }

  list(container?: ?Container): Promise<Array<WebElement>> {
    return container
      ? container.findElements(By.xpath('.//' + this.xPath))
      : getDriver().findElements(By.xpath(
        /^\/\//.test(this.xPath)
          ? this.xPath // Global
          : (E2eSelector.rootXPath + this.xPath)
      ));
  }

  async requireAbsence(container?: ?Container, msg?: string) {
    const found = await this.list(container);
    assert.ok(
      found.length === 0,
      msg || `${this.name} is found where expected to be absent`
    );
  }

  testForTable(container?: ?Container, table: Array<Array<string>>) {
    assert.ok(this.customFns.testForTable, `${this.name} does not support testForTable`);
    return this.customFns.testForTable(this, container, table);
  }
}
