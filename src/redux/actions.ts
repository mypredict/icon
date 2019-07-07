import {
  BULK_EDIT,
  SELECT_ALL
} from './actionTypes';

// 批量编辑状态控制
export const bulkEditCreator: Function = (status: boolean): object => ({
  type: BULK_EDIT,
  data: status
});

// 全选控制
export const selectAllCreator: Function = (status: boolean): object => ({
  type: SELECT_ALL,
  data: status
});
