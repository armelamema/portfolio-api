const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/auth/login');
};

const isAdmin = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        return next();
    }
    res.status(403).render('error', { 
        message: 'Access denied. Admin privileges required.' 
    });
};

module.exports = { isAuthenticated, isAdmin };