import { getWordEnding } from './get-word-ending';

describe('getWordEnding', () => {
  it('should return correct word ending for 1', () => {
    expect(getWordEnding('яблок', 1, ['о', 'а', 'ов'])).toBe('яблоко');
  });

  it('should return correct word ending for 2', () => {
    expect(getWordEnding('яблок', 2, ['о', 'а', 'ов'])).toBe('яблока');
  });
});
