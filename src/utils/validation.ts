import type { FormData, ValidationErrors } from '../types/types';


export const validateStep1 = (data: Partial<FormData>): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!data.phone?.trim()) {
    errors.phone = "Введите телефон";
  } else if (!/^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/.test(data.phone)) {
    errors.phone = "Введите телефон в формате +7 (XXX) XXX XX XX";
  }
  
  if (!data.firstName?.trim()) {
    errors.firstName = "Введите имя";
  } else if (data.firstName.length < 2) {
    errors.firstName = "Имя должно содержать минимум 2 символа";
  }
  
  if (!data.lastName?.trim()) {
    errors.lastName = "Введите фамилию";
  } else if (data.lastName.length < 2) {
    errors.lastName = "Фамилия должна содержать минимум 2 символа";
  }
  
  if (!data.gender) {
    errors.gender = "Выберите пол";
  }
  
  return errors;
};

export const validateStep2 = (data: Partial<FormData>): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!data.workPlace) {
    errors.workPlace = "Выберите место работы";
  }
  
  if (!data.address?.trim()) {
    errors.address = "Введите адрес";
  } else if (data.address.length < 5) {
    errors.address = "Адрес должен содержать минимум 5 символов";
  }
  
  return errors;
};

export const validateStep3 = (data: Partial<FormData>): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!data.loanAmount || data.loanAmount < 200 || data.loanAmount > 1000) {
    errors.loanAmount = "Выберите сумму займа от 200 до 1000";
  }
  
  if (!data.loanTerm || data.loanTerm < 10 || data.loanTerm > 30) {
    errors.loanTerm = "Выберите срок займа от 10 до 30 дней";
  }
  
  return errors;
};

export const validateStep = (step: number, data: Partial<FormData>): ValidationErrors => {
  switch (step) {
    case 1:
      return validateStep1(data);
    case 2:
      return validateStep2(data);
    case 3:
      return validateStep3(data);
    default:
      return {};
  }
};

export const validateAll = (data: FormData): ValidationErrors => {
  return {
    ...validateStep1(data),
    ...validateStep2(data),
    ...validateStep3(data)
  };
};