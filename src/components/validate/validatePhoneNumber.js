export const validatePhoneNumber = (number) => {
    const formattedNumber = number.replace(/[^0-9+]/g, ''); // Normalize the number
    const uzbRegex = /^(\+998)?(9[012345789]|6[125679])[0-9]{7}$/; // Uzbekistan phone format
    return uzbRegex.test(formattedNumber);
};