const mongoose = require('mongoose');
const app = require('./app.js')


app.listen(3000, function() {
    console.log("Server started on port 3000");
});
