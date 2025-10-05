import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../cart/cartSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { selectUserInfo } from '../user/userSlice';
import { ITEMS_PER_PAGE } from '../../app/constants';
import { fetchProductsByFiltersAsync } from '../product/productSlice';


const navigation = [
  { name: 'Products', link: '/', user: true },
  { name: 'Products', link: '/admin', admin: true },
  { name: 'Orders', link: '/admin/orders', admin: true },

];
const userNavigation = [
  { name: 'My Profile', link: '/profile' },
  { name: 'My Orders', link: '/my-orders' },
  { name: 'Sign out', link: '/logout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
    
  const [filter,setFilter] = useState({})
  const handleSearchClick = (obj) => {
    // const filter = { _sort: option.sort, _order: option.order };
    console.log(obj)
    setFilter(obj)
    // setSort();
  };
  const dispatch = useDispatch()
  const [sort, setSort] = useState({});
  useEffect(() => {
    const pagination = { _page: 1, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
    setSearchResult([])
  }, [dispatch, filter]);

   const searchProduct =[{ "title": "Wooden Bathroom Sink With Mirrors" },
   { "title": "Milk" },
   { "title": "Blue & Black Check Shirt" },
   { "title": "Red Onions" },
   { "title": "Green Bell Pepper" },
   { "title": "Mulberry" },
   { "title": "Citrus Squeezer Yellow" },
   { "title": "Tissue Paper Box" },
   { "title": "Knife" },
   { "title": "Kitchen Sieve" },
   { "title": "Potatoes" },
   { "title": "Men Check Shirt" },
   { "title": "Brown Leather Belt Watch" },
   { "title": "Tray" },
   { "title": "Powder Canister" },
   { "title": "Black Whisk" },
   { "title": "Carbon Steel Wok" },
   { "title": "Rolex Cellini Date Black Dial" },
   { "title": "Sports Sneakers Off White Red" },
   { "title": "Juice" },
   { "title": "Family Tree Photo Frame" },
   { "title": "Chopping Board" },
   { "title": "Red Lipstick" },
   { "title": "Lunch Box" },
   { "title": "Man Plaid Shirt" },
   { "title": "Wooden Rolling Pin" },
   { "title": "Huawei Matebook X Pro" },
   { "title": "Rolex Datejust" },
   { "title": "Table Lamp" },
   { "title": "Bamboo Spatula" },
   { "title": "Fish Steak" },
   { "title": "Lemon" },
   { "title": "Spice Rack" },
   { "title": "Man Short Sleeve Shirt" },
   { "title": "Asus Zenbook Pro Dual Screen Laptop" },
   { "title": "Puma Future Rider Trainers" },
   { "title": "Plate" },
   { "title": "Chanel Coco Noir Eau De" },
   { "title": "Dior J'adore" },
   { "title": "Electric Stove" },
   { "title": "Protein Powder" },
   { "title": "Black Aluminium Cup" },
   { "title": "Water" },
   { "title": "House Showpiece Plant" },
   { "title": "Nike Baseball Cleats" },
   { "title": "Spoon" },
   { "title": "Chicken Meat" },
   { "title": "Green Chili Pepper" },
   { "title": "Ice Cream" },
   { "title": "Cat Food" },
   { "title": "Gucci Bloom Eau de" },
   { "title": "Annibale Colombo Bed" },
   { "title": "Slotted Turner" },
   { "title": "Rolex Submariner Watch" },
   { "title": "Apple MacBook Pro 14 Inch Space Grey" },
   { "title": "Fine Mesh Strainer" },
   { "title": "Glass" },
   { "title": "Decoration Swing" },
   { "title": "Plant Pot" },
   { "title": "Dolce Shine Eau de" },
   { "title": "Apple" },
   { "title": "Bedside Table African Cherry" },
   { "title": "Rolex Cellini Moonphase" },
   { "title": "Amazon Echo Plus" },
   { "title": "Silver Pot With Glass Cap" },
   { "title": "Red Tongs" },
   { "title": "Eyeshadow Palette with Mirror" },
   { "title": "Honey Jar" },
   { "title": "Nescafe Coffee" },
   { "title": "Cooking Oil" },
   { "title": "Egg Slicer" },
   { "title": "Hand Blender" },
   { "title": "Annibale Colombo Sofa" },
   { "title": "Grater Black" },
   { "title": "Soft Drinks" },
   { "title": "Pan" },
   { "title": "Microwave Oven" },
   { "title": "Fork" },
   { "title": "Rice" },
   { "title": "Dog Food" },
   { "title": "Essence Mascara Lash Princess" },
   { "title": "Mug Tree Stand" },
   { "title": "Nike Air Jordan 1 Red And Black" },
   { "title": "Gigabyte Aorus Men Tshirt" },
   { "title": "Longines Master Collection" },
   { "title": "Eggs" },
   { "title": "Calvin Klein CK One" },
   { "title": "Ice Cube Tray" },
   { "title": "Beef Steak" },
   { "title": "Yellow Peeler" },
   { "title": "Lenovo Yoga 920" },
   { "title": "Apple Airpods" },
   { "title": "New DELL XPS 13 9300 Laptop" },
   { "title": "Knoll Saarinen Executive Conference Chair" },
   { "title": "Strawberry" },
   { "title": "Kiwi" },
   { "title": "Cucumber" },
   { "title": "Boxed Blender" },
   { "title": "Red Nail Polish" },
   { "brand": "Bath Trends" },
       { "brand": "Fashion Trends" },
       { "brand": "Urban Chic" },
       { "brand": "Fashion Timepieces" },
       { "brand": "Velvet Touch" },
       { "brand": "Rolex" },
       { "brand": "Off White" },
       { "brand": "Chic Cosmetics" },
       { "brand": "Classic Wear" },
       { "brand": "Huawei" },
       { "brand": "Casual Comfort" },
       { "brand": "Asus" },
       { "brand": "Puma" },
       { "brand": "Chanel" },
       { "brand": "Dior" },
       { "brand": "Nike" },
       { "brand": "Gucci" },
       { "brand": "Annibale Colombo" },
       { "brand": "Apple" },
       { "brand": "Dolce & Gabbana" },
       { "brand": "Furniture Co." },
       { "brand": "Amazon" },
       { "brand": "Glamour Beauty" },
       { "brand": "Essence" },
       { "brand": "Gigabyte" },
       { "brand": "Longines" },
       { "brand": "Calvin Klein" },
       { "brand": "Lenovo" },
       { "brand": "Dell" },
       { "brand": "Knoll" },
       { "brand": "Nail Couture" },
       { "category": "furniture" },
       { "category": "groceries" },
       { "category": "mens-shirts" },
       { "category": "kitchen-accessories" },
       { "category": "mens-watches" },
       { "category": "beauty" },
       { "category": "mens-shoes" },
       { "category": "home-decoration" },
       { "category": "laptops" },
       { "category": "fragrances" },
       { "category": "mobile-accessories" }
   
   ]
   let [searchResult,setSearchResult] =useState([]);
   function  handleSearch(event) {
    const query = event.target.value;
    // Implement your search logic here
     let Result = searchProduct.filter(product =>
      product.title?.toLowerCase().includes(query.toLowerCase()) ||
      product.brand?.toLowerCase().includes(query.toLowerCase()) ||
      product.category?.toLowerCase().includes(query.toLowerCase())
    );
    // if()
    setSearchResult(Result);
    // if()
    console.log('Searching for:', searchResult);
  }

  return (
    <>
      {userInfo &&<div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        <img
                          className="h-8 w-8"
                          src="/ecommerce.png"
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) =>
                          item[userInfo.role] ? (
                            <Link
                              key={item.name}
                              to={item.link}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View notifications</span>
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {items.length}
                        </span>
                      )}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={userInfo.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={userInfo.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {/* this should come from userInfo */}
                        {userInfo.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {userInfo.email}
                      </div>
                    </div>
                    <Link to="/cart">
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                    {items.length > 0 && (
                      <span className="inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {items.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow-md">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
    {/* Logo / Title */}
    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
      🛒 E-Commerce
    </h1>

    {/* Search Bar */}
    <div className="relative w-1/2 max-w-md">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-4 pr-10 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
        // value={query}
        onClick={handleSearch}
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600">
        🔍
      </button>

      {/* Suggestions dropdown */}
      {searchResult.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {searchResult.map((product, idx) => (
            <li
              key={idx}
              className="cursor-pointer px-4 py-2 hover:bg-indigo-100"
              onClick={() => {
                  let obj = null;
                    if(product.brand){
                       obj={brand:product.brand}
                    }
                    else if(product.category){
                      obj={category:product.category}
                    }
                    else{
                    obj={title:product.title}
                    }
                handleSearchClick(obj)
                // setQuery(product.title);
                // setSearchResult([]);
              }}
            >
             <span className="text-sm text-gray-500">{product.brand||product.category||product.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</header>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>}
    </>
  );
}

export default NavBar;
