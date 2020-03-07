'use strict';

import DataLoader from 'dataloader';
import { batchUserBookmarks } from '../user/dataloader';

export default function allDataLoader(models) {
  return {
    userBookmarks: new DataLoader(keys => batchUserBookmarks(keys, models))
  };
}
