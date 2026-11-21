/**
 * Portfolio Project Filter & Search Index
 * Indexes project metadata, filters by category/tag, and computes matching scores.
 */

export function filterProjects(projects, query = '', selectedTag = 'all') {
  if (!Array.isArray(projects)) return [];

  const normalizedQuery = (query || '').trim().toLowerCase();
  const normalizedTag = (selectedTag || 'all').trim().toLowerCase();

  return projects.filter((project) => {
    if (!project || typeof project !== 'object') return false;

    // 1. Tag match
    const projectTags = Array.isArray(project.tags)
      ? project.tags.map((t) => String(t).toLowerCase())
      : [];
    const matchesTag = normalizedTag === 'all' || projectTags.includes(normalizedTag);
    if (!matchesTag) return false;

    // 2. Query match (title, description, tags)
    if (!normalizedQuery) return true;

    const title = String(project.title || '').toLowerCase();
    const desc = String(project.description || '').toLowerCase();
    const matchesTitle = title.includes(normalizedQuery);
    const matchesDesc = desc.includes(normalizedQuery);
    const matchesTagQuery = projectTags.some((t) => t.includes(normalizedQuery));

    return matchesTitle || matchesDesc || matchesTagQuery;
  });
}

export function extractUniqueTags(projects) {
  if (!Array.isArray(projects)) return ['all'];
  const tagSet = new Set(['all']);
  for (const p of projects) {
    if (p && Array.isArray(p.tags)) {
      for (const t of p.tags) {
        if (typeof t === 'string' && t.trim()) {
          tagSet.add(t.trim().toLowerCase());
        }
      }
    }
  }
  return Array.from(tagSet);
}
