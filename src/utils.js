export function generateUniqueCode(fechaInicio) {
    const date = new Date(fechaInicio);
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let code = `${year}${month}${day}${getRandomLetter()}${getRandomLetter()}${hours}`;

    code = code.split('');

    for (let i = code.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [code[i], code[j]] = [code[j], code[i]]; // Intercambiar elementos
    }

    return code.join('');
}

export function isFutureDate(date) {
    const currentDate = new Date();
    const inputDate = new Date(date);
    return inputDate > currentDate;
}
