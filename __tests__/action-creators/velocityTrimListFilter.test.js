import deepFreeze from 'deep-freeze';
import storeFactory from '../../src/store';
import {
  searchTrims,
  changeGroup,
  changeListView,
} from '../../src/action-creators/velocityTrimListFilter';

describe('sysex actions', () => {
  let store;

  const velocityTrim = {
    sortBy: 'idx',
    showNames: true,
    search: '',
    group: 'all',
    listView: 'medium',
  };

  deepFreeze(velocityTrim);

  describe('searchTrims', () => {
    beforeAll(() => {
      store = storeFactory({ velocityTrim }, false, true);
      store.dispatch(searchTrims('test'));
    });

    it('should succeed', () => {
      expect(store.getState().velocityTrim).toEqual({
        ...velocityTrim,
        search: 'test',
      });
    });
  });

  describe('changeGroup', () => {
    beforeAll(() => {
      store = storeFactory({ velocityTrim }, false, true);
      store.dispatch(changeGroup('snares'));
    });

    it('should succeed', () => {
      expect(store.getState().velocityTrim).toEqual({
        ...velocityTrim,
        group: 'snares',
      });
    });
  });

  describe('changeListView', () => {
    beforeAll(() => {
      store = storeFactory({ velocityTrim }, false, true);
      store.dispatch(changeListView('wide'));
    });

    it('should succeed', () => {
      expect(store.getState().velocityTrim).toEqual({
        ...velocityTrim,
        listView: 'wide',
      });
    });
  });
});
