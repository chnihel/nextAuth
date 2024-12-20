
"use client"
import React, { useEffect, useState } from 'react'
import EditProductModal from '../../components/EditModal';

interface Product {
    _id: string,
    Ref: string,
    Price: number,
    Description: string,
    Qnt: number,
    image: string[]
}

const ListProduct = () => {
  

    const [prod, setProd] = useState<Product[]>([]);
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [gal, setGal] = useState<FileList | null>(null);

    // Fetch all products
    const getProduct = async () => {
        try {
            const response = await fetch("http://localhost:3000/product");
            const dataProduct = await response.json();
            console.log("les donnee recuperer", dataProduct);
            const products: Product[] = dataProduct.AllData;
            setProd(products);
        } catch (err) {
            console.log("erreur lors de la recuperation des donnes", err);
        }
    }

    // Initial product fetch
    useEffect(() => {
        getProduct();
    }, []);

    // Delete product by ID
    const deleteData = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/product/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                getProduct(); // Refresh the product list after deletion
            }
        } catch (err) {
            console.log("erreur lors de supprimer les donnees", err);
        }
    }

    
 

   
    //update product
    const updateProduct = async (updateProd: Product, files?: FileList | null) => {
        try {
            const formData = new FormData();
            formData.append('Ref', updateProd.Ref);
            formData.append('Price', updateProd.Price.toString());
            formData.append('Description', updateProd.Description);
            formData.append('Qnt', updateProd.Qnt.toString());
    
            // Use the files from function parameter or fallback to gal state
            const imageFiles = files || gal;
    
            if (imageFiles) {
                for (let i = 0; i < imageFiles.length; i++) {
                    formData.append('files', imageFiles[i]);
                }
            }
    
            const response = await fetch(`http://localhost:3000/product/${updateProd._id}`, {
                method: "PUT",
                body: formData,
            });
    
            if (response.ok) {
                const responseData = await response.json();
                getProduct(); // Refresh the product list after update
                console.log("Product updated successfully", responseData);
            } else {
                const errorData = await response.json();
                console.error("Server error:", errorData);
            }
        } catch (err) {
            console.error("Network or other error:", err);
        }
    };
    

   

    return (
        <div>
        <div className="col-lg-8 d-flex align-items-stretch">
            <div className="card w-100">
                <div className="card-body p-4">
                    <h5 className="card-title fw-semibold mb-4">Product</h5>
                    <div className="table-responsive">
                        <table className="table text-nowrap mb-0 align-middle">
                            <thead className="text-dark fs-4">
                                <tr>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Id</h6>
                                    </th>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Ref</h6>
                                    </th>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Price</h6>
                                    </th>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Description</h6>
                                    </th>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Qnt</h6>
                                    </th>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Image</h6>
                                    </th>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Action</h6>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {prod.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.Ref}</td>
                                        <td>{item.Price}</td>
                                        <td>{item.Description}</td>
                                        <td>{item.Qnt}</td>
                                        <td>
                                            <img
                                                src={`http://localhost:3000/file/${item.image[0]}`}
                                                alt={item.Description}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    setIsModalOpen(true);
                                                    setSelectedProduct(item);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => deleteData(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <EditProductModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    product={selectedProduct}
    onUpdate={(updatedProduct, files) => updateProduct(updatedProduct, files)} // Ensure images passed here
/>

    </div>
    )
}

export default ListProduct;