import React, { useEffect, useState } from 'react';
import classes from './Product.module.css';
import NavBar from './NavBar';

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.medicineName}</td>
      <td>{product.medicineBrand}</td>
      <td>{product.expiryDate}</td>
      <td>{product.unitPrice}</td>
      <td>{product.stock}</td>
    </tr>
  );
}

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    expired: false,
    lowStock: false,
  });

  useEffect(() => {
    // Fetch products on page load
    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const currentDate = new Date();
    const expiryDate = new Date(product.expiryDate);
    const isExpired = expiryDate < currentDate;
    const isLowStock = product.stock < 100;

    if (filters.expired && filters.lowStock) {
      return isExpired && isLowStock;
    } else if (filters.expired) {
      return isExpired;
    } else if (filters.lowStock) {
      return isLowStock;
    } else {
      return true;
    }
  });

  return (
    <div className={classes.container}>
      <NavBar />
      <h1 className={classes.heading}>Product Listing</h1>
      <div className={classes.filter_options}>
        <label>
          <input
            type="checkbox"
            id="filter-expired"
            checked={filters.expired}
            onChange={() =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                expired: !prevFilters.expired,
              }))
            }
          />{' '}
          Filter Expired
        </label>
        <label>
          <input
            type="checkbox"
            id="filter-low-stock"
            checked={filters.lowStock}
            onChange={() =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                lowStock: !prevFilters.lowStock,
              }))
            }
          />{' '}
          Filter Low Stock
        </label>
      </div>
      <table className={classes.product_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicine Name</th>
            <th>Medicine Brand</th>
            <th>Expiry Date</th>
            <th>Unit Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListingPage;
