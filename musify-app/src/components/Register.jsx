import React from 'react'
import { assets } from '../assets/assets'

export const Register = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/*Headers*/}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center justify-center mb-6">
                            <img src={assets.logo} alt="logo" className='w-16 h-16'/>
                            <h1 className="ml-3 text-3xl font-bold text-white">
                                Musify
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
