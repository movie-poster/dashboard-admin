
export const encodeFileBase64 = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result.split(',')[1]
            resolve(base64);
        }
        reader.onerror = (error) => {
            resolve(null);
        }
    });
}

export const isURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}