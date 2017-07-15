import { TEST } from '../actions';

export function testHandler(payload) {
  return {
    type: TEST,
    payload,
  };
}

export function testHandler2(payload) {
  return {
    type: TEST,
    payload,
  };
}
