// @flow
import { WebElement } from 'selenium-webdriver';
import assert from 'assert';

type Ref = {
  that: WebElement,
}

type Refs = { [string /* name */]: Ref }

export default class E2eRefs {
  _refs: Refs;

  constructor() {
    this._refs = {};
  }

  _requireRef(refId): Ref {
    if (!this._refs[refId]) {
      this._refs[refId] = {
        that: null,
      };
    }
    return this._refs[refId];
  }

  getThat(refId): Ref {
    assert.ok(this._refs[refId], `The reference is not recognized`);
    assert.ok(this._refs[refId].that, `"That" reference is not recognized for the element`);
    return this._refs[refId].that;
  }

  callItThat(refId: ?string, element: WebElement) {
    if (refId) {
      this._requireRef(refId).that = element;
    }
  }
}
