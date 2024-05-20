import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/style.module.css'; 

export default function Header({ allProducts }) {
  const [searchProduct, setSearchProduct] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  // Function to search product
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchProduct(query);
    if (allProducts) {
      const filtered = allProducts.filter(product => product.category.toLowerCase().includes(query));
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      <nav className='flex gap-5 p-2 justify-center items-center shadow-lg'>
        <input
          className='border-solid border-2 rounded-full p-2 w-72'
          type="search"
          placeholder="Search..."
          value={searchProduct}
          onChange={handleSearch}
        />
        <ul className='flex gap-6 pt-2 ml-72'>
          <li>About</li>
          <Link href="/product"><li>Products</li></Link>
          <Link href="/connexion"><li>Log in</li></Link> 
        </ul>
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 ml-4">
        {filteredProducts && filteredProducts.map((product) => (
          <div key={product.id} className={`${styles.card}`}>
            <div className="flex flex-col h-full">
              <div className="flex justify-center items-center">
                <img src={product.image} className='h-96 p-4' alt={product.title} />
              </div>
              <h2 className={`font-bold ml-3 mt-2 ${styles.title}`}>{product.title}</h2>
              <div className="flex ml-4 mt-4 mb-4">
                <h3>${product.price}</h3>
                <h3 className='ml-24'>{product.category}</h3>
              </div>
              <div className='mb-2'>
                <Link href={`/productDetails?id=${product.id}`}><button className="bg-sky-500 hover:bg-sky-700 p-2 w-32 rounded-xl ml-2 text-white">Details</button></Link>
                <button className="bg-sky-500 hover:bg-sky-700 p-2 w-32 ml-4 rounded-xl text-white">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
