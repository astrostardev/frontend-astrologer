export function extractTime(dateString) {
    if (!dateString) {
        return ''; // Return empty string if dateString is not provided
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return ''; // Return empty string if dateString is not a valid date
    }

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
