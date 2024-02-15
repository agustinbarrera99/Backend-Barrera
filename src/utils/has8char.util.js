const has8char = (password) => {
    if (password.length < 8) {
        const error = new Error("the password must contain at least 8 characters")
        error.statusCode = 400
        throw error
    }  
}

export default has8char