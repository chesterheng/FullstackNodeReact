const passport = require('passport');

module.exports = app => {
    
    // Client: User clicks Login -> Direct to http://localhost:5000/auth/google
    // Server: Forward users's request to google using info from GoogleStrategy
    // https://accounts.google.com/o/oauth2/v2/auth?response_type=code&
    // redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&
    // scope=profile%20email&
    // client_id=327480445444-o0isudl7hj92c6rkrnv8or2glcrvk0hv.apps.googleusercontent.com
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // Google: Direct to http://localhost:5000/auth/google/callback?code=456 
    // Server: Put user on hold, take the 'code' from the URL
    // Server: Send request to google with 'code' included

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'), (req, res) => {
            res.redirect('/surveys');
        }
    );

    // user logout
    app.get('/api/logout', (req, res) => {
        req.logout();
        //res.send(req.user);
        res.redirect('/');
    });

    // get current user
    app.get('/api/current_user', (req, res) => {
        // {"passport":{"user":"5b6a1cbcc1e6ab445825c8d5"}}
        //res.send(req.session);
        res.send(req.user);
    });
};

