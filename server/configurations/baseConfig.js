// salt for hashing

 const salt = 10


// algoritham for difrent profile

const algJsonForJWTConfigVar = {
    seller:"HS256",
    user:"HS512",
    admin:"HS384"
}

export {salt,algJsonForJWTConfigVar}