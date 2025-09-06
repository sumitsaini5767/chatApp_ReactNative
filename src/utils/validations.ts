const checkEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const checkPassword = (password: string): boolean => {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(password);
}

const checkName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name) && name.trim().length > 3;
}
const checkConfirmPassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
}

export {
    checkEmail,
    checkPassword,
    checkName,
    checkConfirmPassword
};