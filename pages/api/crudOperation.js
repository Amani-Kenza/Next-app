export async function addProduct(title, price, description, category, image) {
  try {
      const response = await fetch('https://fakestoreapi.com/products', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, price, description, category, image }),
      });

      if (!response.ok) {
          throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      return newProduct;
  } catch (error) {
      console.error('Error adding product', error);
  }
}

export async function updateProduct(id, updatedProductData) {
  try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProductData),
      });

      if (!response.ok) {
          throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      return updatedProduct;
  } catch (error) {
      console.error('Error when updating product :', error);
      throw error;
  }
}

export async function deleteProduct(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
  
        const updatedProduct = await response.json();
        return updatedProduct;
    } catch (error) {
        console.error('Error when deleting product :', error);
        throw error;
    }
}

export async function getAllProducts() {
  try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
          throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      return products;
  } catch (error) {
      console.error('Error when loading products :', error);
      throw error;
  }
}