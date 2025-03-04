import React from 'react';

interface DefaultAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

// Generate a consistent color based on the name
const getColorFromName = (name: string): string => {
  const colors = [
    '#4F46E5', // Indigo
    '#0891B2', // Cyan
    '#059669', // Emerald
    '#D97706', // Amber
    '#DC2626', // Red
    '#7C3AED', // Violet
    '#2563EB', // Blue
    '#DB2777', // Pink
    '#65A30D', // Lime
  ];
  
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  
  return colors[sum % colors.length];
};

// Extract initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const DefaultAvatar: React.FC<DefaultAvatarProps> = ({ 
  name, 
  size = 128,
  className = ''
}) => {
  const color = getColorFromName(name);
  const initials = getInitials(name);
  
  return (
    <div 
      className={`flex items-center justify-center rounded-full ${className}`}
      style={{ 
        backgroundColor: color,
        width: size, 
        height: size,
        fontSize: size / 2.5,
        color: 'white',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
      }}
      aria-label={`Avatar for ${name}`}
    >
      {initials}
    </div>
  );
};
