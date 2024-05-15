import * as types from "./types2.js";
import axios from "axios";
import url from "../../BackendURL.js";

let token = localStorage.getItem("token");

//create scratch2
export const createScratch2 = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_SCRATCH2_REQUEST });
    const res = await axios.post(`${url}/scratch2/create`, { data, token });
    dispatch({
      type: types.CREATE_SCRATCH2_SUCCESS,
      payload: { scratch2: res.data.scratch2 },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_SCRATCH2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//add response
export const addResponse = (id, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_SCRATCH2_RESPONSE_REQUEST });
    const res = await axios.post(`${url}/scratch2/add`, { id, desc });
    dispatch({
      type: types.ADD_SCRATCH2_RESPONSE_SUCCESS,
      payload: { scratch2: res.data.scratch2 },
    });
  } catch (error) {
    dispatch({
      type: types.ADD_SCRATCH2_RESPONSE_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all scratch data
export const getScratch2Data = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SCRATCH2_REQUEST });
    const res = await axios.get(`${url}/scratch2/all`);
    dispatch({
      type: types.GET_SCRATCH2_SUCCESS,
      payload: { scratch2: res.data.scratchs2 },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SCRATCH2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single scratch2 data
export const getSingleScratch2Data = (scratch2Id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_SCRATCH2_REQUEST });
    const res = await axios.get(`${url}/scratch2/${scratch2Id}`);
    dispatch({
      type: types.GET_SINGLE_SCRATCH2_SUCCESS,
      payload: { scratch2: res.data.scratch2 },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_SCRATCH2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete scratch
export const deleteScratch2 = (scratch2Id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_SCRATCH2_REQUEST });
    const res = await axios.delete(`${url}/scratch2/${scratch2Id}`);
    dispatch({
      type: types.DELETE_SCRATCH2_SUCCESS,
      payload: { scratch2Id },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_SCRATCH2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
