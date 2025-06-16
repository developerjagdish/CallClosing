import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone, CheckCircle, Sparkles, Zap, Shield, Users, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { Scene } from '@/components/ui/rubiks-cube';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || !formData.name) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const { success, error: authError } = await signup(
      formData.email, 
      formData.password, 
      formData.name, 
      formData.company
    );
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError(authError || 'Signup failed');
    }
  };

  const benefits = [
    { icon: Phone, text: 'Make up to 50 calls free' },
    { icon: Zap, text: 'Access to AI-powered scripts' },
    { icon: Shield, text: 'Basic CRM integrations' },
    { icon: Users, text: 'Call recording & analytics' },
    { icon: CheckCircle, text: '14 days full access' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Rubik's Cube Background */}
      <div className="absolute inset-0 opacity-15">
        <Scene />
      </div>
      
      {/* Animated Background Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-brand-blue/5 to-brand-cyan/10"></div>
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          >
            <div className="w-1 h-1 bg-brand-purple/20 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="relative max-w-md w-full space-y-8 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="bg-gradient-to-r from-brand-purple to-brand-blue p-4 rounded-2xl shadow-glow">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-accent-gold animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Get started free
          </h2>
          <p className="mt-2 text-gray-400">Create your CallClosing AI account</p>
        </div>

        {/* Signup Form */}
        <div className="bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg rounded-2xl border border-white/10 p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-gradient-to-r from-red-500/20 to-red-400/20 border border-red-500/30 rounded-xl p-4 animate-fade-in">
                <p className="text-red-400 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800/80 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800/80 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company (optional)
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800/80 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Your brokerage or company"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-800/80 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent backdrop-blur-sm transition-all duration-300 pr-12"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters long</p>
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-purple hover:text-brand-purple-light font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
          <h3 className="text-white font-semibold mb-4 text-center">What you get with your free trial:</h3>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li 
                key={index} 
                className="flex items-center text-sm text-gray-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 p-2 rounded-lg mr-3 flex-shrink-0">
                  <benefit.icon className="h-4 w-4 text-brand-purple" />
                </div>
                {benefit.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Trust indicators */}
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-sm">
            Join 10,000+ real estate professionals
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-600">
            <span>• No credit card required</span>
            <span>• Cancel anytime</span>
            <span>• 30-day money back</span>
          </div>
        </div>
      </div>
    </div>
  );
}