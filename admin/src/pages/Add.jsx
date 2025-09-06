import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets'; // Make sure this path is correct
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

export default function Add({ token }) {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subcategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    console.log("TOKEN RECEIVED:", token);
    if (!token) {
      toast.error("You are not logged in. Please login again.");
    }
  }, [token]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setSizes([]);
    setCategory('Men');
    setSubCategory('Topwear');
    setBestseller(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('You are not authorized. Please login again.');
      return;
    }

    if (!name || !description || !price || sizes.length === 0) {
      toast.error('Please fill all required fields and select at least one size.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subcategory);
      formData.append('bestseller', bestseller);

      formData.append('sizes', JSON.stringify(sizes));
      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );


      if (response.data.success) {
        toast.success(response.data.message || "Product added successfully!");
        resetForm();
      } else {
        toast.error(response.data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("AXIOS ERROR:", error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4 p-4">
      <div>
        <p className="mb-2 font-semibold">Upload Images</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((image, index) => {
            const setImage = [setImage1, setImage2, setImage3, setImage4][index];
            const inputId = `image${index + 1}`;
            return (
              <label key={index} htmlFor={inputId}>
                <img
                  className="w-20 h-20 object-cover border"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt={`Upload ${index + 1}`}
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id={inputId}
                  hidden
                  accept="image/*"
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="w-full max-w-md">
        <label className="block mb-2 font-semibold">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div className="w-full max-w-md">
        <label className="block mb-2 font-semibold">Product Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="w-full px-3 py-2 border rounded"
          rows="3"
          required
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl">
        <div>
          <label className="block mb-2 font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Subcategory</label>
          <select
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Price</label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <label className="block mb-2 font-semibold">Sizes</label>
        <div className="flex gap-3 flex-wrap">
          {['s', 'm', 'l', 'xl', 'xxl'].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                )
              }
            >
              <p
                className={`px-3 py-1 border rounded cursor-pointer ${sizes.includes(size) ? 'bg-[#fadbd8]' : 'bg-gray-200'
                  }`}
              >
                {size.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input type="checkbox" id="bestseller" onChange={() => setBestseller(prev => !prev)} checked={bestseller} />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        ADD
      </button>
    </form>
  );
}
