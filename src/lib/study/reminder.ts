// A daily reminder as a calendar event (.ics) with an alarm. The phone's calendar does the
// notifying, so it works on any phone with no server. Times are "floating": local wherever you are.
const esc = (s: string) => s.replace(/[\;,]/g, (c) => '\\' + c);
const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');

export function reminderIcs(time: string, url: string, now: Date = new Date()): string {
	const day = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
	return [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Nihongo Notes//Daily reminder//EN',
		'BEGIN:VEVENT',
		`UID:daily-reminder@${new URL(url).host}`,
		`DTSTAMP:${stamp(now)}`,
		`DTSTART:${day}T${time.replace(':', '')}00`,
		'DURATION:PT10M',
		'RRULE:FREQ=DAILY',
		`SUMMARY:${esc("にほんご帳: today's page")}`,
		`DESCRIPTION:${esc(`Review cards, a little of the lesson and a quick quiz. ${url}`)}`,
		`URL:${url}`,
		'BEGIN:VALARM',
		'ACTION:DISPLAY',
		`DESCRIPTION:${esc("Time for today's page")}`,
		'TRIGGER:PT0M',
		'END:VALARM',
		'END:VEVENT',
		'END:VCALENDAR',
		''
	].join('\r\n');
}
