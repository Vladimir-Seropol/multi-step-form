import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/useForm";
import { IMaskInput } from "react-imask";
import FormButtons from "../ui/FormButtons";
import type { ValidationErrors } from '../../types/types';
import { validateStep1 } from '../../utils/validation';

const Step1 = () => {
  const { data, updateData } = useForm();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const handleNext = () => {
    const validationErrors = validateStep1(data);
    setErrors(validationErrors);
    
    setTouched({
      phone: true,
      firstName: true,
      lastName: true,
      gender: true
    });
    
    if (Object.keys(validationErrors).length === 0) {
      navigate("/step2");
    }
  };

  const handleFieldChange = (field: keyof typeof data, value: string) => {
    updateData({ [field]: value });
    
    if (touched[field] && errors[field]) {
      const fieldError = validateStep1({ [field]: value })[field];
      setErrors(prev => ({
        ...prev,
        [field]: fieldError || ''
      }));
    }
  };

  const handleFieldBlur = (field: keyof typeof data) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    const fieldError = validateStep1({ [field]: data[field] })[field];
    setErrors(prev => ({
      ...prev,
      [field]: fieldError || ''
    }));
  };

  const showError = (field: string) => touched[field] && errors[field];
  const showValid = (field: string) => touched[field] && data[field as keyof typeof data] && !errors[field];

  return (
    <div className="container mt-5">
      <h3>Личные данные</h3>

      <div className="mb-3">
        <label className="form-label">Телефон</label>
        <IMaskInput
          mask="+7 (000) 000 00 00"
          value={data.phone}
          onAccept={(value: string) => handleFieldChange('phone', value)}
          onBlur={() => handleFieldBlur('phone')}
          placeholder="+7 (XXX) XXX XX XX"
          className={`form-control ${showError('phone') ? 'is-invalid' : showValid('phone') ? 'is-valid' : ''}`}
        />
        {showError('phone') && (
          <div className="invalid-feedback">{errors.phone}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Имя</label>
        <input
          type="text"
          className={`form-control ${showError('firstName') ? 'is-invalid' : showValid('firstName') ? 'is-valid' : ''}`}
          value={data.firstName}
          onChange={(e) => handleFieldChange('firstName', e.target.value)}
          onBlur={() => handleFieldBlur('firstName')}
          placeholder="Введите ваше имя"
        />
        {showError('firstName') && (
          <div className="invalid-feedback">{errors.firstName}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Фамилия</label>
        <input
          type="text"
          className={`form-control ${showError('lastName') ? 'is-invalid' : showValid('lastName') ? 'is-valid' : ''}`}
          value={data.lastName}
          onChange={(e) => handleFieldChange('lastName', e.target.value)}
          onBlur={() => handleFieldBlur('lastName')}
          placeholder="Введите вашу фамилию"
        />
        {showError('lastName') && (
          <div className="invalid-feedback">{errors.lastName}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Пол</label>
        <select
          className={`form-control ${showError('gender') ? 'is-invalid' : showValid('gender') ? 'is-valid' : ''}`}
          value={data.gender}
          onChange={(e) => handleFieldChange('gender', e.target.value)}
          onBlur={() => handleFieldBlur('gender')}
        >
          <option value="">Выберите пол</option>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
        {showError('gender') && (
          <div className="invalid-feedback">{errors.gender}</div>
        )}
      </div>

      <FormButtons
        currentStep={1}
        totalSteps={3}
        onNext={handleNext}
      />
    </div>
  );
};

export default Step1;