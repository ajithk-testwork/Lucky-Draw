import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  LogIn,
  Menu,
  X
} from 'lucide-react';
import Login from '../page/Auth/Login';
import Register from '../page/Auth/Register';
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    type: 'login' // 'login' or 'register'
  });

  const openLogin = () => setAuthModal({ isOpen: true, type: 'login' });
  const openRegister = () => setAuthModal({ isOpen: true, type: 'register' });
  const closeAuth = () => setAuthModal({ isOpen: false, type: 'login' });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();


  const navItems = [
    { name: 'Home', path: "/" },
    { name: 'About Us', path: "/about" },
    { name: 'Contact', path: "/contact" },
    { name: 'DashBoard', path: "/dashboard" }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -20
    },
    open: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white backdrop-blur-md border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                {/* Logo Image */}
                <img
                  src={Logo}     // <-- add your imported image here
                  alt="Regeve Logo"
                  className="w-20 h-15 "
                />


              </div>

             
            </motion.div>


            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => navigate(item.path)}
                  className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                </motion.a>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                onClick={openLogin}
                className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </motion.button>
              <motion.button
                onClick={openRegister}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Register</span>
                </div>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden bg-white border-t border-gray-200"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <div className="py-4 space-y-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium"
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </motion.a>
                  ))}

                  <div className="border-t border-gray-200 pt-4 px-4 space-y-3">
                    <motion.button
                      onClick={() => {
                        openLogin();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                      variants={itemVariants}
                      transition={{ delay: 0.3 }}
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        openRegister();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
                      variants={itemVariants}
                      transition={{ delay: 0.4 }}
                    >
                      <User className="w-4 h-4" />
                      <span>Register</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Auth Modals */}
      <AnimatePresence>
        {authModal.isOpen && authModal.type === 'login' && (
          <Login
            onClose={closeAuth}
            onSwitchToRegister={openRegister}
          />
        )}
        {authModal.isOpen && authModal.type === 'register' && (
          <Register
            onClose={closeAuth}
            onSwitchToLogin={openLogin}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;