class apiError extends Error {
    constructor(
        statusCode = 404,
        message = "something went wrong!",
        errors = [],
        stack = ""
    ){
        super(message) // the built-in js Error class only takes one parameter and thay is message.
        this.statusCode = statusCode
        this.data = null
        // this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {apiError}