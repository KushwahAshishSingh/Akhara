const lawyersRoutes = require('./lawyers_routes');

module.exports = function(app, db) {
    lawyersRoutes(app, db);
};
