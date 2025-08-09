export interface AwardCategory {
  id: string;
  categoryName: string;
  awardTitle: string;
  description: string;
  eligibilityCriteria: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Nomination {
  id: string;
  nomineeId: string;
  nomineeName: string;
  categoryId: string;
  categoryName: string;
  justification: string;
  supportingDocuments?: File[];
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  nominatedBy: string;
  nominatedAt: Date;
  referenceId: string;
}

export type UserRole = 'admin' | 'manager';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}