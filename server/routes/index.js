module.exports = app => {

    app.use('/api', require('./auth.routes.js'))
    app.use('/api/meetings', require('./meetings.routes'))
    app.use('/api/user', require('./user.routes'))
}