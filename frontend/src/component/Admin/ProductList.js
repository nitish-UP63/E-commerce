import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  useEffect(() => {
      if(error){
          alert.error(error);
          dispatch(clearErrors());
      }

      dispatch(getAdminProduct());
  },[dispatch,alert,error]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
        field: "price",
        headerName: "Price",
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },
      {
        field: "actions",
        flex:0.3,
        headerName: "Actions",
        type: "number",
        minWidth: 150,
        sortable: false,
        renderCell: (params) => {
            return (
                <Fragment>
                    <Link to={`/admin/product/${params.getValue(params.id,"id")}`} >
                    <EditIcon />

                    </Link>
                    <Button>
                        <DeleteIcon/>
                    </Button>
                </Fragment>
            )
        }
      },
  ];

const rows = [];
products && products.forEach((item) => {
    rows.push({
        id:item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
    })
})

  return <Fragment>
  <MetaData title={"ALL PRODUCTS - ADMIN"} />

  <div className="dashboard">
  <SideBar />
  <div className="productListContainer">
  <h1 id="productListHeading">ALL PRODUCTS</h1>

  <DataGrid 
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      className="productListTable"
      autoHeight
  />


  </div>

  </div>
  </Fragment>;
};

export default ProductList;
