import { STOMPBLOCK_FOUND, STOMPBLOCK_MISSING } from '../actions';

export const stompblockFound = () => ({
  type: STOMPBLOCK_FOUND,
});

export const stompblockMissing = () => ({
  type: STOMPBLOCK_MISSING,
});
