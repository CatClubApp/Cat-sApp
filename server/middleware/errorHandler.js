const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case 'SequelizeValidationError':
            const errorMessage = err.errors.map((error) => error.message)
            res.status(400).json({ errors: errorMessage })
            break;
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({ errors: 'Email already in use' })
            break;
        case 'user not found':
            res.status(404).json({ errors: err.message })
            break;
        case 'dont have access token':
            res.status(400).json({ errors: err.message })
        default:
            res.status(500).json({ errors: 'Internal Server Error' })
            break;
    }
}

module.exports = errorHandler