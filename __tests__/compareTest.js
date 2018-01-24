
import f from '../src/compare';

test('compare two json-files', () => {
  expect(f('./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json')).toEqual({
    '  host': 'hexlet.io',
    '+ timeout': 20,
    '- timeout': 50,
    '- proxy': '123.234.53.22',
    '+ verbose': true,
  });
});

test('compare two yaml-files', () => {
  expect(f('./__tests__/__fixtures__/before.yaml', './__tests__/__fixtures__/after.yaml')).toEqual({
    '  host': 'hexlet.io',
    '+ timeout': 20,
    '- timeout': 50,
    '- proxy': '123.234.53.22',
    '+ verbose': true,
  });
});

test('compare two ini-files', () => {
  expect(f('./__tests__/__fixtures__/before.ini', './__tests__/__fixtures__/after.ini')).toEqual({
    '  host': 'hexlet.io',
    '+ timeout': '20',
    '- timeout': '50',
    '- proxy': '123.234.53.22',
    '+ verbose': true,
  });
});
