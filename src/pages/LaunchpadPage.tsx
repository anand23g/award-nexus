import { useNavigate } from "react-router-dom";
import { LaunchpadTile } from "@/components/ui/launchpad-tile";
import { useAwardsStore } from "@/store/awards";
import { Settings, Users, Award, Trophy, Star, Target, Home, Calendar, BarChart3, Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LaunchpadPage() {
  const navigate = useNavigate();
  const { setRole } = useAwardsStore();

  const handleRoleSelection = (role: 'admin' | 'manager') => {
    setRole(role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/manager');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-foreground">SAP for Me</h2>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Home className="h-4 w-4" />
                <span className="text-sm font-medium">Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Calendar</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">Reporting</span>
              </a>
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              Dashboards
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  <Award className="h-4 w-4" />
                  <span className="text-sm">Awards & Recognition</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Employee Management</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  <Settings className="h-4 w-4" />
                  <span className="text-sm">System Configuration</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Menu className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-1 rounded bg-primary">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-foreground">SAP Award and Excellence Hub</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search" 
                  className="pl-10 w-80 bg-muted/50"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">Welcome Anand,</h1>
            <Button variant="link" className="p-0 h-auto text-primary">
              <Settings className="h-4 w-4 mr-1" />
              Customize Home Page
            </Button>
          </div>

          {/* Hero Banner */}
          <div className="relative mb-8 rounded-xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 min-h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-hover/20"></div>
            <div className="relative z-10 text-center text-white p-8">
              <h2 className="text-4xl font-bold mb-4">Welcome to SAP Award and Excellence Hub</h2>
              <p className="text-lg mb-6 opacity-90">
                Remember that you can always edit your interests to personalize your homepage.<br />
                Try it out, and as always we welcome your feedback.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="default" className="bg-primary hover:bg-primary-hover">
                  Edit My Interests
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-foreground">
                  Close
                </Button>
              </div>
            </div>
          </div>

          {/* Search Support Knowledge */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Search Support Knowledge</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="How can we help you?" 
                className="pl-10 bg-card"
              />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Launchpad Tile */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Enter the SAP Award and Excellence Hub</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  SAP employees can access the award management system and its applications.
                </p>
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleRoleSelection('admin')} 
                    className="w-full justify-start" 
                    variant="ghost"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Administrator Dashboard
                  </Button>
                  <Button 
                    onClick={() => handleRoleSelection('manager')} 
                    className="w-full justify-start" 
                    variant="ghost"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Manager Portal
                  </Button>
                </div>
              </div>
            </div>

            {/* Get Started Section */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Get Started</h3>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="text-sm">What is SAP Award and Excellence Hub?</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="text-sm">Manage award categories and nominations</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Settings className="h-5 w-5 text-primary" />
                    <span className="text-sm">Award and Excellence Hub authorizations</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm">Get started with Employee Recognition</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="text-sm">Get the App</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}