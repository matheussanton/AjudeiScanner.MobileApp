export function getColorByStatus(status) {
    let color;

    switch (status) {
        case 0:
            color = lightenColor('#515BBA', 20);
            break;
        case 1:
            color = '#515BBA'; // Purple
            break;
        case 2:
            color = '#28A745'; // Green
            break;
        case 3:
            color = '#DC3545'; // Red
            break;
        default:
            color = '#000000'; // Black
            break;
    }

    return color;
}

function lightenColor(color, amount) {
    // Convert hexadecimal color to RGB
    const hexToRgb = (color) => {
        const hex = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    // Lighten RGB color
    const lightenRgb = (rgb, amount) => {
        return {
            r: Math.min(rgb.r + amount, 255),
            g: Math.min(rgb.g + amount, 255),
            b: Math.min(rgb.b + amount, 255)
        };
    };

    // Convert RGB color to hexadecimal
    const rgbToHex = (rgb) => {
        return '#' + ((1 << 24) | (rgb.r << 16) | (rgb.g << 8) | rgb.b).toString(16).slice(1);
    };

    // Lighten the color
    const rgbColor = hexToRgb(color);
    const lightenedColor = lightenRgb(rgbColor, amount);
    const finalColor = rgbToHex(lightenedColor);

    return finalColor;
}
