import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [wishlist, setWishlist] = useState([]); 

  const fetchProducts = async (category) => {
    try {
      const url = category
        ? `http://localhost:5000/api/products/category/${category}`
        : 'http://localhost:5000/api/products';
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleWishlist = async (productId) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.log('You need to log in to modify your wishlist.');
      return;
    }

    try {
      if (wishlist.includes(productId)) {
        await axios.delete(`http://localhost:5000/api/Wishlist/wishlist/${productId}`, {
          headers: { token },
        });
        setWishlist(wishlist.filter((id) => id !== productId));
        console.log('Product removed from wishlist!');
      } else {
        await axios.post(
          'http://localhost:5000/api/Wishlist/wishlist',
          { productId },
          { headers: { token } }
        );
        setWishlist([...wishlist, productId]);
        console.log('Product added to wishlist!');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const formatImagePath = (path) => {
    return `http://localhost:5000/${path.replace(/\\/g, '/')}`;
  };

  return (
    <div className="home-container">
      <div className="header-container">
        <div className="col-md-4">
          <h2 className="section-title">Trending Products to Buy Now</h2>
          <p className="section-subtitle">Most popular products right now</p>
        </div>
        <div className="category-dropdown">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
          </select>
        </div>
      </div>

      <div className="underline"></div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div
              className="wishlist-icon"
              onClick={() => toggleWishlist(product._id)}
              style={{ color: wishlist.includes(product._id) ? '#ff5a5f' : 'rgba(255, 255, 255, 0.7)' }}
            >
              <FaHeart className="heart-icon" />
            </div>
            {product.photos && product.photos[0] ? (
              <img
                src={formatImagePath(product.photos[0])}
                alt={product.name}
                className="product-image"
              />
            ) : (
              <div className="product-image-placeholder">No Image Available</div>
            )}
            <div className="product-details">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
