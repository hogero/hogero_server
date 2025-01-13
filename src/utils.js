export function generateUniqueCode() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const getRandomNumber = () => Math.floor(Math.random() * 10);
    let code = `${year}${month}${day}${getRandomLetter()}${getRandomLetter()}${getRandomLetter()}${getRandomNumber()}`;

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
