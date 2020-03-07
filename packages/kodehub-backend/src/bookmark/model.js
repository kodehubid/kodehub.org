'use strict';

import mongoose from 'mongoose';
const bookmarkSchema = new mongoose.Schema({
  bookmarkCategory: {
    type: String,
    default: 'POST',
    enum: ['POST']
  },
  bookmarkTitle: {
    type: String,
    required: true
  },
  bookmarkDescription: {
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
