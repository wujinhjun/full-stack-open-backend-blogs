const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: {
    type: Number,
    default: 0,
    validate: {
      validator: (value) => {
        return value >= 0;
      },
      message: (props) => `The ${props.value} is not a valid likes count`,
    },
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
