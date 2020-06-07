const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TitleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    from_date: { 
        type: Date,
        required: false
    },
    to_date: { 
        type: Date,
        required: false
    },
    employee_id: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Title = mongoose.model('Title', TitleSchema);

if (!Title.collection.collection) {
    Title.createCollection();
}

module.exports = { Title, TitleSchema };