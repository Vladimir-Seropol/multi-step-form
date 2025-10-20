import React from 'react';
import type { ButtonProps } from '../../types/types';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
  fullWidth = false
}) => {
  const baseClasses = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const widthClass = fullWidth ? 'w-100' : '';
  
  const buttonClasses = [
    baseClasses,
    variantClass,
    sizeClass,
    widthClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <span className="spinner-border spinner-border-sm me-2" />
      )}
      {children}
    </button>
  );
};

export default Button;