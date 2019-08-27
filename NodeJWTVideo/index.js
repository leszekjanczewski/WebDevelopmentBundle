import express from 'express';
import parser from 'body-parser';
import mongoose, { Schema } from 'mongoose';
mongoose.connect('mongodb+srv://user:kWX02mGt3gvY@cluster0-zd33v.mongodb.net/test?retryWrites=true&w=majority')

const userSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } }
});

const User = mongoose.model('user', userSchema);

const app = new express();
app.use(parser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    return res.send('Hello world');
});

app.get('/world', (req, res) => {
    return res.send('World!');
});

app.get('/users', (req, res) => {
    User.find({}, function (err, users) {
        return res.send(users);
    })
});

app.post('/', (req, res) => {
    const { username } = req.body;
    const newUser = new User({
        username: username
    });
    newUser.save(function (err, model) {
        return res.send(model);
    });
});

app.listen(process.env.PORT || 3000);
