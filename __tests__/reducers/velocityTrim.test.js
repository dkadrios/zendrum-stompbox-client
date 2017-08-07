import deepFreeze from 'deep-freeze';
import stompblock from '../../src/mappings/stompblock';
import velocityTrim from '../../src/reducers/velocityTrim';
import * as actions from '../../src/actions';

describe('velocityTrim reducer', () => {
  const initialState = {
    sortBy: 'idx',
    showNames: true,
    search: '',
    group: 'all',
    listView: 'medium',
    data: stompblock,
  };
  deepFreeze(initialState);

  it('receivedAllTrims success', () => {
    let action = {
      type: actions.RECEIVED_ALL_TRIMS,
      payload: [],
    };
    expect(velocityTrim(initialState, action).data)
      .toContainEqual({
        group: 'Perc',
        name: 'Tumba Thump',
        note: 1,
        trim: undefined,
      });

    action = {
      type: actions.RECEIVED_ALL_TRIMS,
      // Not arguing, because the app is working fine as-is...
      // ...but this really should be zero-indexed and not starting at one
      payload: [0, 77],
    };
    expect(velocityTrim(initialState, action).data)
      .toContainEqual({
        group: 'Perc',
        name: 'Tumba Thump',
        note: 1,
        trim: 77,
      });
  });

  it('userChangedTrim success', () => {
    const action = {
      type: actions.USER_CHANGED_TRIM,
      payload: {
        noteNum: 1,
        value: 66,
      },
    };
    expect(velocityTrim(initialState, action).data)
      .toContainEqual({
        group: 'Perc',
        name: 'Tumba Thump',
        note: 1,
        trim: 66,
      });
  });

  it('userChangedTrim end success', () => {
    const action = {
      type: actions.USER_CHANGED_TRIM_END,
      payload: {
        noteNum: 1,
        value: 66,
      },
    };
    expect(velocityTrim(initialState, action).data)
      .toContainEqual({
        group: 'Perc',
        name: 'Tumba Thump',
        note: 1,
        trim: 66,
      });
  });

  it('searchTrims success', () => {
    const action = {
      type: actions.SEARCH_TRIMS,
      payload: 'search text',
    };
    expect(velocityTrim(initialState, action))
      .toEqual({
        ...initialState,
        search: 'search text',
      });
  });

  it('selectTrim success', () => {
    const action = {
      type: actions.SELECT_TRIM,
      payload: 10,
    };
    expect(velocityTrim(initialState, action))
      .toEqual({
        ...initialState,
        selectedNoteNum: 10,
      });
  });

  it('changeGroup success', () => {
    const action = {
      type: actions.CHANGE_GROUP,
      payload: 'new group',
    };
    expect(velocityTrim(initialState, action))
      .toEqual({
        ...initialState,
        group: 'new group',
      });
  });

  it('changeListView success', () => {
    const action = {
      type: actions.CHANGE_LIST_VIEW,
      payload: 'new view',
    };
    expect(velocityTrim(initialState, action))
      .toEqual({
        ...initialState,
        listView: 'new view',
      });
  });
});
