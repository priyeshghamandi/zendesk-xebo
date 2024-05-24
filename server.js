const app = require('./app')

const PORT = process.env.PORT || '3001';

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});

app.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });

