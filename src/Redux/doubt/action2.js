import * as types from "./types2.js";
import axios from "axios";
import url from "../../BackendURL.js";

//create doubt
export const createDoubt2 = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_DOUBT2_REQUEST });
    const res = await axios.post(`${url}/doubt2/create`, data);
    dispatch({
      type: types.CREATE_DOUBT2_SUCCESS,
      payload: { doubt2: res.data.doubt2 },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_DOUBT2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//add response
export const addResponse = (id, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_DOUBT2_RESPONSE_REQUEST });
    const res = await axios.post(`${url}/doubt2/add`, { id, desc });
    dispatch({
      type: types.ADD_DOUBT2_RESPONSE_SUCCESS,
      payload: { doubt2: res.data.doubt2 },
    });
  } catch (error) {
    dispatch({
      type: types.ADD_DOUBT2_RESPONSE_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all doubts data
export const getDoubt2Data = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_DOUBT2_REQUEST });
    const res = await axios.get(`${url}/doubt2/all`);
    dispatch({
      type: types.GET_DOUBT2_SUCCESS,
      payload: { doubt2: res.data.doubt2 },
    });
  } catch (error) {
    dispatch({
      type: types.GET_DOUBT2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single doubt data
export const getSingleDoubt2Data = (doubt2Id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_DOUBT2_REQUEST });
    const res = await axios.get(`${url}/doubt2/${doubt2Id}`);
    dispatch({
      type: types.GET_SINGLE_DOUBT2_SUCCESS,
      payload: { doubt2: res.data.doubt2 },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_DOUBT2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete doubt
export const deleteDoubt2 = (doubt2Id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_DOUBT2_REQUEST });
    const res = await axios.delete(`${url}/doubt2/${doubt2Id}`);
    dispatch({
      type: types.DELETE_DOUBT2_SUCCESS,
      payload: { doubt2Id },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_DOUBT2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//resolve doubt
export const resolveDoubt2 = (doubt2Id) => async (dispatch) => {
  try {
    dispatch({ type: types.RESOLVE_DOUBT2_REQUEST });
    const res = await axios.patch(`${url}/doubt2/${doubt2Id}`, {
      resolved: "Yes",
    });
    dispatch({
      type: types.RESOLVE_DOUBT2_SUCCESS,
      payload: { id: doubt2Id, doubt2: res.data.doubt2 },
    });
  } catch (error) {
    dispatch({
      type: types.RESOLVE_DOUBT2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
