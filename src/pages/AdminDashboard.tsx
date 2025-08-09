import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryCard } from "@/components/awards/category-card";
import { CategoryForm } from "@/components/awards/category-form";
import { useAwardsStore } from "@/store/awards";
import { AwardCategory } from "@/types/awards";
import { Plus, ArrowLeft, Award, Users, TrendingUp, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

type ViewMode = 'dashboard' | 'form' | 'nominations';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { categories, nominations, getCategoryNominations } = useAwardsStore();
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [editingCategory, setEditingCategory] = useState<AwardCategory | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<AwardCategory | undefined>();

  const activeCategories = categories.filter(c => c.status === 'Active');
  const totalNominations = nominations.length;
  const pendingNominations = nominations.filter(n => n.status === 'Pending').length;

  const handleCreateNew = () => {
    setEditingCategory(undefined);
    setViewMode('form');
  };

  const handleEdit = (category: AwardCategory) => {
    setEditingCategory(category);
    setViewMode('form');
  };

  const handleViewNominations = (category: AwardCategory) => {
    setSelectedCategory(category);
    setViewMode('nominations');
  };

  const handleBack = () => {
    setViewMode('dashboard');
    setEditingCategory(undefined);
    setSelectedCategory(undefined);
  };

  const handleFormSave = () => {
    setViewMode('dashboard');
    setEditingCategory(undefined);
  };

  if (viewMode === 'form') {
    return (
      <div className="min-h-screen bg-background p-6">
        <CategoryForm
          category={editingCategory}
          onBack={handleBack}
          onSave={handleFormSave}
        />
      </div>
    );
  }

  if (viewMode === 'nominations' && selectedCategory) {
    const categoryNominations = getCategoryNominations(selectedCategory.id);
    
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBack} className="h-9 px-3">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-semibold">Nominations for {selectedCategory.awardTitle}</h1>
              <p className="text-muted-foreground">
                {categoryNominations.length} nomination{categoryNominations.length !== 1 ? 's' : ''} received
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {categoryNominations.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Nominations Yet</h3>
                  <p className="text-muted-foreground">
                    This category hasn't received any nominations yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              categoryNominations.map((nomination) => (
                <Card key={nomination.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{nomination.nomineeName}</CardTitle>
                        <CardDescription>
                          Employee ID: {nomination.nomineeId} • Nominated by {nomination.nominatedBy}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={
                          nomination.status === 'Pending' ? 'secondary' :
                          nomination.status === 'Under Review' ? 'default' :
                          nomination.status === 'Approved' ? 'default' : 'destructive'
                        }
                        className={
                          nomination.status === 'Approved' ? 'bg-success text-success-foreground' :
                          nomination.status === 'Under Review' ? 'bg-warning text-warning-foreground' : ''
                        }
                      >
                        {nomination.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-1">Justification</h4>
                        <p className="text-sm text-muted-foreground">
                          {nomination.justification}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Reference: {nomination.referenceId}</span>
                        <span>Submitted: {nomination.nominatedAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
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
                <h1 className="text-xl font-semibold text-foreground">Administrator Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage award categories and nominations</p>
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
          {/* Statistics Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{categories.length}</p>
                    <p className="text-sm text-muted-foreground">Total Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-success/10">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeCategories.length}</p>
                    <p className="text-sm text-muted-foreground">Active Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalNominations}</p>
                    <p className="text-sm text-muted-foreground">Total Nominations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-warning/10">
                    <Eye className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingNominations}</p>
                    <p className="text-sm text-muted-foreground">Pending Review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Categories Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Award Categories</h2>
                <p className="text-muted-foreground">
                  Manage your organization's award categories and recognition programs
                </p>
              </div>
              <Button onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Category
              </Button>
            </div>

            {categories.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Award Categories</h3>
                  <p className="text-muted-foreground mb-4">
                    Get started by creating your first award category
                  </p>
                  <Button onClick={handleCreateNew}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Category
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onEdit={handleEdit}
                    onViewNominations={handleViewNominations}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}