import { describe, it, expect } from 'vitest';
import { reminderIcs } from './reminder';

describe('reminderIcs', () => {
	const ics = reminderIcs('07:30', 'https://nihon.example/', new Date(Date.UTC(2026, 9, 6, 12, 0, 0)));
	const lines = ics.split('\r\n');
	it('is a daily event at the chosen local time, starting today', () => {
		expect(lines).toContain('DTSTART:20261006T073000');
		expect(lines).toContain('RRULE:FREQ=DAILY');
	});
	it('rings when it starts and links to the app', () => {
		expect(ics).toMatch(/BEGIN:VALARM\r\nACTION:DISPLAY\r\nDESCRIPTION:[^\r]+\r\nTRIGGER:PT0M\r\nEND:VALARM/);
		expect(lines).toContain('URL:https://nihon.example/');
	});
	it('keeps one UID, so adding it again updates the same reminder', () => {
		expect(lines).toContain('UID:daily-reminder@nihon.example');
	});
	it('escapes commas in text and uses CRLF line endings', () => {
		expect(ics).toContain('Review cards\\, a little of the lesson');
		expect(ics.endsWith('END:VCALENDAR\r\n')).toBe(true);
		expect(ics.replace(/\r\n/g, '')).not.toMatch(/[\r\n]/);
	});
});
