import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NominationForm } from "@/components/awards/nomination-form";
import { useAwardsStore } from "@/store/awards";
import { Plus, ArrowLeft, Award, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

type ViewMode = 'dashboard' | 'form';

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const { getActiveCategories, nominations } = useAwardsStore();
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  
  const activeCategories = getActiveCategories();
  const myNominations = nominations; // In a real app, filter by current user
  const pendingNominations = myNominations.filter(n => n.status === 'Pending').length;
  const underReviewNominations = myNominations.filter(n => n.status === 'Under Review').length;
  const approvedNominations = myNominations.filter(n => n.status === 'Approved').length;

  const handleCreateNomination = () => {
    setViewMode('form');
  };

  const handleBack = () => {
    setViewMode('dashboard');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Under Review':
        return <AlertCircle className="h-4 w-4" />;
      case 'Approved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'secondary';
      case 'Under Review':
        return 'default';
      case 'Approved':
        return 'default';
      case 'Rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (viewMode === 'form') {
    return (
      <div className="min-h-screen bg-background p-6">
        <NominationForm onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Manager Dashboard</h1>
                <p className="text-sm text-muted-foreground">Nominate outstanding employees for recognition</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Launchpad
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Ready to recognize excellence?</h2>
                  <p className="text-muted-foreground">
                    Submit a nomination for an outstanding team member today
                  </p>
                </div>
                <Button onClick={handleCreateNomination} size="lg">
                  <Plus className="h-5 w-5 mr-2" />
                  Submit Nomination
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeCategories.length}</p>
                    <p className="text-sm text-muted-foreground">Available Awards</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-warning/10">
                    <Clock className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingNominations}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{underReviewNominations}</p>
                    <p className="text-sm text-muted-foreground">Under Review</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-success/10">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{approvedNominations}</p>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Available Awards */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Available Awards</h2>
                <p className="text-muted-foreground">
                  Choose from these active award categories for your nominations
                </p>
              </div>

              {activeCategories.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Active Awards</h3>
                    <p className="text-muted-foreground">
                      There are currently no active award categories available for nominations.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeCategories.map((category) => (
                    <Card key={category.id} className="hover:shadow-card transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{category.awardTitle}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{category.categoryName}</p>
                            <p className="text-sm">{category.description}</p>
                          </div>
                          <Badge variant="default" className="bg-success text-success-foreground ml-4">
                            Active
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* My Nominations */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">My Nominations</h2>
                <p className="text-muted-foreground">
                  Track the status of your submitted nominations
                </p>
              </div>

              {myNominations.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Nominations Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't submitted any nominations yet. Start recognizing excellence today!
                    </p>
                    <Button onClick={handleCreateNomination}>
                      <Plus className="h-4 w-4 mr-2" />
                      Submit First Nomination
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {myNominations.map((nomination) => (
                    <Card key={nomination.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{nomination.nomineeName}</h3>
                            <p className="text-sm text-muted-foreground">{nomination.categoryName}</p>
                          </div>
                          <Badge 
                            variant={getStatusColor(nomination.status) as any}
                            className={`flex items-center gap-1 ${
                              nomination.status === 'Approved' ? 'bg-success text-success-foreground' :
                              nomination.status === 'Under Review' ? 'bg-warning text-warning-foreground' : ''
                            }`}
                          >
                            {getStatusIcon(nomination.status)}
                            {nomination.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm">{nomination.justification}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Ref: {nomination.referenceId}</span>
                            <span>{nomination.nominatedAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}