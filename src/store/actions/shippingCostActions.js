import { enqueueSnackbar } from "notistack";
import { instanceApi } from "../../apis/configAxios";
import { deleteShippingCost, editShippingCost, loadOneShippingCost, loadShippingCosts, onAddNewShippingCost } from "../reducer/shippingCostReducer";
import {headerConfig} from './headers'
import { Zoom } from "@mui/material";
import { startLoading, stopLoading } from "../reducer/uiReducer";

export const startLoadShippingCosts = () => {
  return async (dispatch) => {
    dispatch(startLoading())
    try {
      const { data } = await instanceApi.get(`/shipping-cost`, {
        headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      });
      dispatch(loadShippingCosts(data.data));
      dispatch(stopLoading())
    } catch (error) {
      enqueueSnackbar(`${error.response.data.message}`,{
        anchorOrigin:{
          horizontal:'center',
          vertical:'top'
        },
        autoHideDuration:1000,
        variant:'error',
        TransitionComponent:Zoom,
      })
      dispatch(stopLoading())
    }
  }
}

export const startLoadOneShippingCost = (id, navigate) => {
    return async (dispatch) => {
      try {
        const { data } = await instanceApi.get(`/shipping-cost/${id}`, {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        });
        dispatch(loadOneShippingCost(data.data));
      } catch (error) {
        enqueueSnackbar(`${(error.response.data.message)}`, "error");
      }
    };
  };

  export const startCreateShippingCost = (values, navigate, handleCloseModal) => {
    return async (dispatch) => {
      dispatch(startLoading())
      try {
        const { data } = await instanceApi.post(`/shipping-cost`, {values:values}, {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        } );
        enqueueSnackbar(`${data.message}`,{
          anchorOrigin:{
            horizontal:'center',
            vertical:'top'
          },
          autoHideDuration:3000,
          variant:'success',
          TransitionComponent:Zoom,
        })       
        dispatch(onAddNewShippingCost(data.data))
        dispatch(stopLoading())
        handleCloseModal()
      } catch (error) {
        
        enqueueSnackbar(`${error.response.data.message}`,{
          anchorOrigin:{
            horizontal:'center',
            vertical:'top'
          },
          autoHideDuration:3000,
          variant:'error',
          TransitionComponent:Zoom,
        })
        dispatch(stopLoading())
      }
    };
  };
  export const startUpdateShippingCost = (id,values, handleCloseModal) => {
    return async (dispatch) => {
      try {
        const { data } = await instanceApi.put(`/shipping-cost/${id}`, 
           {values:values}, {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        } );
        dispatch(editShippingCost(data.data));
        enqueueSnackbar(`${data.message}`,{
          anchorOrigin:{
            horizontal:'center',
            vertical:'top'
          },
          autoHideDuration:3000,
          variant:'success',
          TransitionComponent:Zoom,
        })
        handleCloseModal()
      } catch (error) {
        enqueueSnackbar(`${error.response.data.message}`,{
          anchorOrigin:{
            horizontal:'center',
            vertical:'top'
          },
          autoHideDuration:3000,
          variant:'error',
          TransitionComponent:Zoom,
        })
      }
    };
  };

  export const startDeleteShippingCost = (id) => {
    return async (dispatch) => {
        dispatch(startLoading())
      try {
        const { data } = await instanceApi.delete(`/shipping-cost/${id}`, {
          headers: {
            "Content-type": "application/json",
             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        } );
        enqueueSnackbar(`${data.message}`,{
          anchorOrigin:{
            horizontal:'center',
            vertical:'top'
          },
          autoHideDuration:1000,
          variant:'success',
          TransitionComponent:Zoom,
        })
        dispatch(deleteShippingCost(data.data));
        dispatch(stopLoading())
      } catch (error) {
        enqueueSnackbar(`${error.response.data.message}`,{
          anchorOrigin:{
            horizontal:'center',
            vertical:'top'
          },
          autoHideDuration:1000,
          variant:'error',
          TransitionComponent:Zoom,
        })
        dispatch(stopLoading())
      }
    };
  };
