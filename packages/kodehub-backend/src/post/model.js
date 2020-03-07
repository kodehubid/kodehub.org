'use strict';

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  subforum: {
    type: String,
    default: 'POST',
    enum: ['diskusi', 'sharing', 'challenge', 'event']
  },
  title: {
    type: String,
    required: true,
    maxlength: 500
  },
  content: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  coverImage: {
    type: String
  },
  bookmarkSlug: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);
export default Post;
