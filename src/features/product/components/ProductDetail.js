import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
} from '../productSlice';
import { useParams } from 'react-router-dom';
import { addToCartAsync, selectItems } from '../../cart/cartSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import { useAlert } from 'react-alert';
import { Grid } from 'react-loader-spinner';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      console.log({ items, product });
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      if (selectedColor) {
        newItem.color = selectedColor;
      }
      if (selectedSize) {
        newItem.size = selectedSize;
      }
      dispatch(addToCartAsync({item:newItem, alert}));
    } else {
      alert.error('Item Already added');
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white">
      {status === 'loading' ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}
      {product && (
        <div className="pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs?.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    className="h-5 w-4 text-gray-300"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <span
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title}
              </span>
            </li>
          </ol>
        </nav>
      
        {/* Image Gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          {product.images?.slice(0, 3).map((img, index) => (
            <div
              key={index}
              className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg"
            >
              <img
                src={img}
                alt={`${product.title} Image ${index + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      
        {/* Product Info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          {/* Title & Brand */}
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>
            <p className="mt-2 text-sm text-gray-500">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          </div>
      
          {/* Pricing and Ratings */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
      
            {/* Discounted Price */}
            <div className="flex items-center space-x-3">
              <p className="text-xl line-through text-gray-400">${product.price.toFixed(2)}</p>
              <p className="text-3xl font-semibold text-gray-900">
                ${ (product.price * (1 - product.discountPercentage / 100)).toFixed(2) }
              </p>
              <span className="inline-block rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                -{product.discountPercentage}%
              </span>
            </div>
      
            {/* Stock */}
            <p className="mt-2 text-sm text-green-600">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
      
            {/* Rating */}
            <div className="mt-6 flex items-center space-x-2">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      product.rating > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200',
                      'h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{product.rating.toFixed(1)} / 5</p>
            </div>
      
            {/* Add to Cart */}
            <button
              onClick={handleCart}
              type="button"
              className="mt-10 w-full rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add to Cart
            </button>
          </div>
      
          {/* Description */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>
      
            {/* Highlights - Optional */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                <ul className="mt-4 list-disc pl-4 text-sm text-gray-600 space-y-1">
                  {product.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
}
