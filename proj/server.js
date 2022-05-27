const mongoose = require('mongoose');
const app = require('./app.js')

mongoose.connect("mongodb+srv://adimazbarga:AdimAzbarga12@cluster0.jydbi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
