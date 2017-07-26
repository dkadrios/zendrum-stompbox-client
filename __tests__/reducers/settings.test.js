import deepFreeze from 'deep-freeze';
import settings from '../../src/reducers/settings';
import * as actions from '../../src/actions';

describe('settings reducer', () => {
  const initialState = {
    muteEnabledAtStart: false,
    thruEnabledAtStart: true,
    muteGroupsEnabled: true,
    showResetDialog: false,
    resetInProcess: false,
  };
  deepFreeze(initialState);

  it('receivedSetting success', () => {
    let action = {
      type: actions.RECEIVED_MUTE_ENABLED,
      payload: 1,
    };
    expect(settings(initialState, action))
      .toEqual({
        ...initialState,
        muteEnabledAtStart: true,
      });

    action = {
      type: actions.RECEIVED_THRU_ENABLED,
      payload: 0,
    };
    expect(settings(initialState, action))
      .toEqual({
        ...initialState,
        thruEnabledAtStart: false,
      });

    action = {
      type: actions.RECEIVED_MUTE_GROUPS_ENABLED,
      payload: 0,
    };
    expect(settings(initialState, action))
      .toEqual({
        ...initialState,
        muteGroupsEnabled: false,
      });
  });

  it('settingSetting success', () => {
    let action = {
      type: actions.SET_MUTE_ENABLED,
      payload: true,
    };
    expect(settings(initialState, action))
      .toEqual({
        ...initialState,
        muteEnabledAtStart: true,
      });

    action = {
      type: actions.SET_THRU_ENABLED,
      payload: false,
    };
    expect(settings(initialState, action))
      .toEqual({
        ...initialState,
        thruEnabledAtStart: false,
      });

    action = {
      type: actions.SET_MUTE_GROUPS_ENABLED,
      payload: false,
    };
    expect(settings(initialState, action))
      .toEqual({
        ...initialState,
        muteGroupsEnabled: false,
      });
  });

  it('confirmFactoryReset success', () => {
    let action = {
      type: actions.CONFIRM_FACTORY_RESET,
      payload: true,
    };
    expect(settings(initialState, action))
      .toEqual({
        ...initialState,
        showResetDialog: true,
        resetInProcess: false,
      });

    action = {
      type: actions.CONFIRM_FACTORY_RESET,
      payload: false,
    };
    expect(settings(initialState, action))
      .toEqual({
        ...initialState,
        showResetDialog: false,
        resetInProcess: false,
      });
  });

  it('resetBeingPerformed success', () => {
    const action = {
      type: actions.FACTORY_RESET,
    };
    expect(settings(initialState, action))
      .toEqual({
        ...initialState,
        showResetDialog: false,
        resetInProcess: true,
      });
  });

  it('factoryResetPerformed success', () => {
    const action = {
      type: actions.RECEIVED_ALL_TRIMS,
    };
    expect(settings(initialState, action))
      .toEqual({
        ...initialState,
        showResetDialog: false,
        resetInProcess: false,
      });
  });
});
