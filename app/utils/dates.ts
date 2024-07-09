// Dates functions for parsing dates that come in as strings from the backend
// Formats in DD/MM/YYYY or DD/MM depending on need
// Both functions return a string

export function formatLongDate(date: string) {
    const typedDate = new Date(date)
    return typedDate.getDate().toLocaleString("en-GB", { minimumIntegerDigits: 2 }) + "/" + ((typedDate.getMonth()+1).toLocaleString("en-GB", { minimumIntegerDigits: 2 })) + "/" + typedDate.getFullYear().toLocaleString("en-GB", { minimumIntegerDigits: 4, useGrouping: false });
}

export function formatShortDate(date: string) {
    const typedDate = new Date(date)
    return typedDate.getDate().toLocaleString("en-GB", { minimumIntegerDigits: 2 }) + "/" + ((typedDate.getMonth()+1).toLocaleString("en-GB", { minimumIntegerDigits: 2 }));
}    