import React, { useState } from 'react';
import { useProfilePhoto } from '../context/PhotoContext';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProfileImageProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
  className = '',
  size = 'lg',
}) => {
  const { photoUrl } = useProfilePhoto();
  const [imageSrc, setImageSrc] = useState(photoUrl);
  const fallbackImage = PERSONAL_INFO.profileImageFallback;

  const handleImageError = () => {
    if (imageSrc !== fallbackImage) {
      setImageSrc(fallbackImage);
    }
  };

  if (size === 'sm') {
    return (
      <div className={`relative rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-blue-600/70 dark:border-blue-400/70 shrink-0 ${className}`}>
        <img
          src={imageSrc}
          alt="Foto oficial de Sheyla Thalía"
          className="w-full h-full object-cover object-top"
          onError={handleImageError}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-2xl relative">
        <img
          src={imageSrc}
          alt="Fotografía oficial de Sheyla Thalía Gutiérrez Larquín"
          className="w-full h-full object-cover object-top"
          onError={handleImageError}
        />

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-5 text-white pointer-events-none">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Fotografía Oficial
          </p>
          <p className="text-sm font-medium text-slate-100">
            {PERSONAL_INFO.fullName}
          </p>
        </div>
      </div>
    </div>
  );
};
