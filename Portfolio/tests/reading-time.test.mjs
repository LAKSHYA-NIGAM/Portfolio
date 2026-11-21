import assert from 'node:assert';
import test from 'node:test';
import { calculateReadingTime } from '../reading-time.js';

test('calculateReadingTime: standard short blog post', () => {
  const post = 'This is a clean and concise portfolio post about full stack web development and algorithms. '.repeat(10);
  const result = calculateReadingTime(post);
  assert.ok(result.words > 100);
  assert.strictEqual(result.minutes, 1);
  assert.strictEqual(result.text, '1 min read');
});

test('calculateReadingTime: incorporates code block complexity weighting', () => {
  const contentWithCode = `
    Here is an algorithmic solution:
    \`\`\`javascript
    function fib(n) {
      if (n <= 1) return n;
      return fib(n - 1) + fib(n - 2);
    }
    \`\`\`
  `;
  const result = calculateReadingTime(contentWithCode);
  assert.ok(result.codeWords > 0);
  assert.strictEqual(result.minutes, 1);
});

test('calculateReadingTime: empty or non-string input', () => {
  assert.deepStrictEqual(calculateReadingTime(''), { words: 0, minutes: 0, text: '0 min read' });
  assert.deepStrictEqual(calculateReadingTime(null), { words: 0, minutes: 0, text: '0 min read' });
});
