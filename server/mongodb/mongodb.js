const mongoose = require('mongoose');

let mongoConfigs = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.URLDB, mongoConfigs, (err, res) => {
    if (err) throw err;
    console.log('Base de datos conectada');
});

module.exports = mongoose;