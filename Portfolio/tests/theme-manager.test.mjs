import assert from 'node:assert';
import test from 'node:test';
import { ThemeManager } from '../theme-manager.js';

test('ThemeManager: defaults to system and resolves according to OS preference', () => {
  const manager = new ThemeManager();
  assert.strictEqual(manager.theme, 'system');
  assert.strictEqual(manager.resolveEffectiveTheme(true), 'dark');
  assert.strictEqual(manager.resolveEffectiveTheme(false), 'light');
});

test('ThemeManager: sets and persists explicit light/dark themes', () => {
  const storage = new Map();
  const manager = new ThemeManager(storage);

  manager.setTheme('dark');
  assert.strictEqual(manager.theme, 'dark');
  assert.strictEqual(storage.get('theme_preference'), 'dark');
  assert.strictEqual(manager.resolveEffectiveTheme(false), 'dark');

  manager.setTheme('light');
  assert.strictEqual(manager.theme, 'light');
  assert.strictEqual(manager.resolveEffectiveTheme(true), 'light');
});

test('ThemeManager: toggleTheme switches between dark and light', () => {
  const manager = new ThemeManager();
  assert.strictEqual(manager.toggleTheme('dark'), 'light');
  assert.strictEqual(manager.toggleTheme('light'), 'dark');
});
