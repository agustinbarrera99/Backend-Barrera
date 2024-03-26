const notFoundOne = (one) => {
    if(!one) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
    }
    return one
} 

export default notFoundOne