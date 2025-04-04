import { createSlice } from '@reduxjs/toolkit'

export const deliveryPointsReducer = createSlice({
  name: 'deliveryPoints',
  initialState: {
    deliveryPoints: [],
    deliveryPoint: {},
    orders: [],
    loading: false
  },
  reducers: {
    loadDeliveryPoints: (state, action) => {
      state.deliveryPoints = action.payload;
    },
    loadDeliveryPoint: (state, { payload }) => {
      state.deliveryPoint = payload;
    },
    onAddNewDeliveryPoint: (state, { payload }) => {
      state.deliveryPoint = payload;
    },
    deleteDeliveryPoint: (state, { payload }) => {
      state.deliveryPoints = state.deliveryPoints.filter(branch => branch._id !== _id);
    },
    editDeliveryPoint: ( state, { payload } ) => {
      state.deliveryPoints = state.deliveryPoints.map(branch => {
        if (branch._id === payload._id) {
          return {
            ...branch,
            name: payload.name,
          };
        }
        return branch; // Mantener los elementos no modificados tal como están
      });
    },  
    toggleBranch : (state, { payload }) => {
      state.deliveryPoints = state.deliveryPoints.map((branch) => {
        if(branch._id === payload._id){
          return { 
            ...branch,
            activated: payload.activated
          }
        }
        return branch;
      })
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    }, 
    resetDeliveryPoint: (state) => {
      state.deliveryPoint = {}
    },
    setOrdersByDeliveryPoint: (state, {payload}) => {
      state.orders = payload
    },
    onUpdateOrders: (state, {payload}) => {
      state.orders = state.orders.map((i)=>{
        if (i._id === payload._id) {
          return{
            ...payload
          }
        }
        return i
      })
    },
    onDeleteOrder: (state, {payload}) => {
      state.orders = state.orders.filter((i)=>i._id !== payload._id)
    },
    deleteDeliveryPointImage: (state, {payload}) => {
      state.deliveryPoint.images = state.deliveryPoint.images.filter(image=> image._id !== payload)
    }
  }
  })

export const { loadDeliveryPoints, loadDeliveryPoint, onAddNewDeliveryPoint, deleteDeliveryPoint, editDeliveryPoint, resetDeliveryPoint, setLoading, toggleBranch, setOrdersByDeliveryPoint, deleteDeliveryPointImage, onUpdateOrders, onDeleteOrder } = deliveryPointsReducer.actions;

export default deliveryPointsReducer.reducer;