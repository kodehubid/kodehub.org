'use strict';

export const batchUserBookmarks = async (keys, models) => {
  const dataList = await models.Bookmark.find({
    createdBy: {
      $in: keys
    }
  });
  const dataMap = dataList.reduce((acc, bookmark) => {
    acc[bookmark.createdBy] = [...(acc[bookmark.createdBy] || []), bookmark];
    return acc;
  }, {});
  return keys.map(key => dataMap[key]);
};
