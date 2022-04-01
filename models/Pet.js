const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    name: {
        type: String,
        default: "UnNamed"
    },
    bio: {
        type: String
    },
    pictures: {
        type: [String]
    },
    species: {
        type: String
    },
    morph: {
        type: String
    },
    gender: {
        type: Boolean
    },
    birthday: {
        type: Date
    },
    lastFed: {
        food: {
            type: String
        },
        time: {
            type: Date
        },
        result: {
            type: Number
        }
    },
    recordedFeeds: {
        type: [
            {
                food: {
                    type: String
                },
                time: {
                    type: Date
                },
                result: {
                    type: Number
                }
            }
        ]
    },
    sheds: {
        type: [Date]
    },
    weight: {
        type: Number
    },
    recordedWeights: {
        type: [
            {
                weight: {
                    type: Number
                },
                time: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    length: {
        type: Number
    },
    recordedLengths: {
        type: [
            {
                length: {
                    type: Number
                },
                time: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;