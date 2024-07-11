import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Banner from '../../components/Cards/Banner';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import AddEditProd from './AddEditProd';
import Modal from "react-modal";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";

const AllProducts = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);    
    const [products, setProducts] = useState([]);

    const [openAddEditModal, setOpenEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const fetchIfAdmin = async () => {
        try {
            const response = await axiosInstance.get("/user-details");
            if (response.data && response.data.users && response.data.users.role !== "Admin") {
                setError('Failed to fetch products because you are not Admin.');
            }
        } catch (error) {
            setError('User not logged In!');
        }
    }

    const getAllProduct = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/admin/all-products-details");
            if (response.data && response.data.products) {
                setProducts(response.data.products);
                setLoading(false);
            } else {
                setError('Failed to fetch products');
                setLoading(false);
            }
        } catch (error) {
            setError('Failed to fetch Products or User is not logged In.');
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProduct();
        fetchIfAdmin();
    }, []);

    const handleDelete = async (productId) => {
        console.log("gk")
        try {
            const response = await axiosInstance.delete("/admin/delete-product/" + productId);
            console.log(response.data.message)
            getAllProduct();
        } catch (error) {
            setError('Failed to delete the product');
        }
    };

    const handleEdit = (product) => {
        setOpenEditModal({ isShown: true, type: "edit", data: product });
    };

    const handleCloseModal = () => {
        setOpenEditModal({ isShown: false, type: "add", data: null });
        getAllProduct();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />

            <div className="py-10 w-full px-[350px]">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500 text-2xl text-center mt-10">{error}</p>}

                {!error && !loading && (
                    <div className='relative'>
                        <h1 className="text-3xl mb-8 text-center">All Products <span className='text-slate-600'>({products.length})</span></h1>

                        <button
                            className='p-3 flex items-center justify-center absolute right-0 top-0 bg-[#cfa25a] text-white rounded-full shadow-lg hover:bg-[#b48c4a] active:bg-[#a17a3e]'
                            onClick={() => {
                                setOpenEditModal({ isShown: true, type: "add", data: null });
                            }}>
                            <MdAdd className="text-2xl mr-2" /> Add new Product
                        </button>

                        <Modal
                            isOpen={openAddEditModal.isShown}
                            onRequestClose={handleCloseModal}
                            ariaHideApp={false}
                            style={{
                                overlay: {
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                },
                            }}
                            contentLabel="Add/Edit Product Modal"
                            className="w-[900px]  rounded-lg mx-auto mt-48 p-10 border shadow-lg bg-[#cfa25a]">
                            <AddEditProd
                                type={openAddEditModal.type}
                                productData={openAddEditModal.data}
                                onClose={handleCloseModal}
                                getAllProduct={getAllProduct}
                            />
                        </Modal>

                        <table className="border-collapse w-full my-10 border-4">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Code</th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Image URL</th>
                                    <th className="border p-2">SP</th>
                                    <th className="border p-2">MRP</th>
                                    <th className="border p-2">Discount</th>
                                    <th className="border p-2">Created</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center ">
                                {products.map((product, index) => (
                                    <tr key={index} className="bg-white hover:bg-gray-100">
                                        <td className="border p-2 font-bold">{product.product_code}</td>
                                        <td className="border p-2">{product.product_name}</td>
                                        <td className="border p-2">{product.product_imageURL}</td>
                                        <td className="border p-2">{product.product_SP}</td>
                                        <td className="border p-2">{product.product_MRP}</td>
                                        <td className="border p-2">{product.product_discount}</td>
                                        <td className="border p-2">{new Date(product.createdOn).toLocaleDateString()}</td>
                                        <td className="border p-2">
                                            <button 
                                                className="text-blue-500 hover:text-blue-700"
                                                onClick={() => handleEdit(product)}>
                                                <MdEdit className="text-xl" />
                                            </button>
                                            <button 
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDelete(product._id)}>
                                                <MdDelete className="text-xl" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default AllProducts;
