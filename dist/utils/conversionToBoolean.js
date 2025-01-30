export const conversionToBoolean = (key) => {
    let variable;
    switch (key.toLowerCase()) {
        case 'true':
            variable = true;
            break;
        case 'false':
            variable = false;
            break;
        default:
            throw new Error('Key должно быть булевым значением');
    }
    return variable;
};
//# sourceMappingURL=conversionToBoolean.js.map