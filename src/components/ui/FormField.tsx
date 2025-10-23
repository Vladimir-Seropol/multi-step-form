import { IMaskInput } from 'react-imask';
import type { FormFieldProps } from '../../types/types';

const FormField = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  options,
  placeholder,
  children,
  name,
}: FormFieldProps) => {
  const showError = !!error;

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      {type === 'text' && name === 'phone' && (
        <IMaskInput
          mask="+7 (000) 000 00 00"
          value={value as string}
          unmask={false} 
          onAccept={(val) => onChange(val)}
          onBlur={onBlur}
          className={`form-control ${showError ? 'is-invalid' : ''}`}
          placeholder={placeholder}
        />
      )}

      {type === 'text' && name !== 'phone' && !children && (
        <input
          type="text"
          className={`form-control ${showError ? 'is-invalid' : ''}`}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
        />
      )}

      {type === 'select' && options && (
        <select
          className={`form-control ${showError ? 'is-invalid' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        >
          <option value="">Выберите</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {type === 'range' && (
        <input
          type="range"
          className={`form-range ${showError ? 'is-invalid' : ''}`}
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          onBlur={onBlur}
        />
      )}

      {children}

      {showError && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormField;
