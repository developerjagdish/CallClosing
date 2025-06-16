import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Award, 
  Target,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Zap,
  Globe,
  Heart
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Scene } from '@/components/ui/rubiks-cube';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const team = [
    {
      name: 'Sarah Chen',
      title: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: '15+ years in real estate tech, former VP at Zillow',
      color: 'from-brand-purple to-brand-blue'
    },
    {
      name: 'Marcus Rodriguez',
      title: 'CTO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'AI/ML expert, previously led engineering at HubSpot',
      color: 'from-brand-blue to-brand-cyan'
    },
    {
      name: 'Emily Johnson',
      title: 'Head of Customer Success',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Real estate broker turned tech advocate, 200+ agent success stories',
      color: 'from-brand-cyan to-brand-emerald'
    },
    {
      name: 'David Kim',
      title: 'VP of Engineering',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Scaling expert, built systems for millions of daily calls',
      color: 'from-accent-gold to-accent-rose'
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Every feature we build is designed to increase your conversion rates and close more deals.',
      color: 'from-brand-purple to-brand-blue'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Your data and your clients\' information are protected with enterprise-grade security.',
      color: 'from-brand-blue to-brand-cyan'
    },
    {
      icon: Users,
      title: 'Agent-Centric',
      description: 'Built by real estate professionals, for real estate professionals who understand the hustle.',
      color: 'from-brand-cyan to-brand-emerald'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We\'re constantly pushing the boundaries of what AI can do for real estate prospecting.',
      color: 'from-accent-gold to-accent-rose'
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users', icon: Users },
    { value: '2M+', label: 'Calls Made', icon: Phone },
    { value: '68%', label: 'Avg. Connect Rate', icon: Target },
    { value: '$50M+', label: 'In Closed Deals', icon: Award },
  ];

  const faqs = [
    {
      question: 'How does CallClosing AI protect my data?',
      answer: 'We use enterprise-grade encryption, SOC 2 Type II compliance, and follow all real estate industry regulations. Your leads and call data are stored securely and never shared with third parties.',
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We offer email support for all plans, priority support for Professional users, and dedicated success managers for Enterprise clients. Our average response time is under 2 hours during business hours.',
    },
    {
      question: 'How long is the free trial?',
      answer: 'All new users get a 14-day free trial with full access to our Professional features and up to 50 calls. No credit card required to start.',
    },
    {
      question: 'Can I integrate with my existing CRM?',
      answer: 'Yes! We integrate with all major real estate CRMs including HubSpot, Salesforce, Pipedrive, Chime, Follow Up Boss, and many others. Custom integrations are available for Enterprise clients.',
    },
    {
      question: 'Is there a setup fee or long-term contract?',
      answer: 'No setup fees and no long-term contracts required. You can upgrade, downgrade, or cancel your subscription at any time. We believe in earning your business every month.',
    },
    {
      question: 'How quickly can I get started?',
      answer: 'Most agents are making their first AI-powered calls within 15 minutes of signing up. Our onboarding process is designed to get you results fast.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 min-h-screen pt-20">
      {/* Hero Section with Rubik's Cube Background */}
      <section className="py-20 relative overflow-hidden min-h-[60vh]">
        {/* Rubik's Cube Background */}
        <div className="absolute inset-0 opacity-20">
          <Scene />
        </div>
        
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-brand-blue/5 to-brand-cyan/10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 rounded-full border border-brand-purple/30 backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4 text-brand-purple mr-2 animate-pulse" />
              <span className="text-sm font-medium text-brand-purple">About CallClosing AI</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Revolutionizing Real Estate <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">Prospecting</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              CallClosing AI was born from the frustration of real estate professionals who were tired of 
              manual dialing, poor conversion rates, and missed opportunities. We're on a mission to help 
              every agent become a closing machine.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-dark-800/50 to-dark-700/50">
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

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-dark-800/50 to-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <Heart className="h-8 w-8 text-brand-purple mr-3" />
                Our Mission
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We believe every real estate professional deserves the tools to succeed in today's 
                competitive market. That's why we've built the most intelligent, user-friendly 
                calling platform that turns prospects into closings.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our AI doesn't replace the human connection—it enhances it. We give you the 
                confidence, timing, and insights to have better conversations that lead to more deals.
              </p>
            </div>
            <div className="animate-fade-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent mb-2">
                          {stat.value}
                        </div>
                        <div className="text-gray-400 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" 
                       style={{ background: `linear-gradient(135deg, ${value.color.split(' ')[1]}, ${value.color.split(' ')[3]})` }}></div>
                  <div className={`relative bg-gradient-to-r ${value.color} p-4 rounded-2xl w-fit mx-auto group-hover:shadow-glow transition-all duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-blue group-hover:bg-clip-text transition-all duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-dark-800/50 to-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet the <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real estate veterans and tech innovators working together to transform your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="group text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-xl" 
                       style={{ background: `linear-gradient(135deg, ${member.color.split(' ')[1]}, ${member.color.split(' ')[3]})` }}></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-32 h-32 rounded-full mx-auto border-4 border-transparent bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 p-1 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-blue group-hover:bg-clip-text transition-all duration-300">
                  {member.name}
                </h3>
                <p className={`font-medium mb-3 bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                  {member.title}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-dark-900 to-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">Everything you need to know about CallClosing AI</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300 group"
                >
                  <span className="text-white font-medium group-hover:text-brand-purple transition-colors duration-300">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 ml-4">
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-brand-purple transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-brand-purple transition-colors duration-300" />
                    )}
                  </div>
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-4 animate-fade-in-down">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full border border-white/30 backdrop-blur-sm mb-6">
            <Globe className="h-4 w-4 text-white mr-2 animate-bounce-gentle" />
            <span className="text-sm font-medium text-white">Ready to Transform Your Business?</span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Thousands of Successful Agents
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start using CallClosing AI today and see the difference AI-powered calling can make for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="secondary" className="bg-white text-brand-purple hover:bg-gray-100 shadow-2xl" size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-purple" size="lg">
              Schedule Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white/80">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              support@callclosing.ai
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              (555) 123-CALL
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              San Francisco, CA
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}