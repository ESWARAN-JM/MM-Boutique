import React from 'react'
import { LuPhoneCall } from "react-icons/lu";
import { BsWhatsapp } from "react-icons/bs";
import { FaCcAmazonPay } from "react-icons/fa6";
import { Link } from 'react-router-dom';



const ConfirmOrder = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 pt-24">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Your Order!</h2>
                
                <p className="text-gray-600 mb-6"> Confirm by Contacting us: </p>
                <p className="text-red-600 mb-6">Orders for 'Aari Work Designs' require confirmation via phone call before processing. </p>

                <div className="flex flex-col gap-4">
                    {/* Call Button */}
                    <a href="tel:+919840435157" target="_blank" rel="noopener noreferrer" className="w-full">
                        <button className="flex justify-center w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
                        <LuPhoneCall className='mt-1 mr-2 '/> Call Now 
                        </button>
                    </a>

                    {/* WhatsApp Button */}
                    <a href="https://wa.link/qn6rei" target="_blank" rel="noopener noreferrer" className="w-full">
                        <button className="w-full flex justify-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
                        <BsWhatsapp className='mt-1 mr-2 '/> Confirm via WhatsApp
                        </button>
                    </a>

                    {/* Proceed to Payment */}
                    <p className="text-gray-600 pt-4">For Delivery:</p>
                    <Link to="/checkout"> 
                    <button className="w-full flex justify-center bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                    <FaCcAmazonPay className='mt-1 mr-2 '/> Proceed to Payment
                    </button></Link>
                    <p className="text-red-600">Delivery charges will be discussed via phone call.</p>
                </div>
            </div>
        </div>
    );
}


export default ConfirmOrder;
