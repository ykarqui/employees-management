const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const titleFields = {
    empID: Schema.Types.ObjectId,
    title: String,
    from_date: String,
    to_date: String
};

const titleSchema = new Schema({ titleFields });

const Title = mongoose.model('Title', titleSchema, 'title');

if (!Title.collection.collection) {
    Title.createCollection();
}

module.exports = { Title, titleFields };