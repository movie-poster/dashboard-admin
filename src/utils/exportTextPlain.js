
export const exportTextPlain = (fileName = "", source = "") => {
    const element = document.createElement("a");
    const file = new Blob([source], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName.replace(" ", "_")}.txt`;
    document.body.appendChild(element);
    element.click();
}
