import React from 'react';
import image from '../assets/image.png';
import { useNavigate } from 'react-router-dom';

const YourComponent = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className="mb-4">
                <img src={image} alt="Logo" className="w-60 h-auto" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Build Your Future</h1>
            <button 
                className="bg-black text-white font-semibold py-2 px-4 rounded-full" 
                onClick={navigateToLogin}
            >
                Get Started Free
            </button>
        </div>
    );
};

export default YourComponent;


// <div className="flex flex-col items-center justify-center min-h-screen bg-white">
// <div className="mb-4">
//     <img src={image} alt="Logo" className="w-32 h-auto" /> {/* Increased width to 32 */}
// </div>
// <h1 className="text-2xl font-bold mb-4">Build Your Future</h1>
// <button 
//     className="bg-black text-white font-semibold py-2 px-4 rounded-full mt-6"  {/* Added margin-top */}
//     onClick={navigateToLogin}
// >
//     Get Started Free
// </button>
// </div>