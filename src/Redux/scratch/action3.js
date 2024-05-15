import * as types from "./types3.js";
import axios from "axios";
import url from "../../BackendURL.js";

let token = localStorage.getItem("token");

//create scratch3
export const createScratch3 = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_SCRATCH3_REQUEST });
    const res = await axios.post(`${url}/scratch3/create`, { data, token });
    dispatch({
      type: types.CREATE_SCRATCH3_SUCCESS,
      payload: { scratch3: res.data.scratch3 },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_SCRATCH3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//add response
export const addResponse = (id, desc) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_SCRATCH3_RESPONSE_REQUEST });
    const res = await axios.post(`${url}/scratch3/add`, { id, desc });
    dispatch({
      type: types.ADD_SCRATCH3_RESPONSE_SUCCESS,
      payload: { scratch3: res.data.scratch3 },
    });
  } catch (error) {
    dispatch({
      type: types.ADD_SCRATCH3_RESPONSE_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all scratch data
export const getScratch3Data = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SCRATCH3_REQUEST });
    const res = await axios.get(`${url}/scratch3/all`);
    dispatch({
      type: types.GET_SCRATCH3_SUCCESS,
      payload: { scratch3: res.data.scratchs3 },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SCRATCH3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single scratch3 data
export const getSingleScratch3Data = (scratch3Id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_SCRATCH3_REQUEST });
    const res = await axios.get(`${url}/scratch3/${scratch3Id}`);
    dispatch({
      type: types.GET_SINGLE_SCRATCH3_SUCCESS,
      payload: { scratch3: res.data.scratch3 },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_SCRATCH3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete scratch
export const deleteScratch3 = (scratch3Id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_SCRATCH3_REQUEST });
    const res = await axios.delete(`${url}/scratch3/${scratch3Id}`);
    dispatch({
      type: types.DELETE_SCRATCH3_SUCCESS,
      payload: { scratch3Id },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_SCRATCH3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
