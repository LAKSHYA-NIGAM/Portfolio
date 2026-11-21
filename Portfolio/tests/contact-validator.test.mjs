import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { validateEmail, validateContactForm } from '../contact-validator.js';

describe('Portfolio Contact Form Validator Tests', () => {
  test('validates correct email formats', () => {
    assert.equal(validateEmail('lakshyanigam20@gmail.com'), true);
    assert.equal(validateEmail('recruiter@techcorp.io'), true);
    assert.equal(validateEmail('invalid-email'), false);
    assert.equal(validateEmail('missing@domain'), false);
    assert.equal(validateEmail(''), false);
    assert.equal(validateEmail(null), false);
  });

  test('validates complete valid contact form submission', () => {
    const result = validateContactForm({
      name: 'Tech Recruiter',
      email: 'recruiter@company.com',
      message: 'Hi Lakshya, we were impressed by your backend and full-stack projects!'
    });
    assert.equal(result.isValid, true);
    assert.equal(Object.keys(result.errors).length, 0);
  });

  test('flags short name and invalid email', () => {
    const result = validateContactForm({
      name: 'X',
      email: 'not-an-email',
      message: 'Hello Lakshya'
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.name);
    assert.ok(result.errors.email);
  });

  test('flags message shorter than 10 characters', () => {
    const result = validateContactForm({
      name: 'Alice',
      email: 'alice@example.com',
      message: 'Hey'
    });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.message);
  });
});
