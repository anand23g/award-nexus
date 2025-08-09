import { useNavigate } from "react-router-dom";
import { LaunchpadTile } from "@/components/ui/launchpad-tile";
import { useAwardsStore } from "@/store/awards";
import { Settings, Users, Award, Trophy, Star, Target } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent/20">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-hover shadow-lg">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                SAP Award and Excellence Hub
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Corporate Recognition Platform
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Trophy className="h-4 w-4" />
                Excellence Recognition Platform
              </div>
              <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight">
                Celebrate Excellence,
                <br />
                <span className="bg-gradient-to-r from-primary via-primary-hover to-accent-foreground bg-clip-text text-transparent">
                  Drive Performance
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Recognize outstanding achievements and foster a culture of excellence with our 
                comprehensive awards management system designed for modern organizations.
              </p>
            </div>

            {/* Role Selection Cards */}
            <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto mb-20">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-hover/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <LaunchpadTile
                  title="Administrator"
                  subtitle="Manage award categories, review nominations, and configure system settings with comprehensive administrative controls"
                  icon={Settings}
                  onClick={() => handleRoleSelection('admin')}
                  className="relative h-full p-8 bg-card/90 backdrop-blur border-2 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-hover/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <LaunchpadTile
                  title="Manager"
                  subtitle="Nominate outstanding employees for recognition and track nomination status with real-time updates"
                  icon={Users}
                  onClick={() => handleRoleSelection('manager')}
                  className="relative h-full p-8 bg-card/90 backdrop-blur border-2 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid gap-8 md:grid-cols-3 mb-16">
              <div className="group text-center p-8 rounded-2xl bg-card/60 backdrop-blur border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground">Award Management</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Create and manage multiple award categories with custom criteria and flexible configurations
                </p>
              </div>
              
              <div className="group text-center p-8 rounded-2xl bg-card/60 backdrop-blur border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground">Easy Nominations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Streamlined nomination process with document upload support and intuitive workflows
                </p>
              </div>
              
              <div className="group text-center p-8 rounded-2xl bg-card/60 backdrop-blur border border-border/50 hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground">Role-Based Access</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Secure access control with administrator and manager roles and permission management
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Choose your role above to get started
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}