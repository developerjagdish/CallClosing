import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Users, 
  Clock, 
  TrendingUp, 
  Upload, 
  Plus, 
  Calendar,
  Search,
  Bell,
  Filter,
  MoreVertical,
  Play,
  Pause,
  BarChart3,
  Zap,
  Target,
  Award,
  Activity,
  PhoneCall,
  UserCheck,
  Timer,
  DollarSign,
  Settings,
  FileText,
  Database
} from 'lucide-react';
import Button from '../components/ui/Button';
import CSVUpload from '../components/ui/csv-upload';
import VAPISettings from '../components/ui/vapi-settings';
import VAPIAnalytics from '../components/ui/vapi-analytics';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDialing, setIsDialing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prospects, setProspects] = useState<any[]>([]);
  const [isLoadingProspects, setIsLoadingProspects] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeTab === 'prospects') {
      loadProspects();
    }
  }, [activeTab, user]);

  const loadProspects = async () => {
    if (!user) return;

    setIsLoadingProspects(true);
    try {
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error loading prospects:', error);
      } else {
        setProspects(data || []);
      }
    } catch (error) {
      console.error('Error loading prospects:', error);
    } finally {
      setIsLoadingProspects(false);
    }
  };

  const stats = [
    { 
      label: 'Total Prospects', 
      value: prospects.length.toString(), 
      change: '+12%', 
      icon: Users, 
      color: 'from-brand-blue to-brand-cyan',
      trend: 'up'
    },
    { 
      label: 'Pending Calls', 
      value: prospects.filter(p => p.call_status === 'pending').length.toString(), 
      change: '+5%', 
      icon: Phone, 
      color: 'from-brand-emerald to-brand-cyan',
      trend: 'up'
    },
    { 
      label: 'Completed', 
      value: prospects.filter(p => p.call_status === 'completed').length.toString(), 
      change: '+15%', 
      icon: Clock, 
      color: 'from-brand-purple to-brand-blue',
      trend: 'up'
    },
    { 
      label: 'Success Rate', 
      value: '68%', 
      change: '+23%', 
      icon: TrendingUp, 
      color: 'from-accent-gold to-accent-rose',
      trend: 'up'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 text-emerald-400 border-emerald-500/30';
      case 'pending': return 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-gradient-to-r from-red-500/20 to-red-400/20 text-red-400 border-red-500/30';
      default: return 'bg-gradient-to-r from-gray-500/20 to-gray-400/20 text-gray-400 border-gray-500/30';
    }
  };

  const toggleDialing = () => {
    setIsDialing(!isDialing);
  };

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'prospects', label: 'Prospects', icon: Users },
    { id: 'upload', label: 'Upload CSV', icon: Upload },
    { id: 'analytics', label: 'VAPI Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleUploadComplete = (count: number) => {
    setShowUploadModal(false);
    if (activeTab === 'prospects') {
      loadProspects();
    }
    // Show success message or notification
  };

  return (
    <div className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 min-h-screen flex pt-20">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-dark-900/95 to-dark-800/95 backdrop-blur-lg border-r border-white/10 flex flex-col fixed left-0 top-20 bottom-0 z-30">
        <div className="p-6">
          <div className="mb-8">
            <div className="text-sm text-gray-400 mb-1">Current Time</div>
            <div className="text-lg font-semibold text-white">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-300 group
                  ${activeTab === item.id
                    ? 'bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-glow'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <item.icon className={`h-5 w-5 mr-3 transition-transform duration-300 ${
                  activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'
                }`} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Bar */}
        <header className="bg-gradient-to-r from-dark-900/95 to-dark-800/95 backdrop-blur-lg border-b border-white/10 px-6 py-4 sticky top-20 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              {activeTab === 'prospects' && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search prospects..."
                    className="bg-dark-800/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {activeTab === 'prospects' && (
                <Button
                  size="sm"
                  icon={Upload}
                  variant="gradient"
                  onClick={() => setShowUploadModal(true)}
                >
                  Upload CSV
                </Button>
              )}
              <button className="relative text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-red-400 rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="group bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:shadow-glow transition-all duration-300`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
                        stat.trend === 'up' ? 'text-emerald-400 bg-emerald-400/20' : 'text-red-400 bg-red-400/20'
                      }`}>
                        {stat.change}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-blue group-hover:bg-clip-text transition-all duration-300">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Action Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Dialer */}
                <div className="lg:col-span-2 bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg rounded-2xl p-6 border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-brand-purple" />
                      Live Call Session
                    </h2>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      <span className="text-emerald-400 text-sm font-medium">Ready</span>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <div className="mb-6">
                      <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${
                        isDialing ? 'from-red-500 to-red-600' : 'from-brand-purple to-brand-blue'
                      } flex items-center justify-center mb-4 transition-all duration-300 ${
                        isDialing ? 'animate-pulse' : 'hover:shadow-glow'
                      }`}>
                        {isDialing ? (
                          <Pause className="h-10 w-10 text-white" />
                        ) : (
                          <Phone className="h-10 w-10 text-white" />
                        )}
                      </div>
                    </div>
                    
                    <Button
                      size="lg"
                      onClick={toggleDialing}
                      variant={isDialing ? 'secondary' : 'gradient'}
                      className={`mb-4 ${isDialing ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' : ''}`}
                    >
                      {isDialing ? 'End Call' : 'Dial Next Prospect'}
                    </Button>
                    
                    {isDialing && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-dark-900/80 to-dark-800/80 rounded-xl border border-white/10 animate-fade-in">
                        <div className="flex items-center justify-center mb-2">
                          <div className="w-3 h-3 bg-brand-purple rounded-full animate-pulse mr-2"></div>
                          <span className="text-brand-purple font-medium">Connecting...</span>
                        </div>
                        <p className="text-white font-semibold">Calling: Next Prospect</p>
                        <p className="text-gray-400">(555) 123-4567</p>
                        <div className="mt-3 flex justify-center space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-brand-purple rounded-full animate-bounce"
                              style={{ animationDelay: `${i * 0.2}s` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Script Panel */}
                <div className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg rounded-2xl p-6 border border-white/10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-accent-gold" />
                    AI Script
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-dark-900/60 to-dark-800/60 p-4 rounded-xl border border-brand-purple/20">
                      <p className="text-brand-purple font-medium mb-2 flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        Opening:
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        "Hi [Name], this is [Your Name] from [Company]. I hope I'm catching you at a good time. 
                        I noticed you were looking at properties in the downtown area..."
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-dark-900/60 to-dark-800/60 p-4 rounded-xl border border-brand-blue/20">
                      <p className="text-brand-blue font-medium mb-2 flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        Next Steps:
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Ask about timeline, budget confirmation, and schedule showing for 3 properties that match their criteria.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <Button icon={Upload} variant="outline" className="hover:shadow-glow" onClick={() => setShowUploadModal(true)}>Upload CSV</Button>
                <Button icon={Plus} variant="outline" className="hover:shadow-glow">Create Script</Button>
                <Button icon={Calendar} variant="outline" className="hover:shadow-glow">Schedule Follow-up</Button>
                <Button icon={Filter} variant="outline" className="hover:shadow-glow">Filter Prospects</Button>
              </div>
            </div>
          )}

          {activeTab === 'prospects' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Prospect Management</h2>
                <div className="flex items-center space-x-4">
                  <Button icon={Upload} variant="outline" size="sm" onClick={() => setShowUploadModal(true)}>Import CSV</Button>
                  <Button icon={Plus} size="sm" variant="gradient">Add Prospect</Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-dark-800/60 to-dark-700/60 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
                {isLoadingProspects ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading prospects...</p>
                  </div>
                ) : prospects.length === 0 ? (
                  <div className="p-8 text-center">
                    <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">No prospects found</p>
                    <Button icon={Upload} variant="gradient" onClick={() => setShowUploadModal(true)}>
                      Upload Your First CSV
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-dark-900/80 to-dark-800/80">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            <input type="checkbox" className="rounded border-gray-600 bg-dark-700 text-brand-purple focus:ring-brand-purple" />
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Property</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {prospects.map((prospect, index) => (
                          <tr 
                            key={prospect.id} 
                            className="hover:bg-white/5 transition-colors duration-200 animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input type="checkbox" className="rounded border-gray-600 bg-dark-700 text-brand-purple focus:ring-brand-purple" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-brand-purple to-brand-blue rounded-full flex items-center justify-center mr-3">
                                  <span className="text-white font-semibold text-sm">
                                    {prospect.owner_name?.split(' ').map((n: string) => n[0]).join('') || 'N/A'}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-white">{prospect.owner_name || 'N/A'}</div>
                                  <div className="text-sm text-gray-400">{prospect.phone_number || 'No phone'}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-white max-w-xs truncate">{prospect.property_address || 'N/A'}</div>
                              {prospect.email && (
                                <div className="text-sm text-gray-400">{prospect.email}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(prospect.call_status)}`}>
                                {prospect.call_status || 'pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {new Date(prospect.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button size="sm" icon={Phone} variant="gradient">Call</Button>
                                <button className="text-gray-400 hover:text-white p-1 rounded transition-colors">
                                  <MoreVertical className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="animate-fade-in-up">
              <CSVUpload onUploadComplete={handleUploadComplete} />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="animate-fade-in-up">
              <VAPIAnalytics />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-fade-in-up">
              <VAPISettings onSettingsSaved={() => {
                // Refresh analytics if needed
                if (activeTab === 'analytics') {
                  // Trigger analytics refresh
                }
              }} />
            </div>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <MoreVertical className="h-5 w-5 transform rotate-45" />
              </button>
              <CSVUpload onUploadComplete={handleUploadComplete} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}