const mongoose = require('mongoose');
mongoose.connect(process.env.DB_PATH, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Database connected");
});