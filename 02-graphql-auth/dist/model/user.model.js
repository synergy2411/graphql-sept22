"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  username: {
    type: _mongoose.Schema.Types.String,
    required: true
  },
  email: {
    type: _mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: _mongoose.Schema.Types.String,
    required: true
  },
  age: {
    type: _mongoose.Schema.Types.Number,
    required: true
  }
});
var UserModel = (0, _mongoose.model)("User", userSchema); // User -> users
// Post -> posts

exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map