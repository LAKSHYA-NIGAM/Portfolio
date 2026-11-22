/**
 * Portfolio Theme Preference Manager
 * Handles Dark/Light theme switching, persistence, and system media query fallbacks.
 */

export class ThemeManager {
  constructor(storageAdapter = null, defaultTheme = 'system') {
    this.storage = storageAdapter || new Map();
    this.theme = this.storage.get('theme_preference') || defaultTheme;
  }

  setTheme(themeName) {
    const valid = ['light', 'dark', 'system'];
    const chosen = valid.includes(themeName) ? themeName : 'system';
    this.theme = chosen;
    this.storage.set('theme_preference', chosen);
    return chosen;
  }

  resolveEffectiveTheme(systemPrefersDark = false) {
    if (this.theme === 'system') {
      return systemPrefersDark ? 'dark' : 'light';
    }
    return this.theme;
  }

  toggleTheme(currentEffectiveTheme) {
    const next = currentEffectiveTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }
}
