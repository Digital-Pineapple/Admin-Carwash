import { useDispatch, useSelector } from "react-redux";
import {
  LoadOneProductOrder,
  StartCompleteProductOrder,
  StartLoadResumeSales,
  StartLoadVerifyQr,
  StartLoadVerifyToPoint,
  startLoadAssignRoute,
  startLoadAssignedPO,
  startLoadPOOutOfRegion,
  startLoadPOPaidAndSupply,
  startLoadPOPaidAndSupplyToPonit,
  startLoadPackageSent,
  startLoadPendingTransfer,
  startLoadPrintOrderPDF,
  startLoadProductOrders,
  startLoadProductOrdersPaid,
  startLoadProductOrdersPaidAndFill,
  startLoadReadyToDelivery,
  startLoadReadyToPoint,
  startLoadRoutesDelivery,
  startLoadVerifyPackage,
  startLoadVerifyStartRoute,
  startRejectTicket,
  startValidateSale,
} from "../store/actions/productOrderActions";
import { useNavigate } from "react-router-dom";

export const useProductOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { productOrders, productOrder, isLoading, resumeOrders, readyToPoint, readyToDelivery } = useSelector(
    (state) => state.allProductOrders
  );
  const { loading } = useSelector(
    (state) => state.ui
  );



  const loadProductOrders = async () => dispatch(startLoadProductOrders());

  const loadProductOrdersPaid = async () =>
    dispatch(startLoadProductOrdersPaid());

  const loadProductOrdersPaidAndFill = async () =>
    dispatch(startLoadProductOrdersPaidAndFill());

  const loadPOPaidAndSuplyToPoint = async () =>
    dispatch(startLoadPOPaidAndSupplyToPonit());

  const loadPOPaidAndSuply = async () =>dispatch(startLoadPOPaidAndSupply())
  
  const loadAssignedPO = async () =>
    dispatch(startLoadAssignedPO())


  const loadAssignRoute = async (values, handleClose) =>
    dispatch(startLoadAssignRoute(values,handleClose, navigate));

  const loadVerifyStartRoute = async (values) =>
    dispatch(startLoadVerifyStartRoute(values, navigate));

  const loadProductOrder = async (id) => dispatch(LoadOneProductOrder(id));

  const loadVerifyQR = async (values, callbackClose) => dispatch(StartLoadVerifyQr(values, callbackClose));

  const loadVerifyQRtoPoint = async (values, callbackCloseModal) => dispatch(StartLoadVerifyToPoint(values, callbackCloseModal));

  const loadResumeProductOrder = async () => dispatch(StartLoadResumeSales());

  const loadPackagesSent = async () => dispatch(startLoadPackageSent())

  const loadReadyToPoint = async () => dispatch(startLoadReadyToPoint())

  const loadReadyToDelivery = async () => dispatch(startLoadReadyToDelivery())

  const loadPrintPDFOrder = async (id) => dispatch(startLoadPrintOrderPDF(id))

  const loadVerifyPackage = async (id) =>dispatch(startLoadVerifyPackage(id))

  const loadPOOutOfRegions = async () =>dispatch(startLoadPOOutOfRegion())
  const loadRoutesDelivery = async (myCoords) =>dispatch(startLoadRoutesDelivery(myCoords))

  const validateSale = async (values) => dispatch(startValidateSale(values, navigate))
  const rejectTicket = async (values) => dispatch(startRejectTicket(values, navigate))
  const loadPendingTransferPO = async () => dispatch(startLoadPendingTransfer()) 
  const completeProductOrder = (id) =>
    dispatch(StartCompleteProductOrder(id, navigate));

  const rowsProducts = () => {
    const products = productOrder?.products;
    return products?.map((product, index) => {
      
      return {
        ...product.item,
        id: index.toString(),
        quantity: product.quantity,
        subTotal: product.quantity * product.item.price,
        image : product?.item?.images[0]?.url ? product.item?.images[0].url : 'no hay imagen'
      };
    });
  };
  const rowsWithIds = productOrders.map((item, index) => {
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual;
    }, 0);

    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      ...item,
    };
  });


  return {
    dispatch,
    navigate,
    rowsProducts,
    loadProductOrdersPaid,
    loadPOPaidAndSuplyToPoint,
    loadPOPaidAndSuply,
    loadAssignRoute,
    loadResumeProductOrder,
    productOrder,
    productOrders,
    isLoading,
    loadProductOrders,
    loadProductOrder,
    resumeOrders,
    completeProductOrder,
    loadAssignedPO,
    loadVerifyStartRoute,
    loadPackagesSent,
    loadVerifyQR,
    loadVerifyQRtoPoint,
    loading,
    loadPrintPDFOrder,
    loadPendingTransferPO,
    rowsProducts,
    rowsWithIds,
    validateSale, 
    rejectTicket,
    loadVerifyPackage,
    loadReadyToPoint,
    readyToPoint,
    loadProductOrdersPaidAndFill,
    loadReadyToDelivery,
    readyToDelivery,
    loadRoutesDelivery
    
  };
};
