import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa'; // For the "X" icon

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]); // Initialize as an array

  const fetchWishlist = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.log('You need to log in to view your wishlist.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/Wishlist/wishlist', {
        headers: {
          token: token,
        },
      });

      // Set wishlistItems to the "wishlist" property of the response data
      setWishlistItems(Array.isArray(response.data.wishlist) ? response.data.wishlist : []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlistItems([]); // Set to empty array on error
    }
  };

  const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.log('You need to log in to remove items from your wishlist.');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/Wishlist/wishlist/${productId}`, {
        headers: {
          token: token,
        },
      });
      setWishlistItems(wishlistItems.filter((item) => item._id !== productId));
      console.log('Product removed from wishlist!');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-container">
      <h2 className="section-title">Your Wishlist</h2>
      <div className="products-grid">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item._id} className="product-card">
              <div className="wishlist-icon" onClick={() => removeFromWishlist(item._id)}>
                <FaTimes className="remove-icon" />
              </div>
              {item.photos && item.photos[0] ? (
                <img
                  src={`http://localhost:5000/${item.photos[0].replace(/\\/g, '/')}`}
                  alt={item.name}
                  className="product-image"
                />
              ) : (
                <div className="product-image-placeholder">No Image Available</div>
              )}
              <div className="product-details">
                <h3 className="product-title">{item.name}</h3>
                <p className="product-price">${item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items in your wishlist.</p>
        )}
      </div>
    </div>
  );
}
