export function dateTimeFormatter(date: Date) {
	return new Intl.DateTimeFormat('en', { dateStyle: "medium", timeStyle: "medium" }).format(
		date
	);
}
