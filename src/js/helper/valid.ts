exports.isEmpty = function (value) {
    return value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0);
};

exports.isNumber = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

exports.isString = function (value) {
    return typeof value === 'string';
};

exports.isBoolean = function (value) {
    return typeof value === 'boolean';
};

exports.isArray = function (value) {
    return Array.isArray(value);
};

exports.isObject = function (value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
};

exports.isEmail = function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return exports.isString(email) && emailRegex.test(email);
};

exports.isPhoneNumber = function (phone) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return exports.isString(phone) && phoneRegex.test(phone);
};

exports.isURL = function (url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

exports.isInteger = function (value) {
    return Number.isInteger(value);
};

exports.isFloat = function (value) {
    return exports.isNumber(value) && !Number.isInteger(value);
};

exports.isPositive = function (value) {
    return exports.isNumber(value) && value > 0;
};

exports.isNegative = function (value) {
    return exports.isNumber(value) && value < 0;
};

exports.hasMinLength = function (value, min) {
    return exports.isString(value) && value.length >= min;
};

exports.hasMaxLength = function (value, max) {
    return exports.isString(value) && value.length <= max;
};
