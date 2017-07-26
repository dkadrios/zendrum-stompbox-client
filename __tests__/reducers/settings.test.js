import settings from '../../src/reducers/settings';
import * as actions from '../../src/actions';

describe('settings reducer', () => {
  it('receivedSetting success', () => {
    const state = {};
    const action = {
      type: actions.RECEIVED_MUTE_ENABLED,
      payload: 1,
    };
    const result = settings(state, action);
    expect(result)
      .toEqual({
        muteEnabledAtStart: true,
      });
  });
});
