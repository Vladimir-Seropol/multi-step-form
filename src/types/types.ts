import type { ReactNode } from "react";

export interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  workPlace: string;
  address: string;
  loanAmount: number;
  loanTerm: number;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface FormContextType {
  data: FormData;
  updateData: (newData: Partial<FormData>) => void;
  resetForm: () => void;
}

export interface ModalProps {
  visible: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  closeButtonText?: string;
  closeButtonProps?: Partial<ButtonProps>;
}

export interface FormButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  nextLabel?: string;
  submitLabel?: string;
  backButtonProps?: Partial<ButtonProps>;
  nextButtonProps?: Partial<ButtonProps>;
  submitButtonProps?: Partial<ButtonProps>;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}
