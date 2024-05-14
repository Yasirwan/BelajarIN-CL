import * as types from "./types3.js";
import axios from "axios";
import url from "../../BackendURL.js";


let token = localStorage.getItem("token");
//create content
export const createContent3 = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_CONTENT3_REQUEST });
    const res = await axios.post(`${url}/content3/create`, { data, token });
    dispatch({
      type: types.CREATE_CONTENT3_SUCCESS,
      payload: { content3: res.data.content3 },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_CONTENT3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all content data
export const getContent3Data = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CONTENT3_REQUEST });
    const res = await axios.get(`${url}/content3/all`);
    dispatch({
      type: types.GET_CONTENT3_SUCCESS,
      payload: { content3: res.data.content3 },
    });
  } catch (error) {
    dispatch({
      type: types.GET_CONTENT3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single content data
export const getSingleContent3Data = (content3Id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_CONTENT3_REQUEST });
    const res = await axios.get(`${url}/content3/${content3Id}`);
    dispatch({
      type: types.GET_SINGLE_CONTENT3_SUCCESS,
      payload: { content3: res.data.content3 },
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_CONTENT_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//delete content
export const deleteContent3 = (content3Id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CONTENT3_REQUEST });
    const res = await axios.delete(`${url}/content3/${content3Id}`);
    dispatch({
      type: types.DELETE_CONTENT3_SUCCESS,
      payload: { content3Id },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_CONTENT3_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
