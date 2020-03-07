import utils from '../../shared/utils';

export const bookmarksResolver = async (parent, args, { models }) => {
  const { limit = 25, offset = 0, orderBy = '-createdAt', cursor } = args;
  const cursorOptions = cursor
    ? {
      createdAt: {
        $lt: utils.fromCursorHash(cursor)
      }
    }
    : {};

  const findOptions = { limit: limit + 1, sort: orderBy };
  if (offset) {
    findOptions.skip = offset;
  }

  const list = await models.Bookmark.find(
    { ...cursorOptions },
    null,
    findOptions
  ).populate('createdBy');

  const listLength = list.length;
  const hasNextPage = listLength > limit;
  const edges = hasNextPage ? list.slice(0, -1) : list;
  const endCursor = edges[edges.length - 1]?.createdAt || 0;

  const pageInfo = {
    hasNextPage,
    endCursor: utils.toCursorHash(String(endCursor))
  };

  return { edges, pageInfo };
};

export const bookmarkResolver = async (parent, { id }, { models }) => {
  const bookmark = await models.Bookmark.findById(id).populate('createdBy');

  return bookmark;
};
