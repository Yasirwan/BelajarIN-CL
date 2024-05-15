import * as types from "./types2";
const initialState = {
  load: false,
  error: false,
  doubt2: [],
  singleDoubt2: {},
};
export default function doubt2Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.CREATE_DOUBT2_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_DOUBT2_SUCCESS:
      return {
        ...state,
        doubt2: [...state.doubt2, payload.doubt2],
      };
    case types.CREATE_DOUBT2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_DOUBT2_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_DOUBT2_SUCCESS:
      return {
        ...state,
        doubt2: payload.doubt2,
        load: false,
      };
    case types.GET_DOUBT2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_DOUBT2_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_DOUBT2_SUCCESS:
      return {
        ...state,
        singleDoubt2: payload.doubt2,
        load: false,
      };
    case types.GET_SINGLE_DOUBT2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_DOUBT2_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_DOUBT2_SUCCESS:
      return {
        ...state,
        doubt2: [...state.doubt2.filter((elem) => elem._id != payload.doubt2Id)],
        load: false,
      };
    case types.DELETE_DOUBT2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };

    case types.RESOLVE_DOUBT2_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.RESOLVE_DOUBT2_SUCCESS:
      return {
        ...state,
        doubt2: state.doubt2.map((elem) => {
          if (elem._id == payload.id) {
            return payload.doubt2;
          }
          return elem;
        }),
        load: false,
      };
    case types.RESOLVE_DOUBT2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.ADD_DOUBT2_RESPONSE_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.ADD_DOUBT2_RESPONSE_SUCCESS:
      return {
        ...state,
        singleDoubt2: payload.doubt2,
        load: false,
      };
    case types.ADD_DOUBT2_RESPONSE_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
