import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Play, 
  Zap, 
  Database, 
  BarChart3, 
  Users, 
  Clock, 
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Target,
  Rocket,
  Award,
  Globe,
  MessageSquare
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Scene } from '@/components/ui/rubiks-cube';

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const heroTexts = [
    'One-click Real Estate Outreach',
    'AI-Powered Lead Generation',
    'Smart Calling Automation',
    'Intelligent Prospect Management'
  ];

  useEffect(() => {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typeText = () => {
      const currentText = heroTexts[currentTextIndex];
      
      if (!isDeleting) {
        setTypedText(currentText.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      } else {
        setTypedText(currentText.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
        }
      }
    };

    const interval = setInterval(typeText, isDeleting ? 50 : 100);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: Zap,
      title: 'AI-Driven Scripts',
      description: 'Perfectly-timed, personalized call scripts that adapt to each prospect in real-time.',
      color: 'from-brand-purple to-brand-blue',
      delay: '0s'
    },
    {
      icon: Database,
      title: 'Seamless CRM Sync',
      description: 'One-click import/export with top CRMs. Your data flows effortlessly.',
      color: 'from-brand-blue to-brand-cyan',
      delay: '0.2s'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Insights',
      description: 'Live dashboards show call success rates, conversion metrics, and ROI instantly.',
      color: 'from-brand-cyan to-brand-emerald',
      delay: '0.4s'
    },
  ];

  const features = [
    { icon: Phone, title: 'Bulk Dialer', description: 'Call hundreds of leads with one click', color: 'text-brand-purple' },
    { icon: Users, title: 'Smart Call Routing', description: 'AI routes calls to maximize connections', color: 'text-brand-blue' },
    { icon: Clock, title: 'Auto-Followups', description: 'Never miss a follow-up opportunity', color: 'text-brand-cyan' },
    { icon: Shield, title: 'Local Caller ID', description: 'Display local numbers for better pickup rates', color: 'text-brand-emerald' },
    { icon: Target, title: 'Lead Scoring', description: 'AI prioritizes your hottest prospects', color: 'text-accent-gold' },
    { icon: MessageSquare, title: 'Call Recording', description: 'Automatic transcription and analysis', color: 'text-brand-pink' },
    { icon: Globe, title: 'Multi-Market', description: 'Manage leads across different markets', color: 'text-accent-teal' },
    { icon: Award, title: 'Performance Tracking', description: 'Detailed analytics and reporting', color: 'text-accent-rose' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'Top Producer, Century 21',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'CallClosing AI tripled my connection rates. I\'m closing 40% more deals this quarter.',
      rating: 5,
      metric: '+240% ROI'
    },
    {
      name: 'Mike Rodriguez',
      title: 'Broker Owner, RE/MAX',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'The AI scripts are incredible. My team sounds more professional and converts better.',
      rating: 5,
      metric: '+180% Conversions'
    },
    {
      name: 'Lisa Chen',
      title: 'Luxury Agent, Compass',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'ROI was immediate. Paid for itself in the first week with just two extra closings.',
      rating: 5,
      metric: '+$50K Revenue'
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users', icon: Users },
    { value: '2.5M+', label: 'Calls Made', icon: Phone },
    { value: '68%', label: 'Connect Rate', icon: TrendingUp },
    { value: '$50M+', label: 'Revenue Generated', icon: Rocket },
  ];

  const partners = [
    'Zillow', 'Realtor.com', 'MLS', 'HubSpot', 'Salesforce', 'Pipedrive'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 min-h-screen">
      {/* Hero Section with Rubik's Cube Background */}
      <section className="relative overflow-hidden pt-20 min-h-screen">
        {/* Rubik's Cube Background - Only in Hero Section */}
        <div className="absolute inset-0 opacity-30">
          <Scene />
        </div>
        
        {/* Animated Background Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 via-brand-blue/10 to-brand-cyan/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(50)].map((_, i) => (
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
                <div className="w-1 h-1 bg-brand-purple/30 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 rounded-full border border-brand-purple/30 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-brand-purple mr-2 animate-pulse" />
                <span className="text-sm font-medium text-brand-purple">AI-Powered Real Estate Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {typedText}
                </span>
                <span className="animate-pulse text-brand-purple">|</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Instantly connect with thousands of hot leads via AI-powered calling. 
                Turn prospects into closings with intelligent automation that actually works.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="xl" variant="gradient" className="w-full sm:w-auto group">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl" icon={Play} className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-emerald mr-2" />
                  Free 14-day trial
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-emerald mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-brand-emerald mr-2" />
                  Cancel anytime
                </div>
              </div>
            </div>
            
            <div className="lg:text-center animate-fade-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-2xl">
                  <div className="bg-gradient-to-br from-dark-900/90 to-dark-800/90 rounded-2xl p-6 shadow-inner">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white font-semibold flex items-center">
                        <div className="w-3 h-3 bg-brand-emerald rounded-full mr-2 animate-pulse"></div>
                        Live Dashboard
                      </h3>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-accent-gold rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-3 h-3 bg-brand-emerald rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Calls Today</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent animate-glow">247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Connect Rate</span>
                        <span className="text-2xl font-bold text-brand-emerald animate-pulse">68%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Conversions</span>
                        <span className="text-2xl font-bold text-brand-cyan animate-bounce-gentle">23</span>
                      </div>
                      <div className="w-full bg-dark-700 rounded-full h-2 mt-4">
                        <div className="bg-gradient-to-r from-brand-purple to-brand-blue h-2 rounded-full animate-pulse" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <Button className="w-full mt-6" size="md" variant="gradient">
                      <Phone className="h-4 w-4 mr-2" />
                      Dial Next Prospect
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-dark-800/50 to-dark-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 rounded-2xl mb-4 group hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-brand-purple group-hover:text-brand-blue transition-colors" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">CallClosing AI</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform your real estate business with AI-powered calling that delivers real results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: benefit.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" 
                     style={{ background: `linear-gradient(135deg, ${benefit.color.split(' ')[1]}, ${benefit.color.split(' ')[3]})` }}></div>
                <div className="relative bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className={`bg-gradient-to-r ${benefit.color} p-4 rounded-xl w-fit mb-6 group-hover:shadow-glow transition-all duration-300`}>
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-blue group-hover:bg-clip-text transition-all duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features Built for <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">Results</span>
            </h2>
            <p className="text-xl text-gray-400">Everything you need to dominate your market</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className={`h-8 w-8 ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-blue group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">Top Performers</span>
            </h2>
            <p className="text-xl text-gray-400">See what real estate professionals are saying</p>
          </div>

          {/* Partners */}
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-gray-400 mb-8">Integrates with your favorite tools</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {partners.map((partner, index) => (
                <div 
                  key={index} 
                  className="text-gray-400 font-semibold text-lg hover:text-brand-purple transition-colors duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg p-8 rounded-2xl border border-white/10 text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-accent-gold fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-xl text-gray-300 mb-6 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center justify-center space-x-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full border-2 border-brand-purple"
                        />
                        <div className="text-left">
                          <p className="text-white font-semibold">{testimonial.name}</p>
                          <p className="text-gray-400 text-sm">{testimonial.title}</p>
                        </div>
                        <div className="bg-gradient-to-r from-brand-purple to-brand-blue px-3 py-1 rounded-full">
                          <span className="text-white text-sm font-semibold">{testimonial.metric}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-brand-purple shadow-glow' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm mb-6">
            <Rocket className="h-4 w-4 text-white mr-2 animate-bounce-gentle" />
            <span className="text-sm font-medium text-white">Ready to Transform Your Business?</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join 10,000+ Successful Agents Using CallClosing AI
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Stop wasting time on manual dialing. Start closing more deals with AI-powered calling 
            that actually works. Your competition is already using it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/signup">
              <Button size="xl" variant="secondary" className="bg-white text-brand-purple hover:bg-gray-100 shadow-2xl">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-purple">
                View Pricing
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white/80">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}