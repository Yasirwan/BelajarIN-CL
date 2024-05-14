import * as types from "./types2";
const initialState = {
  load: false,
  error: false,
  content2: [],
  singleContent2: {},
};
export default function content2Reducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case types.CREATE_CONTENT2_ERROR:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_CONTENT2_SUCCESS:
      return {
        ...state,
        content2: [...state.content2, payload.content2],
      };
    case types.CREATE_CONTENT2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_CONTENT2_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_CONTENT2_SUCCESS:
      return {
        ...state,
        content2: payload.content2,
        load: false,
      };
    case types.GET_CONTENT2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_CONTENT2_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_CONTENT2_SUCCESS:
      return {
        ...state,
        singleContent2: payload.content2,
        load: false,
      };
    case types.GET_SINGLE_CONTENT2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_CONTENT2_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_CONTENT2_SUCCESS:
      return {
        ...state,
        content2: [
          ...state.content2.filter((elem) => elem._id != payload.content2Id),
        ],
        load: false,
      };
    case types.DELETE_CONTENT2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
