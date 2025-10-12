import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify';


export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if(!email || !password || !confirmPassword){
            setError("Please fill in all fields");
            toast.error("Please fill in all fields");
            return;
        }
        if(password != confirmPassword){
            setError('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/* Headers */}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center justify-center mb-6">
                            <img src={assets.logo} alt="logo" className='w-16 h-16'/>
                            <h1 className="ml-3 text-3xl font-bold text-white">
                                Musify
                            </h1>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Join Musify
                    </h2>
                    <p className='text-gray-300'>
                        Create your account to start listening
                    </p>
                </div>
                {/* Register form */}
                <div className="bg-gray-900/80 backdrop-blug-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
                    <form action="" className='space-y-6' onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <label htmlFor="Email" className='block text-sm font-medium text-gray-200 mb-2'>
                                Email Address
                            </label>
                            <input type="email" name="email" id="email" autoComplete='email' required className='block w-full px-4 py-3 border border-gray-600 rounded-lg
                            bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
                            placeholder='Enter your email' value={email}
                            onChange={e => setEmail(e.target.value)}/>
                        </div>
                        {/* Password Field */}
                        <div>
                            <label htmlFor="Password" className='block text-sm font-medium text-gray-200 mb-2'>
                                Password
                            </label>
                            <input type="password" name="password" id="password" autoComplete='new-password' required className='block w-full px-4 py-3 border border-gray-600 rounded-lg
                            bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
                            placeholder='Create a password' value={password}
                            onChange={e => setPassword(e.target.value)}/>
                        </div>
                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="ConfirmPassword" className='block text-sm font-medium text-gray-200 mb-2'>
                                Confirm Password
                            </label>
                            <input type="password" name="confirmPassword" id="confirmPassword" autoComplete='new-password' required className='block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
                            placeholder='Confirm your password' value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}/>
                        </div>
                        {/* Submit Button */}
                        <button className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105'>
                            Register
                        </button>
                        {/* Switch to login */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-400">
                                Already have an account?&nbsp;
                                <button className="text-green-400 hover:text-green-300 font-medium transition-colors cursor-pointer">
                                    Sign in here
                                </button>
                            </p>
                        </div>
                        {/* Terms and conditions */}
                        <div className="mt-4 text-center">
                            <p className="text-xs text-gray-500">
                                By creating an account, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
