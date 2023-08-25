require('dotenv'). config()

module.exports = {
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3001,
    SECRT: process.env.SECRET,
    KEY: process.env.KEYS
}