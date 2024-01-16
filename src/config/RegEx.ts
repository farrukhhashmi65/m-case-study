export const RegEx : any = {
    USERNAME:/^[a-zA-Z0-9]{10,}$/,
    USERNAME_UAE: /^[a-zA-Z0-9]{5,}$/,
    USERNAME_INDIA: /^[a-zA-Z][a-zA-Z0-9]{5,}$/,
    USERNAME_PAKISTAN: /^[a-zA-Z0-9]{8,}$/,
    USERNAME_OMAN: /^[a-zA-Z]{10,}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ALPHABETS_ONLY_2CHARS: /^[a-zA-Z]{2,}$/

};