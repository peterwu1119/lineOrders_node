const express = require('express');

var app = require('./app_router.js')

// Serve static files from the React app
app.use( express.static( path.join( __dirname, 'client/build' ) ) );

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get( '*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//The 'process' object is a global that provides information about, and control over, the current Node.js process.
//As a global, it is always available to Node.js applications without using require().
//The 'process.env' property returns an object containing the user environment.
//you can set the environment variable 'PORT' to tell your web server what port to listen on.
const port = process.env.PORT || 3000;
//whatever is in the environment variable 'PORT', or 3000 if there's nothing there

//binds and listens for connections on the specified host and port. This method is identical to Node’s http.Server.listen().
app.listen(port);
console.log(`MERN Stack listening on ${port}`);
