const params = {
    development: {
        apiUrl: process.env.REACT_APP_API_URL
    },
    production: {
        apiUrl: process.env.REACT_APP_API_URL
    }
};

export default params[process.env.NODE_ENV || 'development'];
