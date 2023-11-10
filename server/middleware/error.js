

const error = (err, req, res, next) => {

    let message = err.message || 'Internal Server Error';
    let statusCode = err.statusCode || 500
    // let stack = err.stack;


    res.status(statusCode).json({ message: message, success: false });

}

export default error;