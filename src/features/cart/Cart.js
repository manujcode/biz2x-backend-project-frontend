import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from './cartSlice';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';
import Modal from '../common/Modal';
import { useEffect } from 'react';

export default function Cart() {
  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  useEffect(() => {
    console.log(items)
  }, [items])
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectCartLoaded)
  const [openModal, setOpenModal] = useState(null);

  const totalAmount = items.reduce(
    (amount, item) => item.product.price*(1-item.product.discountPercentage/100) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({id:item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (   
    <>
    {/* Conditional Redirect for Empty Cart */}
    {!items.length && cartLoaded && <Navigate to="/" replace={true}></Navigate>}
  
    <div className="bg-gray-50 min-h-screen pt-12"> {/* Changed bg-white to bg-gray-50 for a softer feel and added min-h-screen */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          
          {/* Cart Item List Section (Left Column) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-8 pt-6"> {/* Larger, bolder heading */}
              Your Shopping Cart
            </h1>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"> {/* Wrapped list in a card for better containment */}
              <div className="flow-root">
                
                {/* Loading State */}
                {status === 'loading' ? (
                  <div className="flex justify-center items-center py-16">
                    <Grid
                      height="60"
                      width="60"
                      color="rgb(79, 70, 229)"
                      ariaLabel="Loading cart items"
                      radius="9"
                      visible={true}
                    />
                  </div>
                ) : null}
                
                {/* List of Items */}
                <ul className="-my-8 divide-y divide-gray-100"> {/* Increased vertical margin and lighter divider */}
                  {items.map((item) => (
                    <li key={item.id} className="flex py-8 transition duration-300 hover:bg-gray-50 -mx-6 px-6 rounded-lg"> {/* Added hover effect and increased padding/margin for better spacing */}
                      
                      {/* Product Image */}
                      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 shadow-sm"> {/* Slightly larger image container, rounded-lg, added shadow */}
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
  
                      {/* Product Details */}
                      <div className="ml-5 flex flex-1 flex-col justify-between">
                        <div className="pt-1">
                          <div className="flex justify-between text-lg font-semibold text-gray-900"> {/* Bolder product title and price */}
                            <h3>
                              <a href={`/product/${item.product.id}`} className="hover:text-indigo-600 transition duration-150">{item.product.title}</a> {/* Added hover to link */}
                            </h3>
                            <p className="ml-4">${(item.product.price * (1 - item.product.discountPercentage / 100)).toFixed(2)}</p> {/* Ensured price has two decimal places */}
                          </div>
                          
                          {/* Brand/Category Tag */}
                          <p className="mt-1 text-sm text-indigo-500 font-medium bg-indigo-50 inline-block px-2 py-0.5 rounded-full"> {/* Used a colored tag for brand/category */}
                            {item.product.brand || item.product.category}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3"> {/* Aligned quantity control and remove button */}
                          
                          {/* Quantity Control */}
                          <div className="flex items-center space-x-4">
                            <label
                              htmlFor={`quantity-${item.id}`}
                              className="text-sm font-medium text-gray-700"
                            >
                              Quantity
                            </label>
                            <select
                              id={`quantity-${item.id}`}
                              onChange={(e) => handleQuantity(e, item)}
                              value={item.quantity}
                              className="form-select border-gray-300 rounded-md shadow-sm py-1.5 text-sm focus:ring-indigo-500 focus:border-indigo-500" // Styled select box
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>
  
                          {/* Remove Button with Modal */}
                          <div className="flex">
                            <Modal
                              title={`Remove ${item.product.title}?`} // Clearer modal title
                              message="Are you sure you want to remove this item from your cart? This action cannot be undone." // More descriptive message
                              dangerOption="Remove"
                              cancelOption="Keep Item" // Friendlier cancel option
                              dangerAction={(e) => handleRemove(e, item.id)}
                              cancelAction={() => setOpenModal(null)}
                              showModal={openModal === item.id}
                            ></Modal>
                            <button
                              onClick={e => { setOpenModal(item.id) }}
                              type="button"
                              className="text-sm font-medium text-red-600 hover:text-red-800 transition duration-150" // Changed to red for 'remove' to indicate a destructive action
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Order Summary Section (Right Column) */}
          <div className="lg:col-span-5 xl:col-span-4 mt-10 lg:mt-0">
            <div className="sticky top-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100"> {/* Made it sticky and gave it a distinct look */}
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 border-b pb-4 mb-4">
                Order Summary
              </h2>
              
              {/* Totals */}
              <div className="space-y-4">
                <div className="flex justify-between text-lg font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p className="font-semibold">$ {totalAmount.toFixed(2)}</p> {/* Bolded total price */}
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <p>Total Items</p>
                  <p className="font-medium">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                </div>
              </div>
              
              <p className="mt-4 text-xs text-gray-500"> {/* Smaller text for secondary info */}
                Shipping and taxes calculated at checkout.
              </p>
              
              {/* Checkout Button */}
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-indigo-700 transition duration-150" // Larger, more prominent button
                >
                  Proceed to Checkout
                </Link>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to="/" className="ml-1">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping <span aria-hidden="true">&rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </>
  );
}
