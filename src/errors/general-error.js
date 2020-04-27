/* This code is based on dpd sample code */
class GeneralError extends Error {
    constructor(errors, message) {
        super(message)
        this.errors = errors
    }
}

module.exports = GeneralError
