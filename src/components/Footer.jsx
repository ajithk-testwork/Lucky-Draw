import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  Calendar,
  Users
} from 'lucide-react';
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const footerLinks = {
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/team' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' }
      ]
    },
    services: {
      title: 'Services',
      links: [
        { name: 'Event Registration', path: '/services/registration' },
        { name: 'Lucky Draw System', path: '/services/lucky-draw' },
        { name: 'Food Management', path: '/services/food-management' },
        { name: 'Event Dashboard', path: '/services/dashboard' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' }
      ]
    }
  };

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: '#',
      color: 'hover:bg-blue-100 hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: '#',
      color: 'hover:bg-sky-100 hover:text-sky-500'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#',
      color: 'hover:bg-pink-100 hover:text-pink-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: '#',
      color: 'hover:bg-blue-100 hover:text-blue-700'
    }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: '123 Event Street, San Francisco, CA 94105'
    },
    {
      icon: Phone,
      text: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: Mail,
      text: 'hello@regeve.com',
      href: 'mailto:hello@regeve.com'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Events Managed', icon: Calendar },
    { number: '50K+', label: 'Participants', icon: Users },
    { number: '8', label: 'Cities', icon: MapPin }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-white border-t border-gray-200">
   

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={Logo}
                alt="Regeve Logo"
                className="w-16 h-12"
              />
              <span className="text-xl font-bold text-gray-900">Regeve</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Creating unforgettable event experiences with seamless registration, 
              interactive lucky draws, and smart food management solutions.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                >
                  <item.icon className="w-4 h-4 text-gray-400" />
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <motion.div key={key} variants={itemVariants}>
              <h4 className="font-semibold text-gray-900 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.path)}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm text-left hover:underline cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <div className="text-gray-500 text-sm flex items-center">
            © {currentYear} Regeve. Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for amazing event experiences.
          </div>

          {/* Social Links */}
          <div className="flex space-x-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 transition-all duration-200 ${social.color}`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      
    </footer>
  );
};

export default Footer;