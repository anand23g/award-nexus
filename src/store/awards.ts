import { create } from 'zustand';
import { AwardCategory, Nomination, User, UserRole } from '@/types/awards';

interface AwardsState {
  // User state
  currentUser: User | null;
  currentRole: UserRole | null;
  
  // Awards state
  categories: AwardCategory[];
  nominations: Nomination[];
  
  // Actions
  setUser: (user: User) => void;
  setRole: (role: UserRole) => void;
  
  // Category management
  addCategory: (category: Omit<AwardCategory, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCategory: (id: string, updates: Partial<AwardCategory>) => void;
  deleteCategory: (id: string) => void;
  toggleCategoryStatus: (id: string) => void;
  
  // Nomination management
  addNomination: (nomination: Omit<Nomination, 'id' | 'nominatedAt' | 'referenceId' | 'status'>) => void;
  updateNomination: (id: string, updates: Partial<Nomination>) => void;
  
  // Getters
  getActiveCategories: () => AwardCategory[];
  getCategoryNominations: (categoryId: string) => Nomination[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);
const generateReferenceId = () => `AWD-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

export const useAwardsStore = create<AwardsState>((set, get) => ({
  currentUser: null,
  currentRole: null,
  categories: [
    {
      id: '1',
      categoryName: 'Innovation Excellence',
      awardTitle: 'Innovation Champion Award',
      description: 'Recognizing outstanding innovation and creative problem-solving',
      eligibilityCriteria: 'Employees who have demonstrated exceptional innovation in their work',
      status: 'Active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      categoryName: 'Team Collaboration',
      awardTitle: 'Team Spirit Award',
      description: 'Honoring exceptional teamwork and collaboration',
      eligibilityCriteria: 'Teams or individuals who have shown outstanding collaborative efforts',
      status: 'Active',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      categoryName: 'Customer Focus',
      awardTitle: 'Customer Excellence Award',
      description: 'Celebrating exceptional customer service and satisfaction',
      eligibilityCriteria: 'Employees who have gone above and beyond for customer satisfaction',
      status: 'Inactive',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
  ],
  nominations: [
    {
      id: '1',
      nomineeId: 'EMP001',
      nomineeName: 'Sarah Johnson',
      categoryId: '1',
      categoryName: 'Innovation Excellence',
      justification: 'Sarah led the development of our new automated workflow system that increased team productivity by 40%.',
      status: 'Under Review',
      nominatedBy: 'John Manager',
      nominatedAt: new Date('2024-03-01'),
      referenceId: 'AWD-2024-ABC123',
    },
  ],

  setUser: (user) => set({ currentUser: user }),
  setRole: (role) => set({ currentRole: role }),

  addCategory: (category) => set((state) => ({
    categories: [...state.categories, {
      ...category,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }]
  })),

  updateCategory: (id, updates) => set((state) => ({
    categories: state.categories.map(cat => 
      cat.id === id ? { ...cat, ...updates, updatedAt: new Date() } : cat
    )
  })),

  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter(cat => cat.id !== id)
  })),

  toggleCategoryStatus: (id) => set((state) => ({
    categories: state.categories.map(cat => 
      cat.id === id 
        ? { ...cat, status: cat.status === 'Active' ? 'Inactive' : 'Active', updatedAt: new Date() }
        : cat
    )
  })),

  addNomination: (nomination) => set((state) => ({
    nominations: [...state.nominations, {
      ...nomination,
      id: generateId(),
      nominatedAt: new Date(),
      referenceId: generateReferenceId(),
      status: 'Pending',
    }]
  })),

  updateNomination: (id, updates) => set((state) => ({
    nominations: state.nominations.map(nom => 
      nom.id === id ? { ...nom, ...updates } : nom
    )
  })),

  getActiveCategories: () => get().categories.filter(cat => cat.status === 'Active'),
  
  getCategoryNominations: (categoryId) => 
    get().nominations.filter(nom => nom.categoryId === categoryId),
}));