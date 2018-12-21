const params = {
    development: {
        appUrl: process.env.REACT_APP_URL,
        apiUrl: process.env.REACT_APP_API_URL
    },
    production: {
        appUrl: process.env.REACT_APP_URL,
        apiUrl: process.env.REACT_APP_API_URL
    }
};

export default params[process.env.NODE_ENV || 'development'];
