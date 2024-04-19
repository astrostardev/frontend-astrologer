export function extractTime(dateString) {
    if (!dateString) {
        return ''; // Return empty string if dateString is not provided
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return ''; // Return empty string if dateString is not a valid date
    }

    const currentDate = new Date(); // Current date

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1); // Month is zero-based
    const day = padZero(date.getDate());

    // Check if the conversation happened today
    if (date.toDateString() === currentDate.toDateString()) {
        let hours = date.getHours();
        const minutes = padZero(date.getMinutes());
        let amOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert hours to 12-hour format
        hours = padZero(hours);

        return `${hours}:${minutes} ${amOrPm}`;
    }

    // Check if the conversation happened yesterday
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    }

    // Check if the conversation happened within the past week
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    if (date > sevenDaysAgo) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    }

    // Otherwise, return the date in "YYYY-MM-DD" format
    return `${year}-${month}-${day}`;
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}
