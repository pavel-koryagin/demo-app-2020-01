// @flow
import { stubParametersForIdea } from './lib';

stubParametersForIdea({
  name: 'element',
  variants: [
    'the {word}',
    'the {word} {word}',
    'the {word} {word} {word}',
    '{string}',
    '{word} with {string}',
    '{word} {word} with {string}',
    '{word} {word} {word} with {string}',
    '{string} {word}',
    '{string} {word} {word}',
    '{string} {word} {word} {word}',
  ],
});

stubParametersForIdea({
  name: 'type',
  variants: [
    '{word}',
    '{word} {word}',
    '{word} {word} {word}',
  ],
});

stubParametersForIdea({
  name: 'ref',
  variants: [
    '{word}',
    '{word} {word}',
    '{word} {word} {word}',
  ],
});
