import { useNavigate } from "react-router-dom";
import { LaunchpadTile } from "@/components/ui/launchpad-tile";
import { useAwardsStore } from "@/store/awards";
import { Settings, Users, Award } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">SAP Award and Excellence Hub</h1>
              <p className="text-sm text-muted-foreground">Corporate Recognition Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Welcome to the Award and Excellence Hub
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recognize outstanding achievements and foster a culture of excellence. 
              Choose your role to get started with the awards management system.
            </p>
          </div>

          {/* Role Selection Tiles */}
          <div className="grid gap-8 md:grid-cols-2 max-w-2xl mx-auto">
            <LaunchpadTile
              title="Administrator"
              subtitle="Manage award categories, review nominations, and configure system settings"
              icon={Settings}
              onClick={() => handleRoleSelection('admin')}
            />
            
            <LaunchpadTile
              title="Manager"
              subtitle="Nominate outstanding employees for recognition and track nomination status"
              icon={Users}
              onClick={() => handleRoleSelection('manager')}
            />
          </div>

          {/* Features Overview */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Award Management</h3>
              <p className="text-sm text-muted-foreground">
                Create and manage multiple award categories with custom criteria
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Nominations</h3>
              <p className="text-sm text-muted-foreground">
                Streamlined nomination process with document upload support
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Role-Based Access</h3>
              <p className="text-sm text-muted-foreground">
                Secure access control with administrator and manager roles
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}