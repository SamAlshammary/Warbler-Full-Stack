function errorHandler(error, request, response, next){
    //building a piece of middleware, this will be used after our 404 handler
    return response.status(error.status || 500).json({
        error:{
            message: error.message || "oops! Something went wrong."
        }
    })
}

module.exports = errorHandler;