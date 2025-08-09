import { useState, useEffect } from "react";
import { AwardCategory } from "@/types/awards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAwardsStore } from "@/store/awards";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CategoryFormProps {
  category?: AwardCategory;
  onBack: () => void;
  onSave: () => void;
}

export function CategoryForm({ category, onBack, onSave }: CategoryFormProps) {
  const { addCategory, updateCategory } = useAwardsStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    categoryName: '',
    awardTitle: '',
    description: '',
    eligibilityCriteria: '',
    status: 'Active' as 'Active' | 'Inactive'
  });

  useEffect(() => {
    if (category) {
      setFormData({
        categoryName: category.categoryName,
        awardTitle: category.awardTitle,
        description: category.description,
        eligibilityCriteria: category.eligibilityCriteria,
        status: category.status
      });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.categoryName.trim() || !formData.awardTitle.trim()) {
      toast({
        title: "Validation Error",
        description: "Category name and award title are required.",
        variant: "destructive"
      });
      return;
    }

    if (category) {
      updateCategory(category.id, formData);
      toast({
        title: "Category Updated",
        description: "Award category has been successfully updated.",
      });
    } else {
      addCategory(formData);
      toast({
        title: "Category Created",
        description: "New award category has been successfully created.",
      });
    }
    
    onSave();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="h-9 px-3">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">
            {category ? 'Edit Award Category' : 'Create New Award Category'}
          </h1>
          <p className="text-muted-foreground">
            {category ? 'Update the award category details' : 'Define a new award category for nominations'}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            Fill in the information for this award category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name *</Label>
                <Input
                  id="categoryName"
                  value={formData.categoryName}
                  onChange={(e) => handleChange('categoryName', e.target.value)}
                  placeholder="e.g., Innovation Excellence"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="awardTitle">Award Title *</Label>
                <Input
                  id="awardTitle"
                  value={formData.awardTitle}
                  onChange={(e) => handleChange('awardTitle', e.target.value)}
                  placeholder="e.g., Innovation Champion Award"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe what this award recognizes..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eligibilityCriteria">Eligibility Criteria</Label>
              <Textarea
                id="eligibilityCriteria"
                value={formData.eligibilityCriteria}
                onChange={(e) => handleChange('eligibilityCriteria', e.target.value)}
                placeholder="Define who is eligible for this award..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: 'Active' | 'Inactive') => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 md:flex-initial">
                <Save className="h-4 w-4 mr-2" />
                {category ? 'Update Category' : 'Create Category'}
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}