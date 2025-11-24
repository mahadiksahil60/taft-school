export function isoToHumanReadableInEST(isoString) {
    const date = new Date(isoString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/New_York',  // US Eastern Time zone
    };
    return date.toLocaleString('en-US', options);
}