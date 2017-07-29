import deepFreeze from 'deep-freeze';
import stompblockMapping from '../../src/stompblock-mapping';
import velocityTrim from '../../src/reducers/velocityTrim';
import * as actions from '../../src/actions';

describe('velocityTrim reducer', () => {
  const formattedMap = () => stompblockMapping.map((item) => {
    const props = /(\d+):([\w\s]+)\|([\w\s]+)/.exec(item);

    return {
      note: parseInt(props[1], 10),
      group: props[2],
      name: props[3],
      trim: 0,
    };
  });

  const initialState = {
    sortBy: 'idx',
    showNames: true,
    search: '',
    group: 'all',
    listView: 'medium',
    data: formattedMap(),
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
      // ...but this really should be zero-indexed, not from one
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
      type: actions.USED_CHANGED_TRIM,
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
      type: actions.USED_CHANGED_TRIM_END,
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
