// @flow
'use strict';
import utils from '../../shared/utils';

export const bookmarksResolver = async (
  parent?: Object,
  args: Object,
  ctx: { models: Object }
) => {
  const { limit = 25, offset = 0, orderBy = '-createdAt', cursor } = args;
  const cursorOptions = cursor
    ? {
      createdAt: {
        $lt: utils.fromCursorHash(cursor)
      }
    }
    : {};

  const findOptions: { limit: number, sort: string, skip?: number } = {
    limit: limit + 1,
    sort: orderBy
  };
  if (offset) {
    findOptions.skip = offset;
  }

  const list = await ctx.models.Bookmark.find(
    { ...cursorOptions },
    null,
    findOptions
  ).populate('createdBy');

  const listLength = list.length;
  const hasNextPage: boolean = listLength > limit;
  const edges: Array<Object> = hasNextPage ? list.slice(0, -1) : list;
  const endCursor = edges[edges.length - 1]?.createdAt || 0;

  const pageInfo: { hasNextPage: boolean, endCursor: string } = {
    hasNextPage: hasNextPage,
    endCursor: utils.toCursorHash(String(endCursor))
  };

  return { edges, pageInfo };
};

export const bookmarkResolver = async (
  parent?: Object,
  args: { id: string },
  ctx: { models: Object }
) => {
  const bookmark: Object = await ctx.models.Bookmark.findById(args.id).populate(
    'createdBy'
  );

  return bookmark;
};
