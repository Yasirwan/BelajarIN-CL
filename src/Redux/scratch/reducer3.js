import * as types from "./types3";
const initialState = {
  load: false,
  error: false,
  scratch3: [],
  singleScratch3: {},
};
export default function scratch3Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.CREATE_SCRATCH3_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_SCRATCH3_SUCCESS:
      return {
        ...state,
        scratch3: [...state.scratch3, payload.scratch3],
      };
    case types.CREATE_SCRATCH3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SCRATCH3_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SCRATCH3_SUCCESS:
      return {
        ...state,
        scratch3: payload.scratch3,
        load: false,
      };
    case types.GET_SCRATCH3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_SCRATCH3_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_SCRATCH3_SUCCESS:
      return {
        ...state,
        singleScratch3: payload.scratch3,
        load: false,
      };
    case types.GET_SINGLE_SCRATCH3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_SCRATCH3_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_SCRATCH3_SUCCESS:
      return {
        ...state,
        scratch3: [...state.scratch3.filter((elem) => elem._id != payload.scratch3Id)],
        load: false,
      };
    case types.DELETE_SCRATCH3_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
      // case types.RESOLVE_SCRATCH_REQUEST:
      //   return {
      //     ...state,
      //     load: true,
      //     error: false,
      //   };
      // case types.RESOLVE_SCRATCH_SUCCESS:
      //   return {
      //     ...state,
      //     scratch: state.scratch.map((elem) => {
      //       if (elem._id == payload.id) {
      //         return payload.scratch;
      //       }
      //       return elem;
      //     }),
      //     load: false,
      //   };
      // case types.RESOLVE_SCRATCH_ERROR:
      //   return {
      //     ...state,
      //     load: false,
      //     error: true,
      //   };
      case types.ADD_SCRATCH3_RESPONSE_REQUEST:
        return {
          ...state,
          load: true,
          error: false,
        };
      case types.ADD_SCRATCH3_RESPONSE_SUCCESS:
        return {
          ...state,
          singleScratch3: payload.scratch3,
          load: false,
        };
      case types.ADD_SCRATCH3_RESPONSE_ERROR:
        return {
          ...state,
          load: false,
          error: true,
        };
      default:
        return state;
    }
}
