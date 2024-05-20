import React from 'react';
import Header from '../components/header';

import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

export const getServerSideProps = async () => { 
    try {
        const res = await fetch('https://fakestoreapi.com/products'); 
        if (!res.ok) {
            throw new Error('Failed to fetch data from the API');
        }
        const allProducts = await res.json(); 
        return { 
            props: { 
                allProducts: allProducts
            } 
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                allProducts: []
            }
        };
    }
};

const Products = ({ allProducts }) => { 
    return ( 
        <div> 
            <Header allProducts={allProducts}/>
        </div> 
    );
};

export default Products;
