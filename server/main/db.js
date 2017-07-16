var mongoose = require('mongoose');

module.exports = {
    setup: function () {

        if (this.db == null) {
            this.getConnection();
        }

        this.db.on('error', console.error.bind(console, 'connection error ...'));
        this.db.once('open', function callback() {
            console.log('multivision db opened');
        });

        var messageSchema = mongoose.Schema({
            message: String,
            user: String
        },
            {
                timestamps: true
            });

        var Message = mongoose.model('Message', messageSchema);
        this.MessageModel = Message;
        Message.find({}).exec(function (err, collection) {
            if (collection.length === 0) {
                Message.create({ message: 'hello', user: 'admin' });
                Message.create({ message: 'Hi', user: 'Karan' });
                Message.create({ message: 'testing', user: 'Guneet' });
            }
        })
    },
    getMessages: function (time,callback) {

        if (this.db == null) {
            this.setup();
        }
        this.MessageModel.find({}).lean().exec(function (err, collection) {
            callback( JSON.stringify(collection));
        })
        
    },
    sendMessage: function (user, message) {
         if (this.db == null) {
            this.setup();
        }
        this.MessageModel.create({ message: message, user: user });
    },
    getConnection: function () {
        mongoose.connect('mongodb://127.0.0.1:27017/messages');
        if (this.db == null) {
            this.db = mongoose.connection;
        }
        return this.db;
    }

}
