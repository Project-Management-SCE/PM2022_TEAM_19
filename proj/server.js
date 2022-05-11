const mongoose = require('mongoose');
const app = require('./app.js')

mongoose.connect("mongodb://localhost:27017/UserDB", {
  useNewUrlParser: true
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

