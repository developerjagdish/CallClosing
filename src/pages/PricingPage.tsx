import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, HelpCircle, ChevronDown, ChevronUp, Zap, Crown, Rocket } from 'lucide-react';
import Button from '../components/ui/Button';
import { Scene } from '@/components/ui/rubiks-cube';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for new agents getting started',
      monthlyPrice: 49,
      annualPrice: 42,
      calls: '100 calls/month',
      icon: Zap,
      color: 'from-brand-blue to-brand-cyan',
      features: [
        'Basic AI scripts',
        'Email support',
        'Call recording',
        'Basic analytics',
        'CRM integration',
        'Local caller ID',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Best for active real estate professionals',
      monthlyPrice: 129,
      annualPrice: 110,
      calls: '1,000 calls/month',
      icon: Crown,
      color: 'from-brand-purple to-brand-blue',
      features: [
        'Advanced AI scripts',
        'Priority support',
        'Call recording & transcription',
        'Advanced analytics',
        'All CRM integrations',
        'Local caller ID',
        'Auto-followups',
        'Smart call routing',
        'Custom scripts',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For teams and brokerages',
      monthlyPrice: null,
      annualPrice: null,
      calls: 'Unlimited calls',
      icon: Rocket,
      color: 'from-brand-cyan to-brand-emerald',
      features: [
        'Everything in Professional',
        'Dedicated success manager',
        'Custom integrations',
        'White-label options',
        'Advanced reporting',
        'Team management',
        'API access',
        'SLA guarantee',
      ],
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'What counts as a call?',
      answer: 'A call is counted when our system successfully dials a number, regardless of whether someone answers. Busy signals, voicemails, and answered calls all count toward your monthly limit.',
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes! You can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at your next billing cycle. We\'ll prorate any charges appropriately.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption, SOC 2 Type II compliance, and follow all real estate industry regulations. Your leads and call data are completely secure and private.',
    },
    {
      question: 'What CRM integrations do you support?',
      answer: 'We integrate with all major CRMs including HubSpot, Salesforce, Pipedrive, Chime, Follow Up Boss, and many others. Our Professional and Enterprise plans include custom integration support.',
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes! All plans come with a 14-day free trial. No credit card required to start. You can test all features and make up to 50 calls during your trial period.',
    },
    {
      question: 'What happens if I exceed my call limit?',
      answer: 'We\'ll notify you when you\'re approaching your limit. You can either upgrade your plan or purchase additional call credits at $0.15 per call. Your service won\'t be interrupted.',
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
              <Star className="h-4 w-4 text-brand-purple mr-2 animate-pulse" />
              <span className="text-sm font-medium text-brand-purple">Simple, Transparent Pricing</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">Success Plan</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Scale your real estate business with plans designed for every stage of growth. 
              All plans include our core AI-powered calling features.
            </p>
            
            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className={`mr-4 font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-7 w-14 items-center rounded-full bg-gradient-to-r from-slate-700 to-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-dark-900"
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-gradient-to-r from-brand-purple to-brand-blue transition-transform shadow-lg${
                    isAnnual ? ' translate-x-8' : ' translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-4 font-medium ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
                Annual
                <span className="ml-2 text-sm bg-gradient-to-r from-brand-emerald to-brand-cyan bg-clip-text text-transparent font-bold">
                  Save 15%
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`
                  relative group animate-fade-in-up
                  ${plan.popular 
                    ? 'lg:scale-105 lg:-mt-4' 
                    : ''
                  }
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center shadow-glow animate-bounce-gentle">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`
                  relative bg-gradient-to-br from-dark-800/80 to-dark-700/80 backdrop-blur-lg 
                  rounded-3xl border-2 p-8 transition-all duration-500 group-hover:transform group-hover:scale-105
                  ${plan.popular 
                    ? 'border-brand-purple shadow-glow' 
                    : 'border-white/10 hover:border-white/20'
                  }
                `}>
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl mb-4 group-hover:shadow-glow transition-all duration-300`}>
                      <plan.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-6">{plan.description}</p>
                    
                    <div className="mb-4">
                      {plan.monthlyPrice ? (
                        <>
                          <div className="flex items-baseline justify-center">
                            <span className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                              ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                            </span>
                            <span className="text-gray-400 ml-2">/month</span>
                          </div>
                          {isAnnual && (
                            <div className="text-sm bg-gradient-to-r from-brand-emerald to-brand-cyan bg-clip-text text-transparent font-semibold mt-2">
                              Save ${(plan.monthlyPrice - plan.annualPrice!) * 12}/year
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          Custom
                        </div>
                      )}
                    </div>
                    
                    <p className={`font-medium bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      {plan.calls}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center group/item">
                        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-brand-emerald to-brand-cyan rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-200">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-300 group-hover/item:text-white transition-colors duration-200">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    {plan.name === 'Enterprise' ? (
                      <Button 
                        variant={plan.popular ? 'gradient' : 'outline'} 
                        className="w-full"
                        size="lg"
                      >
                        Contact Sales
                      </Button>
                    ) : (
                      <Link to="/signup">
                        <Button 
                          variant={plan.popular ? 'gradient' : 'outline'} 
                          className="w-full"
                          size="lg"
                        >
                          Choose {plan.name}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-dark-800/50 to-dark-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">Everything you need to know about our pricing and features</p>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our team is here to help you choose the right plan for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" className="bg-white text-brand-purple hover:bg-gray-100 shadow-2xl" size="lg">
              <HelpCircle className="h-5 w-5 mr-2" />
              Contact Support
            </Button>
            <Link to="/signup">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-purple" size="lg">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}