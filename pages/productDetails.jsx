import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/style.module.css'; 

import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then(response => response.json())
                .then(data => {
                    setProductDetails(data);
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                });
        }
        document.body.style.backgroundColor = '#f3f4f6';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [id]);

    return (
        <div className={`${styles.cardDetails} mt-32 ml-32 p-4`}>
            {productDetails ? (
                <div className='flex'>
                    <div>
                       <img src={productDetails.image} alt={productDetails.title} className={styles.cardImg} />
                    </div>
                    <div className='pt-12 ml-12'>
                       <h1 className='font-bold'>{productDetails.title}</h1>
                       <p className='pt-4'>{productDetails.description}</p>
                        <p className='font-bold pt-8'>${productDetails.price}</p>
                       <div className='flex pt-12'>
                          <p><span className='font-bold'>rate</span> :{productDetails.rating.rate}</p>
                          <p className='ml-24'><span className='font-bold'>note: </span>{productDetails.rating.count}</p>
                          <p className='ml-24'><span className='font-bold'>Category: </span>{productDetails.category}</p>
                       </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductDetails;
