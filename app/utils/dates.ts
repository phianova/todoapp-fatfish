
export function formatLongDate(date: string) {
    const typedDate = new Date(date)
    return typedDate.getDate().toLocaleString("en-GB", { minimumIntegerDigits: 2 }) + "/" + (typedDate.getMonth().toLocaleString("en-GB", { minimumIntegerDigits: 2 })) + "/" + typedDate.getFullYear().toLocaleString("en-GB", { minimumIntegerDigits: 4 });
}

export default function formatShortDate(date: string) {
    const typedDate = new Date(date)
    return typedDate.getDate().toLocaleString("en-GB", { minimumIntegerDigits: 2 }) + "/" + (typedDate.getMonth().toLocaleString("en-GB", { minimumIntegerDigits: 2 }));
}    