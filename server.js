import app from "./app";

const PORT = normalizePort(process.env.PORT || '3001');

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});

app.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });



function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}