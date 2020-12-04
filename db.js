const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'todos-list';

async function connect() {
 await mongoose.connect(`${dbUrl}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

module.exports = {
  connect,
};