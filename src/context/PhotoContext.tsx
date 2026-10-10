import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface PhotoContextType {
  photoUrl: string;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [photoUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sheyla_profile_photo');
      if (saved) return saved;
    }
    return PERSONAL_INFO.profileImage;
  });

  return (
    <PhotoContext.Provider value={{ photoUrl }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const useProfilePhoto = (): PhotoContextType => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('useProfilePhoto debe usarse dentro de un PhotoProvider');
  }
  return context;
};
