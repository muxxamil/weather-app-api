module.exports = (app) => {
    app.use('/api/temperatures',                                    require('../controllers/Temperatures'));
};