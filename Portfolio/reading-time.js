/**
 * Portfolio Reading Time & Content Complexity Estimator
 * Calculates word counts, code block weighting, and estimated reading time.
 */

export function calculateReadingTime(text, wordsPerMinute = 200) {
  if (typeof text !== 'string' || text.trim().length === 0) {
    return { words: 0, minutes: 0, text: '0 min read' };
  }

  // Strip code blocks for separate weighting if markdown
  const codeBlocks = text.match(/```[\s\S]*?```/g) || [];
  let codeWords = 0;
  for (const block of codeBlocks) {
    const blockText = block.replace(/```/g, '');
    const tokens = blockText.trim().split(/\s+/).filter(Boolean);
    codeWords += tokens.length;
  }

  const plainText = text.replace(/```[\s\S]*?```/g, '');
  const proseWords = plainText.trim().split(/\s+/).filter(Boolean).length;
  const totalWords = proseWords + codeWords;

  // Code reading pace is typically 50% of standard prose
  const effectiveWords = proseWords + codeWords * 2;
  const minutes = Math.max(1, Math.ceil(effectiveWords / wordsPerMinute));

  return {
    words: totalWords,
    proseWords,
    codeWords,
    minutes,
    text: `${minutes} min read`,
  };
}
