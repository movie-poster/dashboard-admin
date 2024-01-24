export const isURL = (texto) => {
    var patron = /^(ftp|http|https):\/\/[^ "]+$/;
    return patron.test(texto);
}