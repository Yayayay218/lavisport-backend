var mongoose = require('mongoose'), Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var livestreamSchema = new mongoose.Schema({
    title: String,
    description: String,
    channels: [{
        title: String,
        link: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date
});

livestreamSchema.plugin(mongoosePaginate);
mongoose.model('Livestreams', livestreamSchema);