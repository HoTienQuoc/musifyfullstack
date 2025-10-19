import { useEffect, useState } from 'react';
import { assets } from '../assets/assets'
import { Mail, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { login, isAuthenticated, loading: authLoading } = useAuth();

    useEffect(()=>{
        if(!authLoading && isAuthenticated()){
            navigate('/add-song',{replace: true});
        }
    }, [authLoading,isAuthenticated,navigate]);


    if(isAuthenticated()){
        return null;
    }

    
    if(authLoading){
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white">
                    
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all details");
            return;
        }
        setLoading(true);
        try {
            const result = await login(email, password);
            if (result) {
                toast.success("Admin logged in successfully");
                navigate("/add-song");
            }
            else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex items-center justify-center mb-6">
                        <img src={assets.logo} alt="" srcset="" className='h-12 w-12' />
                        <h1 className="ml-3 text-3xl font-bold text-white">
                            Musify
                        </h1>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Admin Pannel
                    </h2>
                    <p className="text-gray-300">
                        Sign in to manage your music library
                    </p>
                </div>
                {/* Login form */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                    <form action="" className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-200 mb-2'>
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className='h-5 w-5 text-gray-400' />
                                </div>
                                <input type="email" name='email' id='email' autoComplete='email'
                                    required value={email} onChange={(e) => setEmail(e.target.value)}
                                    className='block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200' />
                            </div>
                        </div>
                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-200 mb-2'>
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className='h-5 w-5 text-gray-400' />
                                </div>
                                <input type="password" name='password' id='password' autoComplete='password'
                                    required value={password} onChange={(e) => setPassword(e.target.value)}
                                    className='block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200' />
                            </div>
                        </div>
                        <button type='submit' disabled={loading}
                            className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105'>
                                {loading?(
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Signing in...
                                    </div>
                                ):(
                                    "Login"
                                )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;