import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { assets } from "../assets/assets";

const LandingPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 to-purple-300 text-gray-800 flex flex-col">
            {/* Navbar */}
            <header className="flex justify-between bg-gray-900/95 items-center px-8 py-4 text-gray-200 sticky top-0 z-30 shadow-md">
                <div className='flex items-center gap-3'>
                    <img src={assets.logo} alt='logo' className='h-16 w-16 rounded-full' />
                    <span className='text-3xl font-bold text-white truncate '>Money Manager</span>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex text-gray-200 space-x-6">
                    <Link to="/" className="hover:text-gray-50  text-2xl">Home</Link>
                    <a href="#features" className="hover:text-gray-50  text-2xl">About Us</a>
                    <Link to="/login" className="hover:text-gray-50   text-2xl">Login</Link>
                    <Link to="/signUp" className="hover:text-gray-50  text-2xl">Register</Link>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-200 hover:text-gray-50 focus:outline-none"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-gray-900/95 shadow-md border-t text-gray-200 border-gray-200">
                    <div className="flex flex-col space-y-3 px-6 py-4">
                        <Link to="/" className="hover:text-gray-50" onClick={toggleMenu}>Home</Link>
                        <a href="#features" className="hover:text-gray-50" onClick={toggleMenu}>About Us</a>
                        <Link to="/login" className="hover:text-gray-50" onClick={toggleMenu}>Login</Link>
                        <Link to="/signUp" className="hover:text-gray-50" onClick={toggleMenu}>Register</Link>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="flex flex-col items-center text-center py-20 px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Manage Your Money Smarter 🚀
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                    Take charge of your money with effortless income tracking, expense control, and insightful visuals.
                </p>
                <div className="mt-6 space-x-4">
                    <Link
                        to="/signUp"
                        className="px-6 py-3 bg-purple-700 text-white text-2xl rounded-xl shadow hover:bg-purple-800"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/login"
                        className="px-6 py-3 bg-gray-200 text-2xl border-purple-600 rounded-xl shadow hover:bg-gray-300"
                    >
                        Login
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-gray-900/95 text-gray-200 px-6">
                {/* Image Card */}
                <div className="max-w-5xl mx-auto mb-10">
  <div className="bg-white rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
    <img
      src={assets.dashboard}
      alt="Dashboard Preview"
      className="w-full h-auto object-cover"
    />
  </div>
</div>

                <h3 className="text-3xl font-bold text-center  text-gray-200 mb-10">
                    Why Choose MoneyManager?
                </h3>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="p-6 bg-purple-100 rounded-xl shadow">
                        <h4 className="text-xl font-semibold text-purple-600">💰 Track Income</h4>
                        <p className="mt-2 text-gray-600">
                            Add, view, and manage your income sources with ease.
                        </p>
                    </div>
                    <div className="p-6 bg-purple-100 rounded-xl shadow">
                        <h4 className="text-xl font-semibold text-purple-600">📉 Manage Expenses</h4>
                        <p className="mt-2 text-gray-600">
                            Categorize and monitor expenses to control spending.
                        </p>
                    </div>
                    <div className="p-6 bg-purple-100 rounded-xl shadow">
                        <h4 className="text-xl font-semibold text-purple-600">📊 Smart Dashboard</h4>
                        <p className="mt-2 text-gray-600">
                            Visualize income vs expenses and download Excel reports.
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-10">
                <p className="text-lg text-center max-w-[50vw] text-gray-200 mb-5">
                    With <span className="font-semibold text-purple-400">MoneyManager</span>, you can easily add and organize your income and expenses under custom categories. Effortlessly filter transactions by date or sort them in ascending and descending order for better insights. Stay on top of your finances with clear, interactive visuals — from monthly income vs. expense graphs to detailed pie charts that show exactly where your money goes.
                </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto bg-gray-900 text-gray-200 py-6 text-center">
                <p>© {new Date().getFullYear()} MoneyManager. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
