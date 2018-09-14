if (process.env.NODE_DEV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
