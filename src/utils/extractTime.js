export function extractTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    let amOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    hours = padZero(hours);
    return `${hours}:${minutes} ${amOrPm}`;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}
