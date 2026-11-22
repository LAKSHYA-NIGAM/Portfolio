import assert from 'node:assert';
import test from 'node:test';
import { AnalyticsBatcher } from '../analytics-event.js';

test('AnalyticsBatcher: tracks and auto-flushes on threshold', () => {
  const batcher = new AnalyticsBatcher(3);
  batcher.track('page_view', { path: '/' });
  batcher.track('project_click', { projectId: 'codesync' });
  assert.strictEqual(batcher.queue.length, 2);
  assert.strictEqual(batcher.flushedBatches.length, 0);

  // Third event triggers auto-flush
  batcher.track('theme_change', { theme: 'dark' });
  assert.strictEqual(batcher.queue.length, 0);
  assert.strictEqual(batcher.flushedBatches.length, 1);
  assert.strictEqual(batcher.flushedBatches[0].length, 3);
});

test('AnalyticsBatcher: sanitizes and strips sensitive PII fields', () => {
  const batcher = new AnalyticsBatcher(10);
  batcher.track('contact_submit', {
    formId: 'contact-me',
    email: 'user@example.com', // Should be stripped
    password: 'secretPassword', // Should be stripped
    subject: 'Project Inquiry',
  });

  const event = batcher.queue[0];
  assert.strictEqual(event.properties.formId, 'contact-me');
  assert.strictEqual(event.properties.subject, 'Project Inquiry');
  assert.strictEqual(event.properties.email, undefined);
  assert.strictEqual(event.properties.password, undefined);
});

test('AnalyticsBatcher: rejects empty event names', () => {
  const batcher = new AnalyticsBatcher();
  assert.strictEqual(batcher.track(''), false);
  assert.strictEqual(batcher.track(null), false);
});
