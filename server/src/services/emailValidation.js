
const emailValidation = (email)=>{
    if(email.search(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)=== -1){
        return {isValid:false,reason:"invalid email formation..."}
    }

    return {isValid:true}
}

export default emailValidation