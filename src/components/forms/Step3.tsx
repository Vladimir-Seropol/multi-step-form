import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/useForm";
import { submitApplication } from "../../api";
import Modal from "../ui/Modal";
import FormButtons from "../ui/FormButtons";
import { validateStep3 } from "../../utils/validation";
import type { ValidationErrors } from "../../types/types";

const Step3 = () => {
   const { data, updateData, resetForm } = useForm();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const validationErrors = validateStep3(data);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) return;
    
    setIsSubmitting(true);
    try {
      await submitApplication(`${data.firstName} ${data.lastName}`);
      setModalVisible(true);
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setErrors({ submit: "Ошибка при отправке заявки. Попробуйте еще раз." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => navigate("/step2");

   const handleCloseModal = () => {
    setModalVisible(false);
    resetForm(); 
    navigate("/"); 
  };
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    updateData({ loanAmount: value });
    
    if (errors.loanAmount) {
      setErrors(prev => ({ ...prev, loanAmount: '' }));
    }
  };

  const handleLoanTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    updateData({ loanTerm: value });
    
    if (errors.loanTerm) {
      setErrors(prev => ({ ...prev, loanTerm: '' }));
    }
  };

  return (
    <div className="container mt-5">
      <h3>Параметры займа</h3>
      
      <div className="mb-3">
        <label className="form-label">Сумма займа: <strong>${data.loanAmount}</strong></label>
        <input
          type="range"
          min={200}
          max={1000}
          step={100}
          value={data.loanAmount}
          onChange={handleLoanAmountChange}
          className={`form-range ${errors.loanAmount ? 'is-invalid' : ''}`}
        />
        <div className="d-flex justify-content-between text-muted small">
          <span>$200</span>
          <span>$1000</span>
        </div>
        {errors.loanAmount && (
          <div className="invalid-feedback d-block">{errors.loanAmount}</div>
        )}
      </div>
      
      <div className="mb-3">
        <label className="form-label">Срок займа: <strong>{data.loanTerm} дней</strong></label>
        <input
          type="range"
          min={10}
          max={30}
          step={1}
          value={data.loanTerm}
          onChange={handleLoanTermChange}
          className={`form-range ${errors.loanTerm ? 'is-invalid' : ''}`}
        />
        <div className="d-flex justify-content-between text-muted small">
          <span>10 дней</span>
          <span>30 дней</span>
        </div>
        {errors.loanTerm && (
          <div className="invalid-feedback d-block">{errors.loanTerm}</div>
        )}
      </div>

      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          {errors.submit}
        </div>
      )}

      <FormButtons
        currentStep={3}
        totalSteps={3}
        onBack={handleBack}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <Modal
        visible={modalVisible}
        title="Поздравляем!"
        onClose={handleCloseModal}
        closeButtonProps={{
          variant: "success"
        }}
      >
        <p className="mb-0">
          Поздравляем, <strong>{data.lastName} {data.firstName}</strong>. 
          Вам одобрено <strong>${data.loanAmount}</strong> на <strong>{data.loanTerm}</strong> дней.
        </p>
      </Modal>
    </div>
  );
};

export default Step3;