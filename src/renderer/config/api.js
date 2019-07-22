let api;

if (process.env.NODE_ENV === 'development') {
    api = '/api';
}

if (process.env.NODE_ENV === 'production') {
    api = 'http://localhost:3000/api';
}

module.exports = api;