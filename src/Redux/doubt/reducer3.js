import * as types from "./types3";
const initialState = {
  load: false,
  error: false,
  doubt3: [],
  singleDoubt3: {},
};
export default function doubt3Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.CREATE_DOUBT3_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_DOUBT3_SUCCESS:
      return {
        ...state,
        doubt3: [...state.doubt3, payload.doubt3],
      };
    case types.CREATE_DOUBT3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_DOUBT3_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_DOUBT3_SUCCESS:
      return {
        ...state,
        doubt3: payload.doubt3,
        load: false,
      };
    case types.GET_DOUBT3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_DOUBT3_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_DOUBT3_SUCCESS:
      return {
        ...state,
        singleDoubt3: payload.doubt3,
        load: false,
      };
    case types.GET_SINGLE_DOUBT3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_DOUBT3_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_DOUBT3_SUCCESS:
      return {
        ...state,
        doubt3: [...state.doubt3.filter((elem) => elem._id != payload.doubt3Id)],
        load: false,
      };
    case types.DELETE_DOUBT3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };

    case types.RESOLVE_DOUBT3_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.RESOLVE_DOUBT3_SUCCESS:
      return {
        ...state,
        doubt3: state.doubt3.map((elem) => {
          if (elem._id == payload.id) {
            return payload.doubt3;
          }
          return elem;
        }),
        load: false,
      };
    case types.RESOLVE_DOUBT3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.ADD_DOUBT3_RESPONSE_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.ADD_DOUBT3_RESPONSE_SUCCESS:
      return {
        ...state,
        singleDoubt3: payload.doubt3,
        load: false,
      };
    case types.ADD_DOUBT3_RESPONSE_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    default:
      return state;
  }
}
