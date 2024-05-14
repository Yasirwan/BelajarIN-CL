import * as types from "./types2.js";
import axios from "axios";
import url from "../../BackendURL.js";


let token = localStorage.getItem("token");
//create content
export const createContent2 = (data) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_CONTENT2_REQUEST });
    const res = await axios.post(`${url}/content2/create`, { data, token });
    dispatch({
      type: types.CREATE_CONTENT2_SUCCESS,
      payload: { content2: res.data.content2 },
    });
    return res.data;
  } catch (error) {
    dispatch({
      type: types.CREATE_CONTENT2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get all content data
export const getContent2Data = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CONTENT2_REQUEST });
    const res = await axios.get(`${url}/content2/all`);
    dispatch({
      type: types.GET_CONTENT2_SUCCESS,
      payload: { content2: res.data.content2 },
    });
  } catch (error) {
    dispatch({
      type: types.GET_CONTENT2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};

//get single content data
export const getSingleContent2Data = (content2Id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_SINGLE_CONTENT2_REQUEST });
    const res = await axios.get(`${url}/content2/${content2Id}`);
    dispatch({
      type: types.GET_SINGLE_CONTENT2_SUCCESS,
      payload: { content2: res.data.content2 },
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
export const deleteContent2 = (content2Id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CONTENT2_REQUEST });
    const res = await axios.delete(`${url}/content2/${content2Id}`);
    dispatch({
      type: types.DELETE_CONTENT2_SUCCESS,
      payload: { content2Id },
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_CONTENT2_ERROR,
      payload: {
        message: "error",
      },
    });
  }
};
