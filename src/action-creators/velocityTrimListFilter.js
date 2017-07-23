import * as Actions from '../actions';

export const searchTrims = text => ({
  type: Actions.SEARCH_TRIMS,
  payload: text,
});

export const changeGroup = group => ({
  type: Actions.CHANGE_GROUP,
  payload: group,
});

export const changeListView = view => ({
  type: Actions.CHANGE_LIST_VIEW,
  payload: view,
});
