// keys js figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // prod keys
  module.exports = require ('./prod');
} else {
  // dev keys
  module.exports = require ('./dev');
}
