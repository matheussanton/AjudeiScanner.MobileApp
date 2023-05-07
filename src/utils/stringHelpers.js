export function substringCode(code) {
    return code.substringCode(0, 3) + '...' + code.substringCode(code.length - 3, code.length);
}

export function stringLastFour(string) {
    return string.substring(string.length - 4, string.length);
}

function reverseString(str) {
    return str.split("").reverse().join("");
}
