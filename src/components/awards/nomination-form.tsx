import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useAwardsStore } from "@/store/awards";
import { ArrowLeft, ArrowRight, Save, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NominationFormProps {
  onBack: () => void;
}

export function NominationForm({ onBack }: NominationFormProps) {
  const { getActiveCategories, addNomination, currentUser } = useAwardsStore();
  const { toast } = useToast();
  const activeCategories = getActiveCategories();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nomineeId: '',
    nomineeName: '',
    categoryId: '',
    justification: '',
    supportingDocuments: [] as File[]
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.nomineeId.trim() || !formData.nomineeName.trim()) {
        toast({
          title: "Validation Error",
          description: "Please fill in nominee information.",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.categoryId || !formData.justification.trim()) {
        toast({
          title: "Validation Error",
          description: "Please select a category and provide justification.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    const category = activeCategories.find(c => c.id === formData.categoryId);
    if (!category) return;

    const nomination = {
      ...formData,
      categoryName: category.awardTitle,
      nominatedBy: currentUser?.name || 'Manager',
    };

    addNomination(nomination);
    
    // Generate a reference ID for display
    const refId = `AWD-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setReferenceId(refId);
    setIsSubmitted(true);
    
    toast({
      title: "Nomination Submitted",
      description: `Your nomination has been submitted successfully. Reference ID: ${refId}`,
    });
  };

  const handleChange = (field: string, value: string | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, supportingDocuments: files }));
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="h-9 px-3">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="text-center">
          <CardContent className="pt-8 pb-8">
            <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Nomination Submitted Successfully!</h2>
            <p className="text-muted-foreground mb-4">
              Your nomination has been received and is now under review.
            </p>
            <div className="bg-muted p-4 rounded-lg inline-block">
              <p className="text-sm font-medium">Reference ID</p>
              <p className="text-lg font-mono">{referenceId}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Please save this reference ID for your records.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="h-9 px-3">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Submit Nomination</h1>
          <p className="text-muted-foreground">
            Nominate an employee for recognition
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Step {currentStep} of {totalSteps}</CardTitle>
              <CardDescription>
                {currentStep === 1 && "Enter nominee information"}
                {currentStep === 2 && "Select award category and provide justification"}
                {currentStep === 3 && "Review and submit your nomination"}
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Nominee Information</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nomineeId">Employee ID *</Label>
                  <Input
                    id="nomineeId"
                    value={formData.nomineeId}
                    onChange={(e) => handleChange('nomineeId', e.target.value)}
                    placeholder="e.g., EMP001"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nomineeName">Employee Name *</Label>
                  <Input
                    id="nomineeName"
                    value={formData.nomineeName}
                    onChange={(e) => handleChange('nomineeName', e.target.value)}
                    placeholder="e.g., John Smith"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Award Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="category">Award Category *</Label>
                <Select value={formData.categoryId} onValueChange={(value) => handleChange('categoryId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an award category" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div>
                          <div className="font-medium">{category.awardTitle}</div>
                          <div className="text-sm text-muted-foreground">{category.categoryName}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="justification">Justification for Nomination *</Label>
                <Textarea
                  id="justification"
                  value={formData.justification}
                  onChange={(e) => handleChange('justification', e.target.value)}
                  placeholder="Explain why this employee deserves this award..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documents">Supporting Documents (Optional)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <input
                    type="file"
                    id="documents"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="documents" className="cursor-pointer">
                    <span className="text-primary hover:text-primary-hover">Click to upload files</span>
                    <span className="text-muted-foreground"> or drag and drop</span>
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">
                    PDF, DOC, or image files (max 10MB each)
                  </p>
                  {formData.supportingDocuments.length > 0 && (
                    <div className="mt-3 text-sm">
                      {formData.supportingDocuments.length} file(s) selected
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Review Your Nomination</h3>
              
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium">Employee ID</Label>
                    <p className="text-foreground">{formData.nomineeId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Employee Name</Label>
                    <p className="text-foreground">{formData.nomineeName}</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Award Category</Label>
                  <p className="text-foreground">
                    {activeCategories.find(c => c.id === formData.categoryId)?.awardTitle}
                  </p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Justification</Label>
                  <p className="text-foreground whitespace-pre-wrap">{formData.justification}</p>
                </div>
                
                {formData.supportingDocuments.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium">Supporting Documents</Label>
                    <ul className="text-foreground">
                      {formData.supportingDocuments.map((file, index) => (
                        <li key={index} className="text-sm">• {file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                <Save className="h-4 w-4 mr-2" />
                Submit Nomination
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}