
export function formatLongDate(date: string) {
    const typedDate = new Date(date)
    return typedDate.getDate() + "/" + (typedDate.getMonth() + 1) + "/" + typedDate.getFullYear();
}

export default function formatShortDate(date: string) {
    const typedDate = new Date(date)
    return typedDate.getDate() + "/" + (typedDate.getMonth() + 1);
}    