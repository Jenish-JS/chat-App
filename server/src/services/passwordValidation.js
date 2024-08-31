

const passwordValidation = (password)=>{

    if((password.length <= 8)) {
        return {isValid: false, reason: "minimum length excluded"}
    }

    if((password.length >= 20)) {
        return {isValid: false, reason: "maximum lenght excluded"}
    }

    if((password.search(/[a-z]/)) === -1) {
        return {isValid: false, reason: "haven't any lowercase character"}
    }

    if((password.search(/([A-Z])\w+/g)) === -1) {
        return {isValid: false, reason: "haven't any uppercase character"}
    }

    if((password.search(/([0-9])\w+/g)) === -1) {
        return {isValid: false, reason: "haven't any number"}
    }

    if((password.search(/\W|_/g)) === -1) {
        return {isValid: false, reason: "haven't any special character"}
    }

    return {isValid: true}
}

export default passwordValidation