"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookModel = void 0;

var _mongoose = require("mongoose");

var bookSchema = new _mongoose.Schema({
  title: {
    type: _mongoose.Schema.Types.String,
    required: true
  },
  numOfPages: {
    type: _mongoose.Schema.Types.Number,
    required: true
  },
  author: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});
var BookModel = (0, _mongoose.model)("Book", bookSchema);
exports.BookModel = BookModel;
//# sourceMappingURL=book.model.js.map