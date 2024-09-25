export function envVar(name: string, fallback: string): string {
	const ev = process.env[name];
	return ev ?? fallback;
}

export function head<T>(items?: T | T[]): T | undefined {
	return Array.isArray(items) ? items[0] : (items ?? undefined);
}
