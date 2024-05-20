import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession, signOut } from 'next-auth/react';
import { addProduct, getAllProducts, updateProduct, deleteProduct } from './api/crudOperation';
import styles from '../styles/style.module.css'; 
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
      return {
        redirect: {
          destination: '/login', // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
          permanent: false,
        },
      };
    }
  
    return {
      props: {}, // Retourne les props vides si l'utilisateur est connecté
    };
}

export default function Dashboard() {
    const [showForm, setShowForm] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const productsData = await getAllProducts();
            setProducts(productsData);
        } catch (error) {
            console.error('Error when loading products', error);
        }
    };
    // function to sign out
    const handleSignOut = async () => {
            await signOut({ redirect: false });
            router.push('/login');  // Redirection vers la page d'accueil
    }
    // function to show each crud operations
    const handleFormToggle = (formType) => {
        setShowForm(showForm === formType ? '' : formType);
        setSuccessMessage('');
        setFormData({
            id: '',
            title: '',
            price: '',
            description: '',
            category: '',
            image: ''
        });
    };
    // function to add a product
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const newProduct = await addProduct(
                formData.title,
                parseFloat(formData.price),
                formData.description,
                formData.category,
                formData.image
            );
            console.log(newProduct);
            setSuccessMessage('Product added successfully!');
            setFormData({
                title: '',
                price: '',
                description: '',
                category: '',
                image: ''
            });
            await loadProducts(); // Mettre à jour la liste des produits après l'ajout
            router.push('/product');
        } catch (error) {
            console.error('Error adding product', error);
        }
    };
    // function to delete a product
     const handleRemoveProduct = async (e) => {
        e.preventDefault();
        try {
            await deleteProduct(parseInt(formData.id));
            setSuccessMessage('Product deleted successfully!');
            setFormData({
                id: ''
            });
            await loadProducts();
            router.push('/product');
        } catch (error) {
            console.error('Error deleting the product :', error);
        }
      };
       // function to update a product
      const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(formData.id, {
                title: formData.title,
                price: parseFloat(formData.price),
                description: formData.description,
                category: formData.category,
                image: formData.image
            });
            setSuccessMessage('The product has been successfully updated!');
            setFormData({
                id: '',
                title: '',
                price: '',
                description: '',
                category: '',
                image: ''
            });
            loadProducts(); // Recharger les produits après la mise à jour
        } catch (error) {
            console.error('Error updating the product:', error);
        }
      };
      //function to update the user input
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    return (
        <div>
            <h1 className='font-bold text-xl ml-12 mt-12'>My dashboard</h1>
            <button onClick={handleSignOut} className={`${styles.signout} bg-sky-500 hover:bg-sky-700 p-2 w-32 rounded-xl text-white`}>Sign Out</button>
            <nav className='mt-12'>
                <ul className='flex gap-6 justify-center align-items-center'>
                    <li className='cursor-pointer'  onClick={() => handleFormToggle('add')}>Add product</li>
                    <li className='cursor-pointer'  onClick={() => handleFormToggle('update')}>Update product</li>
                    <li className='cursor-pointer'  onClick={() => handleFormToggle('remove')}>Remove product</li>
                </ul>
            </nav>
            {showForm === 'add' && (
                <div className='flex justify-center align-items-center mt-8'>
                    <form onSubmit={handleAddProduct}>
                        <input type="text" placeholder='Title' name='title' value={formData.title} onChange={handleChange} required className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <input type="text" placeholder='Price' name='price' required value={formData.price} onChange={handleChange} className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <input type="text" placeholder='Description' name='description' required value={formData.description} onChange={handleChange} className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <input type="text" placeholder='Category' name='category' required value={formData.category} onChange={handleChange} className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <input type="text" placeholder='Image URL' name='image' value={formData.image} onChange={handleChange} className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <button type='submit' className="bg-sky-500 hover:bg-sky-700 p-2 w-32 ml-20 rounded-xl text-white mt-4">Add</button>
                        {successMessage && <p className="text-green-500">{successMessage}</p>}
                    </form>
                </div>
            )}
            {showForm === 'remove' && (
                <div className='flex justify-center align-items-center mt-8'>
                    <form onSubmit={handleRemoveProduct}>
                        <input type="text" placeholder='Product ID' name='id' value={formData.id} onChange={handleChange} required className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <button type='submit' className="bg-sky-500 hover:bg-sky-700 p-2 w-32 ml-20 rounded-xl text-white mt-4">Remove</button>
                        {successMessage && <p className="text-green-500">{successMessage}</p>}
                    </form>
                </div>
            )}
            {showForm === 'update' && (
                <div className='flex justify-center align-items-center mt-8'>
                    <form onSubmit={handleUpdateProduct}>
                        <input type="text" placeholder='Product ID' name='id' value={formData.id} onChange={handleChange} required className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <input type="text" placeholder='Title' name='title' value={formData.title} onChange={handleChange} required className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <input type="text" placeholder='Price' name='price' required value={formData.price} onChange={handleChange} className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <input type="text" placeholder='Description' name='description' required value={formData.description} onChange={handleChange} className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <input type="text" placeholder='Category' name='category' required value={formData.category} onChange={handleChange} className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <input type="text" placeholder='Image URL' name='image' value={formData.image} onChange={handleChange} className='border-solid border-2 rounded-xl p-2 w-72 mt-4' /><br />
                        <button type='submit' className="bg-sky-500 hover:bg-sky-700 p-2 w-32 ml-20 rounded-xl text-white mt-4">Update</button>
                        {successMessage && <p className="text-green-500">{successMessage}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}
