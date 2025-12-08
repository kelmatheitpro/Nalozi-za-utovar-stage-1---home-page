import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Load, Truck, UserRole, UserStatus, SubscriptionPlan, CreateLoadData, CreateTruckData } from '../types';
import { MOCK_USERS, MOCK_LOADS, MOCK_TRUCKS } from '../services/mockData';

interface StoreContextType {
  currentUser: User | null;
  users: User[];
  loads: Load[];
  trucks: Truck[];
  isAuthenticated: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'role' | 'status' | 'plan'>) => Promise<void>;
  createLoad: (data: CreateLoadData) => void;
  createTruck: (data: CreateTruckData) => void;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  canViewContact: (targetListing: Load | Truck) => boolean;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [loads, setLoads] = useState<Load[]>(MOCK_LOADS);
  const [trucks, setTrucks] = useState<Truck[]>(MOCK_TRUCKS);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Persistence simulation
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('lbx_user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const freshUser = users.find(u => u.id === user.id);
        if (freshUser) setCurrentUser(freshUser);
      }
      
      // Theme persistence
      const savedTheme = localStorage.getItem('lbx_theme') as 'dark' | 'light';
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else {
        document.documentElement.classList.add('dark');
        setTheme('dark');
      }
    } catch (e) {
      console.error("Failed to restore session", e);
    }
  }, [users]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('lbx_theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const login = async (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('lbx_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('lbx_user');
  };

  const register = async (userData: Omit<User, 'id' | 'role' | 'status' | 'plan'>) => {
    const newUser: User = {
      ...userData,
      id: `u${Date.now()}`,
      role: UserRole.USER,
      status: UserStatus.PENDING,
      plan: SubscriptionPlan.FREE,
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem('lbx_user', JSON.stringify(newUser));
  };

  const createLoad = (data: CreateLoadData) => {
    if (!currentUser) return;
    const newLoad: Load = {
      ...data,
      id: `l${Date.now()}`,
      userId: currentUser.id,
      companyName: currentUser.company?.name || 'Unknown',
      type: 'load',
      createdAt: new Date().toISOString(),
      views: 0,
      inquiries: 0,
    };
    setLoads(prev => [newLoad, ...prev]);
  };

  const createTruck = (data: CreateTruckData) => {
    if (!currentUser) return;
    const newTruck: Truck = {
      ...data,
      id: `t${Date.now()}`,
      userId: currentUser.id,
      companyName: currentUser.company?.name || 'Unknown',
      type: 'truck',
      createdAt: new Date().toISOString(),
      views: 0,
      inquiries: 0,
    };
    setTrucks(prev => [newTruck, ...prev]);
  };

  const updateUserStatus = (userId: string, status: UserStatus) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
  };

  const canViewContact = (targetListing: Load | Truck) => {
    if (!currentUser) return false;
    if (currentUser.role === UserRole.ADMIN) return true;
    if (currentUser.id === targetListing.userId) return true;
    if (currentUser.status !== UserStatus.APPROVED) return false;
    if (currentUser.plan === SubscriptionPlan.FREE) return false;
    return true;
  };

  return (
    <StoreContext.Provider value={{
      currentUser,
      users,
      loads,
      trucks,
      isAuthenticated: !!currentUser,
      login,
      logout,
      register,
      createLoad,
      createTruck,
      updateUserStatus,
      canViewContact,
      theme,
      toggleTheme
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};