import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, SectionId, ProfileData } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolioData';

const STORAGE_KEY = 'mrk_portfolio_academic_v3';
const DEFAULT_ADMIN_PASSWORD = 'morshed2026';
const PASSWORD_STORAGE_KEY = 'mrk_admin_password';
const AUTH_KEY = 'mrk_admin_auth';

interface PortfolioContextType {
  data: PortfolioData;
  isAdmin: boolean;
  isAdminOpen: boolean;
  setIsAdminOpen: (val: boolean) => void;
  adminTab: string;
  setAdminTab: (tab: string) => void;
  openAdminToTab: (tab: string) => void;
  isAdminRoute: boolean;
  goToAdmin: () => void;
  goToPublic: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (newPassword: string) => boolean;
  resetPassword: () => void;
  updateProfile: (profile: Partial<ProfileData>) => void;
  addItem: <K extends keyof PortfolioData>(section: K, item: any) => void;
  updateItem: <K extends keyof PortfolioData>(section: K, id: string, updatedFields: any) => void;
  deleteItem: <K extends keyof PortfolioData>(section: K, id: string) => void;
  reorderItem: <K extends keyof PortfolioData>(section: K, id: string, direction: 'up' | 'down') => void;
  reorderSection: (sectionId: SectionId, direction: 'up' | 'down') => void;
  toggleSectionVisibility: (sectionId: SectionId) => void;
  exportDataToJson: () => void;
  importDataFromJson: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const checkIsAdminUrl = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hash = (window.location.hash || '').toLowerCase();
  const path = (window.location.pathname || '').toLowerCase();
  const search = (window.location.search || '').toLowerCase();
  return (
    hash === '#admin' ||
    hash === '#/admin' ||
    hash.startsWith('#admin') ||
    path.endsWith('/admin') ||
    path.endsWith('/admin/') ||
    search.includes('admin') ||
    search.includes('p=/admin')
  );
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultPortfolioData,
          ...parsed,
          profile: {
            ...defaultPortfolioData.profile,
            ...(parsed.profile || {})
          },
          sectionsOrder: parsed.sectionsOrder || defaultPortfolioData.sectionsOrder,
          sectionVisibility: {
            ...defaultPortfolioData.sectionVisibility,
            ...(parsed.sectionVisibility || {})
          }
        };
      }
    } catch (e) {
      console.error('Failed to parse portfolio data from storage, using defaults:', e);
    }
    return defaultPortfolioData;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const auth = sessionStorage.getItem(AUTH_KEY);
      return auth === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdminUrl);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<string>('profile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Monitor URL changes for admin routing
  useEffect(() => {
    const handleUrlChange = () => {
      const isAdm = checkIsAdminUrl();
      setIsAdminRoute(isAdm);
      if (isAdm) {
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    // Initial check
    handleUrlChange();

    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage limit reached or error saving data:', e);
    }
  }, [data]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const getAdminPassword = (): string => {
    try {
      return localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_ADMIN_PASSWORD;
    } catch {
      return DEFAULT_ADMIN_PASSWORD;
    }
  };

  const login = (password: string): boolean => {
    const activePassword = getAdminPassword();
    if (password === activePassword) {
      setIsAdmin(true);
      setIsAdminOpen(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      showToast('Welcome back! Faculty Admin authenticated.');
      return true;
    }
    showToast('Incorrect password. Access denied.');
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setIsAdminOpen(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch (e) {
      console.error(e);
    }
    goToPublic();
    showToast('Logged out of admin mode.');
  };

  const changePassword = (newPassword: string): boolean => {
    if (!newPassword || newPassword.trim().length < 6) {
      showToast('Password must be at least 6 characters long.');
      return false;
    }
    try {
      localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword.trim());
      showToast('Admin password updated successfully!');
      return true;
    } catch (e) {
      console.error(e);
      showToast('Failed to save new password.');
      return false;
    }
  };

  const resetPassword = () => {
    try {
      localStorage.removeItem(PASSWORD_STORAGE_KEY);
      showToast('Admin password reset to default: morshed2026');
    } catch (e) {
      console.error(e);
    }
  };

  const goToAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminRoute(true);
    setIsAdminOpen(true);
  };

  const goToPublic = () => {
    if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
      window.location.hash = '';
    }
    if (window.location.pathname.endsWith('/admin') || window.location.pathname.endsWith('/admin/')) {
      const cleanPath = window.location.pathname.replace(/\/admin\/?$/, '') || '/';
      window.history.pushState(null, '', cleanPath);
    }
    setIsAdminRoute(false);
    setIsAdminOpen(false);
  };

  const openAdminToTab = (tab: string) => {
    setAdminTab(tab);
    goToAdmin();
  };

  const updateProfile = (profileUpdates: Partial<ProfileData>) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...profileUpdates
      }
    }));
    showToast('Profile information updated successfully');
  };

  const addItem = <K extends keyof PortfolioData>(section: K, item: any) => {
    setData((prev) => {
      const list = prev[section];
      if (Array.isArray(list)) {
        const newItem = {
          ...item,
          id: item.id || `${String(section)}-${Date.now()}`,
          order: list.length + 1
        };
        return {
          ...prev,
          [section]: [...list, newItem]
        };
      }
      return prev;
    });
    showToast(`New item added to ${String(section)}`);
  };

  const updateItem = <K extends keyof PortfolioData>(section: K, id: string, updatedFields: any) => {
    setData((prev) => {
      const list = prev[section];
      if (Array.isArray(list)) {
        const updatedList = list.map((item: any) => {
          if (item && item.id === id) {
            return { ...item, ...updatedFields };
          }
          return item;
        });
        return {
          ...prev,
          [section]: updatedList
        };
      }
      return prev;
    });
    showToast(`Item updated in ${String(section)}`);
  };

  const deleteItem = <K extends keyof PortfolioData>(section: K, id: string) => {
    setData((prev) => {
      const list = prev[section];
      if (Array.isArray(list)) {
        const filtered = list.filter((item: any) => item && item.id !== id);
        // Re-index orders
        const reindexed = filtered.map((item: any, idx: number) => ({
          ...item,
          order: idx + 1
        }));
        return {
          ...prev,
          [section]: reindexed
        };
      }
      return prev;
    });
    showToast(`Item deleted from ${String(section)}`);
  };

  const reorderItem = <K extends keyof PortfolioData>(section: K, id: string, direction: 'up' | 'down') => {
    setData((prev) => {
      const list = prev[section];
      if (!Array.isArray(list)) return prev;

      const index = list.findIndex((item: any) => item && item.id === id);
      if (index === -1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;

      const newList = [...list];
      const [movedItem] = newList.splice(index, 1);
      newList.splice(targetIndex, 0, movedItem);

      // Re-assign order properties
      const reindexed = newList.map((item: any, idx: number) => ({
        ...item,
        order: idx + 1
      }));

      return {
        ...prev,
        [section]: reindexed
      };
    });
    showToast(`Item moved ${direction}`);
  };

  const reorderSection = (sectionId: SectionId, direction: 'up' | 'down') => {
    setData((prev) => {
      const list = [...prev.sectionsOrder];
      const index = list.indexOf(sectionId);
      if (index === -1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;

      const [moved] = list.splice(index, 1);
      list.splice(targetIndex, 0, moved);

      return {
        ...prev,
        sectionsOrder: list
      };
    });
    showToast(`Section moved ${direction}`);
  };

  const toggleSectionVisibility = (sectionId: SectionId) => {
    setData((prev) => {
      const current = prev.sectionVisibility[sectionId] !== false;
      return {
        ...prev,
        sectionVisibility: {
          ...prev.sectionVisibility,
          [sectionId]: !current
        }
      };
    });
    showToast(`Section visibility updated`);
  };

  const exportDataToJson = () => {
    try {
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `morshedur_portfolio_data_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Backup JSON downloaded successfully');
    } catch (e) {
      console.error(e);
      showToast('Failed to export data');
    }
  };

  const importDataFromJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || !parsed.profile || !parsed.profile.name) {
        throw new Error('Invalid portfolio JSON structure');
      }
      setData({
        ...defaultPortfolioData,
        ...parsed,
        profile: {
          ...defaultPortfolioData.profile,
          ...parsed.profile
        },
        sectionsOrder: parsed.sectionsOrder || defaultPortfolioData.sectionsOrder,
        sectionVisibility: {
          ...defaultPortfolioData.sectionVisibility,
          ...(parsed.sectionVisibility || {})
        }
      });
      showToast('Data imported successfully!');
      return true;
    } catch (e) {
      console.error(e);
      showToast('Error importing JSON. Please check file format.');
      return false;
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to restore original resume defaults? Any unsaved manual edits will be replaced.')) {
      setData(defaultPortfolioData);
      localStorage.removeItem(STORAGE_KEY);
      showToast('Restored all default resume details');
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdmin,
        isAdminOpen,
        setIsAdminOpen,
        adminTab,
        setAdminTab,
        openAdminToTab,
        isAdminRoute,
        goToAdmin,
        goToPublic,
        toastMessage,
        showToast,
        login,
        logout,
        changePassword,
        resetPassword,
        updateProfile,
        addItem,
        updateItem,
        deleteItem,
        reorderItem,
        reorderSection,
        toggleSectionVisibility,
        exportDataToJson,
        importDataFromJson,
        resetToDefaults
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
