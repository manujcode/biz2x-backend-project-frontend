import { useDispatch, useSelector } from 'react-redux';
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from '../../product/productSlice';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../common/Modal';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  const [openModal, setOpenModal] = useState(null);
  const alert = useAlert();

  // const colors = [
  //   {
  //     name: 'White',
  //     class: 'bg-white',
  //     selectedClass: 'ring-gray-400',
  //     id: 'white',
  //   },
  //   {
  //     name: 'Gray',
  //     class: 'bg-gray-200',
  //     selectedClass: 'ring-gray-400',
  //     id: 'gray',
  //   },
  //   {
  //     name: 'Black',
  //     class: 'bg-gray-900',
  //     selectedClass: 'ring-gray-900',
  //     id: 'black',
  //   },
  // ];

  // const sizes = [
  //   { name: 'XXS', inStock: true, id: 'xxs' },
  //   { name: 'XS', inStock: true, id: 'xs' },
  //   { name: 'S', inStock: true, id: 's' },
  //   { name: 'M', inStock: true, id: 'm' },
  //   { name: 'L', inStock: true, id: 'l' },
  //   { name: 'XL', inStock: true, id: 'xl' },
  //   { name: '2XL', inStock: true, id: '2xl' },
  //   { name: '3XL', inStock: true, id: '3xl' },
  // ];

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    console.log("xxxxxxxxxxxxx===>",selectedProduct,params.id)
    if (selectedProduct && params.id) {
      setValue('title', selectedProduct.title);
      setValue('description', selectedProduct.description);
      setValue('price', selectedProduct.price);
      setValue('discountPercentage', selectedProduct.discountPercentage);
      setValue('thumbnail', selectedProduct.thumbnail);
      setValue('stock', selectedProduct.stock);
      setValue('image1', selectedProduct.images[0]);
      setValue('image2', selectedProduct.images[1]);
      setValue('image3', selectedProduct.images[2]);
      setValue('brand', selectedProduct.brand);
      setValue('category', selectedProduct.category);
      // setValue('highlight1', selectedProduct.highlights[0]);
      // setValue('highlight2', selectedProduct.highlights[1]);
      // setValue('highlight3', selectedProduct.highlights[2]);
      // setValue('highlight4', selectedProduct.highlights[3]);
      // setValue(
      //   'sizes',
      //   selectedProduct.sizes.map((size) => size.id)
      // );
      // setValue(
      //   'colors',
      //   selectedProduct.colors.map((color) => color.id)
      // );
    }
  }, [selectedProduct, params.id, setValue]);
  // const navigate = useNavigate();

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.delete = true;
    dispatch(updateProductAsync(product));
    alert.success('Product  Deleted');
  };

  return (
    <>
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        console.log(data);
        const product = { ...data };
        product.images = [
          product.image1,
          product.image2,
          product.image3,
          product.thumbnail,
        ];
        product.highlights = [
          product.highlight1,
          product.highlight2,
          product.highlight3,
          product.highlight4,
        ];
        product.rating = 0;
        // ... (color and size logic commented out, keeping it as is)
  
        delete product['image1'];
        delete product['image2'];
        delete product['image3'];
        product.price = +product.price;
        product.stock = +product.stock;
        product.discountPercentage = +product.discountPercentage;
        console.log(product);
        if (params.id) {
          product.id = params.id;
          product.rating = selectedProduct.rating || 0;
          dispatch(updateProductAsync(product));
          alert.success('Product Updated');
          reset();
        } else {
          dispatch(createProductAsync(product));
          alert.success('Product Created');
          reset();
        }
      })}
      // Added max-w-4xl to center the form and give it breathing room on larger screens
      className="mx-auto max-w-4xl shadow-2xl rounded-xl"
    >
      <div className="space-y-12 bg-white p-6 sm:p-12 rounded-xl">
        <div className="border-b border-gray-200 pb-10">
          <div className="flex justify-between items-center mb-6">
            {/* Enhanced title with conditional logic */}
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {params.id ? 'Edit Product' : 'Add New Product'}
            </h2>
            {selectedProduct?.delete && (
              <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
                Deleted
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly on the product page.
          </p>
        </div>
  
        {/* --- Product Details Section --- */}
        <div className="pt-8">
          <h3 className="text-lg font-semibold leading-7 text-gray-900 mb-6">
            General Details
          </h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-6">
            {/* Product Name (Full width for prominence) */}
            <div className="sm:col-span-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('title', {
                    required: 'Product name is required',
                  })}
                  id="title"
                  placeholder="e.g., Slim-Fit Cotton T-Shirt"
                  // Simplified focus ring and added border
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
                {/* Add error message display if using react-hook-form errors */}
                {/* {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>} */}
              </div>
            </div>
  
            {/* Description (Full width) */}
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  rows={4}
                  placeholder="A detailed description of the product."
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                  defaultValue={''}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few comprehensive sentences about the product.
              </p>
            </div>
  
            {/* Brand and Category (Split width for better layout) */}
            <div className="sm:col-span-3">
              <label
                htmlFor="brand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  id="brand"
                  {...register('brand', {
                    required: 'Brand is required',
                  })}
                  // Improved select styling
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                >
                  <option value="">-- Choose Brand --</option>
                  {brands.map((brand) => (
                    <option key={brand.value} value={brand.value}>
                      {brand.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
  
            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  {...register('category', {
                    required: 'Category is required',
                  })}
                  // Improved select styling
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                >
                  <option value="">-- Choose Category --</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
  
        <hr className="border-gray-200" />
  
        {/* --- Pricing and Stock Section --- */}
        <div className="pt-8">
          <h3 className="text-lg font-semibold leading-7 text-gray-900 mb-6">
            Pricing & Inventory
          </h3>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-6">
            {/* Price */}
            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price ($) <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  {...register('price', {
                    required: 'Price is required',
                    min: { value: 1, message: 'Must be at least 1' },
                    max: { value: 10000, message: 'Must be at most 10000' },
                  })}
                  id="price"
                  // Centered number input for better aesthetics
                  className="block w-full rounded-lg border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-right"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
            </div>
  
            {/* Discount Percentage */}
            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount (%) <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="number"
                  {...register('discountPercentage', {
                    required: 'Discount percentage is required',
                    min: { value: 0, message: 'Cannot be negative' },
                    max: { value: 100, message: 'Cannot exceed 100' },
                  })}
                  id="discountPercentage"
                  // Centered number input for better aesthetics
                  className="block w-full rounded-lg border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-right"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm">%</span>
                </div>
              </div>
            </div>
  
            {/* Stock */}
            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register('stock', {
                    required: 'Stock is required',
                    min: { value: 0, message: 'Cannot be negative' },
                  })}
                  id="stock"
                  placeholder="Available units"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-right"
                />
              </div>
            </div>
          </div>
        </div>
  
        <hr className="border-gray-200" />
  
        {/* --- Media Section --- */}
        <div className="pt-8">
          <h3 className="text-lg font-semibold leading-7 text-gray-900 mb-6">
            Product Media (Image URLs)
          </h3>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-6">
            {/* Thumbnail (Primary Image) */}
            <div className="sm:col-span-full">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail URL <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('thumbnail', {
                    required: 'Thumbnail URL is required',
                  })}
                  id="thumbnail"
                  placeholder="Paste the primary image URL here"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                The main image for the product listing.
              </p>
            </div>
  
            {/* Image 1, 2, 3 (Secondary Images) - Organized in a single row */}
            <div className="sm:col-span-2">
              <label
                htmlFor="image1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 1 URL <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('image1', {
                    required: 'Image 1 URL is required',
                  })}
                  id="image1"
                  placeholder="Secondary image URL"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
            </div>
  
            <div className="sm:col-span-2">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 2 URL <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('image2', {
                    required: 'Image 2 URL is required',
                  })}
                  id="image2"
                  placeholder="Secondary image URL"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
            </div>
  
            <div className="sm:col-span-2">
              <label
                htmlFor="image3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image 3 URL <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('image3', {
                    required: 'Image 3 URL is required',
                  })}
                  id="image3"
                  placeholder="Secondary image URL"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* --- Action Bar --- */}
      <div className="flex items-center justify-end gap-x-4 bg-gray-50 p-6 rounded-b-xl">
        <Link
          type="button"
          to={'/admin'}
          className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition duration-150"
        >
          Cancel
        </Link>
  
        {selectedProduct && !selectedProduct.delete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(true);
            }}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-600 transition duration-150"
          >
            Delete Product
          </button>
        )}
  
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
        >
          {params.id ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  
    {selectedProduct && (
      <Modal
        title={`Delete ${selectedProduct.title}`}
        message="Are you sure you want to delete this Product? This action cannot be undone."
        dangerOption="Delete"
        cancelOption="Cancel"
        dangerAction={handleDelete}
        cancelAction={() => setOpenModal(null)}
        showModal={openModal}
      ></Modal>
    )}
  </>
  );
}

export default ProductForm;
