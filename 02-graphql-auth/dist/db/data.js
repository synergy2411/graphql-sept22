"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.posts = exports.comments = exports.authors = void 0;
var authors = [{
  id: "u001",
  username: "john",
  email: "john@test",
  age: 32
}, {
  id: "u002",
  username: "jenny",
  email: "jenny@test",
  age: 34
}, {
  id: "u003",
  username: "alice",
  email: "alice@test",
  age: 35
}];
exports.authors = authors;
var posts = [{
  id: "p001",
  title: "GraphQL for Beginners",
  body: "Awesome write up",
  published: true,
  author: "u001"
}, {
  id: "p002",
  title: "Mastering GraphQL",
  body: "Like it",
  published: false,
  author: "u003"
}, {
  id: "p003",
  title: "GraphQL Learning",
  body: "Love it",
  published: true,
  author: "u002"
}, {
  id: "p004",
  title: "GraphQL 101",
  body: "Not Bad",
  published: false,
  author: "u001"
}];
exports.posts = posts;
var comments = [{
  id: "c001",
  text: "Awesome comment",
  post: "p001",
  creator: "u002"
}, {
  id: "c002",
  text: "Liked it",
  post: "p003",
  creator: "u003"
}, {
  id: "c003",
  text: "Nice Post",
  post: "p003",
  creator: "u001"
}, {
  id: "c004",
  text: "Not Bad Post",
  post: "p001",
  creator: "u002"
}];
exports.comments = comments;
//# sourceMappingURL=data.js.map