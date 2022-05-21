const { Schema, SchemaTypes, model } = require("mongoose");

const userSchema = new Schema({
  nama: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
    uniqued: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  friends: {
    type: [{ type: SchemaTypes.ObjectId, ref: "User" }],
  },
  enemy: {
    type: [{ type: SchemaTypes.ObjectId, ref: "User" }],
  },
});

const User = model("User", userSchema, "users");

module.exports = User;
