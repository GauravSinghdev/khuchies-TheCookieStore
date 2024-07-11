import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance';

const AddEditProd = ({ onClose, type, productData, getAllProduct }) => {
    const [error, setError] = useState("");
    const [noerror, SetNoError] = useState("");

    //Add Product
    const handleAddProd = async () => {
        setError("");
        SetNoError("");

        try {
            const response = await axiosInstance.post("/admin/add-newproduct", {
                Product_name,
                Product_code,
                Product_imgURL,
                Product_SP,
                Product_MRP,
                Product_discount,
            });

            if (response.data && response.data.error) {
                setError(response.data.message);
                return;
            }
            else{
                setError("");
                SetNoError("Product added successfully. Please close the window.");
                return;
            }
        } catch (error) {
            console.log("Facing error.")
            setError("Failed to add product. Please try again.");
        }
    }

    //Edit Product
    const editProduct = async () => {
        setError("");
        SetNoError("");

        const productId = productData._id;
        
        try{
            const response = await axiosInstance.put("/admin/edit-product/" + productId, {
                Product_name,
                Product_code,
                Product_imgURL,
                Product_SP,
                Product_MRP,
                Product_discount
            });

            if(response.data && response.data.error){
                setError(response.data.message);
                return;
            }
            else{
                setError("");
                SetNoError("Product edited successfully. Please close the window.");
                return;
            }
        } catch(error){
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
        }
    }


    const handleAddProduct = () => {
        if(!Product_name){
            setError("Plesae enter the Product name");
            return;
        }

        if(!Product_code){
            setError("Please enter the Product code");
            return;
        }

        if(!Product_imgURL){
            setError("Please enter the Product imageURL");
            return;
        }

        if(!Product_SP){
            setError("Please enter the Product SP");
            return;
        }

        if(!Product_MRP){
            setError("Please enter the Product MRP");
            return;
        }
        setError("");

        if(type === 'edit')
            editProduct();
        else
            handleAddProd();
    }

    const [Product_name, setProduct_name] = useState(productData?.product_name || "");
    const [Product_code, setProduct_code] = useState(productData?.product_code || "");
    const [Product_imgURL, setProduct_imgURL] = useState(productData?.product_imageURL || "");
    const [Product_SP, setProduct_SP] = useState(productData?.product_SP || "");
    const [Product_MRP, setProduct_MRP] = useState(productData?.product_MRP || "");
    const [Product_discount, setProduct_discount] = useState(productData?.product_discount || "");


  return (
    <div>

        <div className='relative'>
            <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -right-2 -top-2 shadow-xl text-white bg-slate-700' onClick={onClose}>
                <MdClose className="text-3xl" />
            </button>

            <h1 className='text-4xl font-bold text-center mb-10 underline underline-offset-2'>Product Info</h1>

            <div className='flex gap-5 mx-5 my-2'>
                <div className='flex flex-col gap-5'>
                    <label className='text-black text-lg'>Product_name</label>
                    <label className='text-black text-lg'>Product_code</label>
                    <label className='text-black text-lg'>Product_imgURL</label>
                    <label className='text-black text-lg'>Product_SP</label>
                    <label className='text-black text-lg'>Product_MRP</label>
                    <label className='text-black text-lg'>Product_discount</label>
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <input 
                        type="text" 
                        className='text-lg p-1 text-white bg-black outline-none border border-black rounded-md ps-2'
                        placeholder='Product_name'
                        value={Product_name}
                        onChange={ ({target}) => setProduct_name(target.value)}
                    />

                    <input 
                        type="text" 
                        className='text-lg p-1 text-white bg-black outline-none border border-black rounded-md ps-2'
                        placeholder='Product_code'
                        value={Product_code}
                        onChange={ ({target}) => setProduct_code(target.value)}
                    />

                    <input 
                        type="text" 
                        className='text-lg p-1 text-white bg-black  outline-none border border-black rounded-md ps-2'
                        placeholder='Product_imgURL'
                        value={Product_imgURL}
                        onChange={ ({target}) => setProduct_imgURL(target.value)}
                    />

                    <input 
                        type="text" 
                        className='text-lg p-1 text-white bg-black  border border-black rounded-md ps-2'
                        placeholder='Product_SP'
                        value={Product_SP}
                        onChange={ ({target}) => setProduct_SP(target.value)}
                    />

                    <input 
                        type="text" 
                        className='text-lg p-1 text-white bg-black  outline-none border border-black rounded-md ps-2'
                        placeholder='Product_MRP'
                        value={Product_MRP}
                        onChange={ ({target}) => setProduct_MRP(target.value)}
                    />

                    <input 
                        type="text" 
                        className='text-lg p-1 text-white bg-black outline-none border border-black rounded-md ps-2'
                        placeholder='Product_discount'
                        value={Product_discount}
                        onChange={ ({target}) => setProduct_discount(target.value)}
                    />

                    
                </div>
            </div>
        </div>

        <div className='flex flex-col justify-center'>
            <div className='flex justify-center'>
                <button 
                    className='mt-5 p-3 text-white bg-slate-700 rounded-lg items-center shadow-xl'
                    onClick={handleAddProduct}>
                    {type === 'edit' ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}
                    
                </button>
            </div>
            
            <div>
                {error && <p className="text-red-600 text-2xl text-center mt-3">{error}</p>}
                {noerror && <p className="text-green-600 text-2xl text-center mt-3">{noerror}</p>}
            </div>
            
        </div>

        
    </div>
  )
}

export default AddEditProd