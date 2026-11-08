import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computePageScrollProgress,
  computeWordRevealFactor,
  interpolateWordColor,
  validateInquiryForm,
} from './studioLogic';

test('computePageScrollProgress calculates clamped [0..1] ratio accurately', () => {
  assert.equal(computePageScrollProgress(0, 3000, 1000), 0);
  assert.equal(computePageScrollProgress(1000, 3000, 1000), 0.5);
  assert.equal(computePageScrollProgress(2000, 3000, 1000), 1);
  assert.equal(computePageScrollProgress(2500, 3000, 1000), 1);
  assert.equal(computePageScrollProgress(100, 900, 900), 0);
});

test('manifesto word reveal starts at #6F6F6F and finishes at #F4F4F4', () => {
  const totalWords = 24;
  assert.equal(computeWordRevealFactor(0, totalWords, 0, 3), 0);
  assert.equal(interpolateWordColor(computeWordRevealFactor(0, totalWords, 0, 3)), '#6F6F6F');

  assert.equal(computeWordRevealFactor(23, totalWords, 1, 3), 1);
  assert.equal(interpolateWordColor(computeWordRevealFactor(23, totalWords, 1, 3)), '#F4F4F4');
});

test('manifesto word reveal maintains a soft 3-word transition edge in reading order', () => {
  const totalWords = 24;
  const edgeWidth = 3;
  // At progress = 0.5, virtualPos = 0.5 * 27 = 13.5
  const f10 = computeWordRevealFactor(10, totalWords, 0.5, edgeWidth); // (13.5 - 10)/3 = 1.16 -> 1
  const f11 = computeWordRevealFactor(11, totalWords, 0.5, edgeWidth); // (13.5 - 11)/3 = 0.833
  const f12 = computeWordRevealFactor(12, totalWords, 0.5, edgeWidth); // (13.5 - 12)/3 = 0.5
  const f13 = computeWordRevealFactor(13, totalWords, 0.5, edgeWidth); // (13.5 - 13)/3 = 0.167
  const f14 = computeWordRevealFactor(14, totalWords, 0.5, edgeWidth); // (13.5 - 14)/3 = -0.16 -> 0

  assert.equal(f10, 1);
  assert.ok(f11 > f12 && f12 > f13 && f13 > 0);
  assert.equal(f14, 0);
});

test('validateInquiryForm rejects empty or malformed inputs and accepts valid briefs', () => {
  const emptyResult = validateInquiryForm({
    name: '',
    email: 'invalid-email',
    direction: '',
    message: 'short',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.direction);
  assert.ok(emptyResult.errors.message);

  const validResult = validateInquiryForm({
    name: 'Aksan Zulkarnain',
    email: 'aksan@rekavanta.studio',
    direction: 'Digital Services — Custom Software & AI',
    message: 'We are looking to engineer a custom workflow automation and SaaS portal.',
  });
  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});
