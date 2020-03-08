// @flow

export const createBookmarkResolver = async (
  parent?: Object,
  args: { input: Object },
  ctx: { models: Object, user: Object }
) => {
  const newBookmark = { ...args.input, createdBy: ctx.user.id };
  const bookmark: Object = await ctx.models.Bookmark.create(newBookmark);

  return bookmark;
};

export const deleteBookmarkResolver = (
  parent?: Object,
  args: { id: String },
  ctx: { models: Object }
) => {
  let status: boolean = false;
  const deleted = ctx.models.Bookmark.deleteOne({ _id: args.id });
  if (deleted) {
    status = true;
  }
  return { id: args.id, status };
};

export const updateBookmarkResolver = (
  parent?: Object,
  args: { id: String, updates: Object },
  ctx: { models: Object }
) => {
  const updatedBookmark: Object = ctx.models.Bookmark.findOneAndUpdate(
    { _id: args.id },
    args.updates
  );
  return updatedBookmark;
};
