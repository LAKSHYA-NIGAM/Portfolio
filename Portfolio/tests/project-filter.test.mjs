import assert from 'node:assert';
import test from 'node:test';
import { filterProjects, extractUniqueTags } from '../project-filter.js';

const mockProjects = [
  { id: 1, title: 'CodeSync', description: 'Collaborative code editor', tags: ['React', 'Node.js', 'Socket.io'] },
  { id: 2, title: 'TransacShield', description: 'Real-time payment fraud prevention', tags: ['Express', 'Fintech', 'Redis'] },
  { id: 3, title: 'AlgoLabs', description: 'Algorithm and DSA visualizer', tags: ['React', 'TypeScript', 'Algorithms'] },
];

test('filterProjects: filter by tag', () => {
  const filtered = filterProjects(mockProjects, '', 'react');
  assert.strictEqual(filtered.length, 2);
  assert.strictEqual(filtered[0].title, 'CodeSync');
  assert.strictEqual(filtered[1].title, 'AlgoLabs');
});

test('filterProjects: search by keyword in title or description', () => {
  const res1 = filterProjects(mockProjects, 'fraud', 'all');
  assert.strictEqual(res1.length, 1);
  assert.strictEqual(res1[0].title, 'TransacShield');

  const res2 = filterProjects(mockProjects, 'editor', 'all');
  assert.strictEqual(res2.length, 1);
  assert.strictEqual(res2[0].title, 'CodeSync');
});

test('extractUniqueTags: gathers all unique tags with all', () => {
  const tags = extractUniqueTags(mockProjects);
  assert.ok(tags.includes('all'));
  assert.ok(tags.includes('react'));
  assert.ok(tags.includes('fintech'));
  assert.strictEqual(tags.length, 9); // 'all' + 8 unique tags
});
