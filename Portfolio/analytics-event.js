/**
 * Portfolio Privacy-Preserving Analytics Batcher
 * Buffers user interaction events, strips PII, and batches outbound beacons.
 */

export class AnalyticsBatcher {
  constructor(flushThreshold = 5) {
    this.flushThreshold = flushThreshold;
    this.queue = [];
    this.flushedBatches = [];
  }

  track(eventName, properties = {}) {
    if (typeof eventName !== 'string' || !eventName.trim()) return false;

    // Sanitize properties: strip any keys resembling email, password, phone
    const sanitizedProps = {};
    const sensitiveKeys = ['email', 'password', 'token', 'phone', 'ssn'];

    for (const [key, val] of Object.entries(properties || {})) {
      if (!sensitiveKeys.includes(key.toLowerCase())) {
        sanitizedProps[key] = val;
      }
    }

    const event = {
      event: eventName.trim(),
      properties: sanitizedProps,
      timestamp: Date.now(),
    };

    this.queue.push(event);

    if (this.queue.length >= this.flushThreshold) {
      this.flush();
    }
    return true;
  }

  flush() {
    if (this.queue.length === 0) return [];
    const batch = [...this.queue];
    this.flushedBatches.push(batch);
    this.queue = [];
    return batch;
  }
}
