export const createBookmarkResolver = async (
  parent,
  { input },
  { models, user }
) => {
  const newBookmark = { ...input, createdBy: user.id };
  const bookmark = await models.Bookmark.create(newBookmark);

  return bookmark;
};

export const deleteBookmarkResolver = (parent, { id }, { models }) => {
  let status = false;
  const deleted = models.Bookmark.deleteOne({ _id: id });
  if (deleted) {
    status = true;
  }
  return { id, status };
};

export const updateBookmarkResolver = (parent, { updates, id }, { models }) => {
  return models.Bookmark.findOneAndUpdate({ _id: id }, updates);
};
