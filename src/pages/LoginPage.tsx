import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone, Sparkles, Shield, Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { Scene } from '@/components/ui/rubiks-cube';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const { success, error: authError } = await login(email, password);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError(authError || 'Login failed');
    }
  };

  const features = [
    { icon: Zap, text: 'AI-powered calling scripts' },
    { icon: Shield, text: 'Enterprise-grade security' },
    { icon: Phone, text: 'Seamless CRM integration' },
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
        {[...Array(30)].map((_, i) => (
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
            Welcome back
          </h2>
          <p className="mt-2 text-gray-400">Sign in to your CallClosing AI account</p>
        </div>

        {/* Login Form */}
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-800/80 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800/80 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent backdrop-blur-sm transition-all duration-300 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 bg-dark-800 border-white/20 rounded text-brand-purple focus:ring-brand-purple focus:ring-offset-dark-900"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-brand-purple hover:text-brand-purple-light transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-purple hover:text-brand-purple-light font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
          <h3 className="text-white font-semibold mb-4 text-center">Why choose CallClosing AI?</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center text-sm text-gray-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 p-2 rounded-lg mr-3">
                  <feature.icon className="h-4 w-4 text-brand-purple" />
                </div>
                {feature.text}
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-sm">
            Trusted by 10,000+ real estate professionals
          </p>
          <div className="flex justify-center space-x-4 text-xs text-gray-600">
            <span>• SOC 2 Compliant</span>
            <span>• 256-bit SSL</span>
            <span>• GDPR Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}