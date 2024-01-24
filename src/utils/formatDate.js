
export const formatDate = (date) => {
    const decodeDate = new Date(date);

    const year = decodeDate.getFullYear();
    const month = (decodeDate.getMonth() + 1).toString().padStart(2, '0');
    const day = decodeDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const formatDateTime = (date) => {
    const decodeDate = new Date(date);

    const year = decodeDate.getFullYear();
    const month = (decodeDate.getMonth() + 1).toString().padStart(2, '0');
    const day = decodeDate.getDate().toString().padStart(2, '0');
    let hours = decodeDate.getHours();
    const minutes = decodeDate.getMinutes().toString().padStart(2, '0');
    let ampm = 'am';

    if (hours >= 12) {
        ampm = 'pm';
        if (hours > 12) {
            hours -= 12;
        }
    }

    hours = hours.toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}
