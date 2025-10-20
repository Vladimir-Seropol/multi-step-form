import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/useForm";
import { getCategories } from "../../api/index";
import FormButtons from "../ui/FormButtons";
import { validateStep2 } from "../../utils/validation";
import type { ValidationErrors } from '../../types/types';

const Step2 = () => {
  const { data, updateData } = useForm();
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then((cats) => setCategories(cats))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleNext = () => {
    const validationErrors = validateStep2(data);
    setErrors(validationErrors);
    
    setTouched({
      workPlace: true,
      address: true
    });
    
    if (Object.keys(validationErrors).length === 0) {
      navigate("/step3");
    }
  };

  const handleBack = () => navigate("/");

  const handleFieldChange = (field: keyof typeof data, value: string) => {
    updateData({ [field]: value });
    
    if (touched[field] && errors[field]) {
      const fieldError = validateStep2({ [field]: value })[field];
      setErrors(prev => ({
        ...prev,
        [field]: fieldError || ''
      }));
    }
  };

  const handleFieldBlur = (field: keyof typeof data) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    const fieldError = validateStep2({ [field]: data[field] })[field];
    setErrors(prev => ({
      ...prev,
      [field]: fieldError || ''
    }));
  };

  const showError = (field: string) => touched[field] && errors[field];
  const showValid = (field: string) => touched[field] && data[field as keyof typeof data] && !errors[field];

  return (
    <div className="container mt-5">
      <h3>Адрес и место работы</h3>

      <div className="mb-3">
        <label className="form-label">Место работы</label>
        {loading ? (
          <div className="text-muted">Загружаем список...</div>
        ) : (
          <select
            className={`form-control ${showError('workPlace') ? 'is-invalid' : showValid('workPlace') ? 'is-valid' : ''}`}
            value={data.workPlace || ""}
            onChange={(e) => handleFieldChange('workPlace', e.target.value)}
            onBlur={() => handleFieldBlur('workPlace')}
          >
            <option value="">Выберите место работы</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}
        {showError('workPlace') && (
          <div className="invalid-feedback">{errors.workPlace}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Адрес</label>
        <input
          type="text"
          className={`form-control ${showError('address') ? 'is-invalid' : showValid('address') ? 'is-valid' : ''}`}
          value={data.address}
          onChange={(e) => handleFieldChange('address', e.target.value)}
          onBlur={() => handleFieldBlur('address')}
          placeholder="Введите ваш адрес"
        />
        {showError('address') && (
          <div className="invalid-feedback">{errors.address}</div>
        )}
      </div>

      <FormButtons
        currentStep={2}
        totalSteps={3}
        onBack={handleBack}
        onNext={handleNext}
      />
    </div>
  );
};

export default Step2;