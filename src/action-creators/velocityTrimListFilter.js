import * as Actions from '../actions';

export const searchTrims = text => ({
  type: Actions.SEARCH_TRIMS,
  payload: text,
});
