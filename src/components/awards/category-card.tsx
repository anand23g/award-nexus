import { useState } from "react";
import { AwardCategory } from "@/types/awards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Power, Trash2 } from "lucide-react";
import { useAwardsStore } from "@/store/awards";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface CategoryCardProps {
  category: AwardCategory;
  onEdit: (category: AwardCategory) => void;
  onViewNominations: (category: AwardCategory) => void;
}

export function CategoryCard({ category, onEdit, onViewNominations }: CategoryCardProps) {
  const { deleteCategory, toggleCategoryStatus, getCategoryNominations } = useAwardsStore();
  const nominations = getCategoryNominations(category.id);

  const handleDelete = () => {
    deleteCategory(category.id);
  };

  const handleToggleStatus = () => {
    toggleCategoryStatus(category.id);
  };

  return (
    <Card className="group hover:shadow-card transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{category.awardTitle}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {category.categoryName}
            </CardDescription>
          </div>
          <Badge 
            variant={category.status === 'Active' ? 'default' : 'secondary'}
            className={category.status === 'Active' ? 'bg-success text-success-foreground' : ''}
          >
            {category.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-foreground mb-2">{category.description}</p>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Eligibility:</span> {category.eligibilityCriteria}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-muted-foreground">
            {nominations.length} nomination{nominations.length !== 1 ? 's' : ''}
          </span>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewNominations(category)}
              className="h-8 px-2"
            >
              <Eye className="h-3 w-3" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(category)}
              className="h-8 px-2"
            >
              <Edit className="h-3 w-3" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleStatus}
              className="h-8 px-2"
            >
              <Power className={`h-3 w-3 ${category.status === 'Active' ? 'text-warning' : 'text-success'}`} />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-2 text-destructive hover:text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Award Category</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{category.awardTitle}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}