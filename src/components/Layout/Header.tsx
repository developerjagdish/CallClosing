import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Menu, X, User, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowLogoutModal(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-dark-900/95 backdrop-blur-lg border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
        }
      `}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="bg-gradient-to-r from-brand-purple to-brand-blue p-2.5 rounded-xl group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-110">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-accent-gold animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CallClosing AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { path: '/', label: 'Home' },
                { path: '/pricing', label: 'Pricing' },
                { path: '/about', label: 'About' },
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`
                    relative text-sm font-medium transition-all duration-300 group
                    ${isActive(item.path) 
                      ? 'text-brand-purple' 
                      : 'text-gray-300 hover:text-white'
                    }
                  `}
                >
                  {item.label}
                  <span className={`
                    absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-blue
                    transition-all duration-300 group-hover:w-full
                    ${isActive(item.path) ? 'w-full' : ''}
                  `} />
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/dashboard" 
                    className={`
                      relative text-sm font-medium transition-all duration-300 group
                      ${isActive('/dashboard') 
                        ? 'text-brand-purple' 
                        : 'text-gray-300 hover:text-white'
                      }
                    `}
                  >
                    Dashboard
                    <span className={`
                      absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-blue
                      transition-all duration-300 group-hover:w-full
                      ${isActive('/dashboard') ? 'w-full' : ''}
                    `} />
                  </Link>
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 group"
                    >
                      <div className="bg-gradient-to-r from-brand-purple to-brand-blue p-2 rounded-full group-hover:shadow-glow transition-all duration-300">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium">{user?.name}</span>
                    </button>
                    
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-dark-800/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 py-2 animate-fade-in-down">
                        <button
                          onClick={() => setShowLogoutModal(true)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/login" 
                    className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link to="/signup">
                    <button className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-glow transform hover:scale-105">
                      Get Started Free
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4 animate-fade-in-down">
              <div className="flex flex-col space-y-4">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/pricing', label: 'Pricing' },
                  { path: '/about', label: 'About' },
                ].map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`text-sm font-medium transition-colors ${
                      isActive(item.path) ? 'text-brand-purple' : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className={`text-sm font-medium transition-colors ${
                        isActive('/dashboard') ? 'text-brand-purple' : 'text-gray-300 hover:text-white'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setShowLogoutModal(true);
                        setIsMenuOpen(false);
                      }}
                      className="text-sm font-medium text-gray-300 hover:text-white text-left transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-glow inline-block text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-dark-800/95 backdrop-blur-lg rounded-2xl border border-white/10 p-6 max-w-sm w-full shadow-2xl animate-scale-in">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to log out?</p>
            <div className="flex space-x-3">
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-glow flex-1"
              >
                Log Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}