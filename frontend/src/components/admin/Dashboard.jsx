import { Fragment, React, useEffect } from 'react';
import Sidebar from './Sidebar';
import './dashboard.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProduct } from '../../actions/productAction';
import { Navbar } from '../Main/Homepage/Navbar';
//import { Doughnut, Line } from 'react-chartjs-2';
const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

  // const lineState = {
  //   lables: ['Initial Amount', 'Amount Earned'],
  //   datasets: [
  //     {
  //       label: 'TOTAL AMOUNT',
  //       backgroundcolor: ['tomato'],
  //       hoverBackgroundColor: ['rgb(197,72,49)'],
  //       data: [0, 4000],
  //     },
  //   ],
  // };
  return (
    <Fragment>
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> Rs.20000
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>

              <Link to="/admin/orders">
                <p>Orders</p>
                <p>4</p>
              </Link>

              <Link to="/admin/users">
                <p>Users</p>
                <p>2</p>
              </Link>
            </div>
          </div>
          {/* <div className="lineChart">
          <Line data={lineState} />
        </div> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
