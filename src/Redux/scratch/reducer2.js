import * as types from "./types2";
const initialState = {
  load: false,
  error: false,
  scratch2: [],
  singleScratch2: {},
};
export default function scratch2Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.CREATE_SCRATCH2_REQUEST:
      return {
        ...state,
        error: false,
      };

    case types.CREATE_SCRATCH2_SUCCESS:
      return {
        ...state,
        scratch2: [...state.scratch2, payload.scratch2],
      };
    case types.CREATE_SCRATCH2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SCRATCH2_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SCRATCH2_SUCCESS:
      return {
        ...state,
        scratch2: payload.scratch2,
        load: false,
      };
    case types.GET_SCRATCH2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.GET_SINGLE_SCRATCH2_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.GET_SINGLE_SCRATCH2_SUCCESS:
      return {
        ...state,
        singleScratch2: payload.scratch2,
        load: false,
      };
    case types.GET_SINGLE_SCRATCH2_ERROR:
      return {
        ...state,
        load: false,
        error: true,
      };
    case types.DELETE_SCRATCH2_REQUEST:
      return {
        ...state,
        load: true,
        error: false,
      };
    case types.DELETE_SCRATCH2_SUCCESS:
      return {
        ...state,
        scratch2: [...state.scratch2.filter((elem) => elem._id != payload.scratch2Id)],
        load: false,
      };
    case types.DELETE_SCRATCH2_ERROR:
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
      case types.ADD_SCRATCH2_RESPONSE_REQUEST:
        return {
          ...state,
          load: true,
          error: false,
        };
      case types.ADD_SCRATCH2_RESPONSE_SUCCESS:
        return {
          ...state,
          singleScratch2: payload.scratch2,
          load: false,
        };
      case types.ADD_SCRATCH2_RESPONSE_ERROR:
        return {
          ...state,
          load: false,
          error: true,
        };
      default:
        return state;
    }
}
