export function substringCode(code) {
    return code.substringCode(0, 3) + '...' + code.substringCode(code.length - 3, code.length);
}

export function stringLastFour(string) {
    return string.substring(string.length - 4, string.length);
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

export function parseDateFormat(date) {
    let data = date.substring(0, 8);

    data = `${data.substring(0, 4)}-${data.substring(4, 6)}-${data.substring(6, 8)}`

    return data;
}
