const mongoose = require("mongoose");
const User = require("./User");

const VisitedTemplatesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
        unique: true
    },
    templates: {
        type: Array,
        required: true,
        default: []
    }
})

VisitedTemplatesSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("VisitedTemplates", VisitedTemplatesSchema);