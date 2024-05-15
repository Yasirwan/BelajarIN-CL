import * as types from "./types3.js";
import axios from "axios";
import url from "../../BackendURL.js";

//create doubt
export const createDoubt3 = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_DOUBT3_REQUEST });
    const res = await axios.post(`${url}/doubt3/create`, data);
    dispatch({
      type: types.CREATE_DOUBT3_SUCCESS,
      payload: { doubt3: res.data.doubt3 },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_DOUBT3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//add response
export const addResponse = (id, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_DOUBT3_RESPONSE_REQUEST });
    const res = await axios.post(`${url}/doubt3/add`, { id, desc });
    console.log('Permintaan POST dikirim ke:', `${url}/doubt3/add`);
    dispatch({
      type: types.ADD_DOUBT3_RESPONSE_SUCCESS,
      payload: { doubt3: res.data.doubt3 },
    });
  } catch (error) {
    dispatch({
      type: types.ADD_DOUBT3_RESPONSE_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all doubts data
export const getDoubt3Data = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOUBT3_REQUEST });
    const res = await axios.get(`${url}/doubt3/all`);
    dispatch({
      type: types.GET_DOUBT3_SUCCESS,
      payload: { doubt3: res.data.doubt3 },
    });
  } catch (error) {
    dispatch({
      type: types.GET_DOUBT3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single doubt data
export const getSingleDoubt3Data = (doubt3Id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_DOUBT3_REQUEST });
    const res = await axios.get(`${url}/doubt3/${doubt3Id}`);
    dispatch({
      type: types.GET_SINGLE_DOUBT3_SUCCESS,
      payload: { doubt3: res.data.doubt3 },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_DOUBT3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete doubt
export const deleteDoubt3 = (doubt3Id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_DOUBT3_REQUEST });
    const res = await axios.delete(`${url}/doubt3/${doubt3Id}`);
    dispatch({
      type: types.DELETE_DOUBT3_SUCCESS,
      payload: { doubt3Id },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_DOUBT3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//resolve doubt
export const resolveDoubt3 = (doubt3Id) => async (dispatch) => {
  try {
    dispatch({ type: types.RESOLVE_DOUBT3_REQUEST });
    const res = await axios.patch(`${url}/doubt3/${doubt3Id}`, {
      resolved: "Yes",
    });
    dispatch({
      type: types.RESOLVE_DOUBT3_SUCCESS,
      payload: { id: doubt3Id, doubt3: res.data.doubt3 },
    });
  } catch (error) {
    dispatch({
      type: types.RESOLVE_DOUBT3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
