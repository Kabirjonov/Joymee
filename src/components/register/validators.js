import validator from "validator";

export const validatePhoneNumber = (number)=>{
    const isValide = validator.isMobilePhone(number,'uzb')
    return isValide
}