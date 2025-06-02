import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import {addAllBooks, fetchAllBooks} from '../store/slices/bookSlice'
import { toggleAddBookPopup } from "../store/slices/popUpSlice";


const AddBookPopup = () => {
  const dispatch = useDispatch()
  const [title, setTiltle] = useState("")
  const [author, setauthor] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [description, setDescription] = useState("")
  

  const handleAddBook = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("author", author)
    formData.append("price", price)
    formData.append("quantity", quantity)
     formData.append("description", description)
     dispatch(addAllBooks(formData))
     dispatch(fetchAllBooks())
     dispatch(toggleAddBookPopup())



  }

  return <>
   <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 bg-white rounded-lg shadow-lg ">
        <div className='p-6'>
          <h3 className='text-xl font-bold mb-4'>Record Book</h3>
          <form onSubmit={handleAddBook}>
           
            <div className='mb-4'>
              <label className='block text-gray-900 font-medium'>Book Title</label>
              <input type="text" value={title} onChange={(e)=>setTiltle(e.target.value)}  placeholder="Book Author" className='w-full px-4 py-2 border-2 border-black rounded-md' required/>
  
  
            </div>
            <div className='mb-4'>
              <label className='block text-gray-900 font-medium'>Book Author</label>
              <input type="nu" value={author} onChange={(e)=>setauthor(e.target.value)}  placeholder="Book title" className='w-full px-4 py-2 border-2 border-black rounded-md' required/>
  
  
            </div>
            <div className='mb-4'>
              <label className='block text-gray-900 font-medium'>Book Price (Price for Borrowing)</label>
              <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}  placeholder="Book price" className='w-full px-4 py-2 border-2 border-black rounded-md' required/>
  
  
            </div>
            <div className='mb-4'>
              <label className='block text-gray-900 font-medium'>Book Quantity</label>
              <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)}  placeholder="Book Quantity" className='w-full px-4 py-2 border-2 border-black rounded-md' required/>
  
  
            </div>
              <div className='mb-4'>
              <label className='block text-gray-900 font-medium'>Book Description</label>
              <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Books Description" rows={4} className="w-full px-4 py-2 border-2 border-black rounded-md"/>
  
  
            </div>
            <div className='flex justify-end space-x-4'>
              <button className='px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 ' type='button' onClick={()=>dispatch(toggleAddBookPopup())}>Close</button>
              <button className='px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800' type='submit'>Add</button>
            </div>
  
          </form>
        </div>
        </div>
      </div>
  </>;
};

export default AddBookPopup;
