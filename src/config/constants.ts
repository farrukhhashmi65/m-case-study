
export const Languages = ["en", 'ru', 'fr']

export enum Countries {
    UAE = "UAE",
    India = "India",
    Pakistan = "Pakistan",
    Oman = "Oman"
}

export const CountryImages: any = {
    India: require('../assets/India.png'),
    Pakistan: require('../assets/Pakistan.png'),
    Oman: require('../assets/Oman.png'),
    UAE: require('../assets/UAE.png')
}

export enum APIStatus {
    Error = "error",
    Success = "success",
}