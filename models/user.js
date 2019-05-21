const mongoose = require ('mongoose');
const {Schema} = mongoose;

const userSchemas = new Schema ({
  googleId: String,
  credit: {type: Number, default: 0},
});

// adding model name
mongoose.model ('users', userSchemas);
