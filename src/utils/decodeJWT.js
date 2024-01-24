export const decodeToken = (token) => {
    try {
        return JSON.parse(window.atob (token.split (".")[1]))
    } catch (error) {
        return null;
    }
}