import React, { useEffect, useState } from 'react';
import classes from './Orders.module.css'
import NavBar from './NavBar';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    new: true,      // Initially checked
    packed: true,   // Initially checked
    intransit: true, // Initially checked
    delivered: true, // Initially checked
  });

  useEffect(() => {
    // Fetch orders on page load
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  const handleFilterChange = (status) => {
    setFilters({
      ...filters,
      [status]: !filters[status],
    });
  };

  const filteredOrders = orders.filter((order) => {
    if (filters.new && order.orderStatus === 'New') return true;
    if (filters.packed && order.orderStatus === 'Packed') return true;
    if (filters.intransit && order.orderStatus === 'InTransit') return true;
    if (filters.delivered && order.orderStatus === 'Delivered') return true;
    return false;
  });

  return (
    <div className={classes.container}>
        <NavBar/>
      <h1 className={classes.heading}>Orders</h1>
      <div className={classes.filter_options}>
        <label>
          <input
            type="checkbox"
            checked={filters.new}
            onChange={() => handleFilterChange('new')}
          />
          New
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.packed}
            onChange={() => handleFilterChange('packed')}
          />
          Packed
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.intransit}
            onChange={() => handleFilterChange('intransit')}
          />
          InTransit
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.delivered}
            onChange={() => handleFilterChange('delivered')}
          />
          Delivered
        </label>
      </div>
      <table className={classes.order_table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Order Time</th>
            <th>Amount</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody id="order-list">
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.orderDate}</td>
              <td>{order.orderTime}</td>
              <td>{order.amount}</td>
              <td>{order.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
