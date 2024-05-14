import * as types from "./types3";
const initialState = {
  load: false,
  error: false,
  content3: [],
  singleContent3: {},
};
export default function content3Reducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case types.CREATE_CONTENT3_ERROR:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_CONTENT3_SUCCESS:
      return {
        ...state,
        content3: [...state.content3, payload.content3],
      };
    case types.CREATE_CONTENT3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_CONTENT3_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_CONTENT3_SUCCESS:
      return {
        ...state,
        content3: payload.content3,
        load: false,
      };
    case types.GET_CONTENT3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_CONTENT3_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_CONTENT3_SUCCESS:
      return {
        ...state,
        singleContent3: payload.content3,
        load: false,
      };
    case types.GET_SINGLE_CONTENT3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_CONTENT3_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_CONTENT3_SUCCESS:
      return {
        ...state,
        content3: [
          ...state.content3.filter((elem) => elem._id != payload.content3Id),
        ],
        load: false,
      };
    case types.DELETE_CONTENT3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
