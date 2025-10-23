import { useNavigate } from "react-router-dom";
import { useFormContext, Controller } from "react-hook-form";
import FormButtons from "../ui/FormButtons";
import Modal from "../ui/Modal";
import { useState } from "react";
import { useSubmitApplication } from "../../hooks/useSubmitApplication";
import type { FormData } from "../../types/types";

const Step3 = () => {
  const navigate = useNavigate();
  const { control, getValues, handleSubmit, formState: { isValid }, reset } = useFormContext<FormData>();
  const { submit, isSubmitting, error } = useSubmitApplication();
  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      await submit(`${data.firstName} ${data.lastName}`);
      setModalVisible(true);
    } catch {
      console.error("Ошибка при отправке заявки");
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
     reset({
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
      workPlace: "",
      address: "",
      loanAmount: 200,
      loanTerm: 10,
    });
    navigate("/");
  };

  const handleBack = () => navigate("/step2");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5"> {/* Добавлена форма */}
      <h3>Параметры займа</h3>

      <Controller
        name="loanAmount"
        control={control}
        rules={{ 
          required: "Сумма займа обязательна",
          min: { value: 200, message: "Минимальная сумма 200$" },
          max: { value: 1000, message: "Максимальная сумма 1000$" }
        }}
        render={({ field, fieldState }) => (
          <div className="mb-3">
            <label className="form-label">Сумма займа: ${field.value}</label>
            <input
              type="range"
              min={200}
              max={1000}
              step={100}
              value={field.value}
              onChange={(e) => field.onChange(+e.target.value)}
              onBlur={field.onBlur}
              className={`form-range ${fieldState.error ? 'is-invalid' : ''}`}
            />
            {fieldState.error && (
              <div className="invalid-feedback d-block">{fieldState.error.message}</div>
            )}
          </div>
        )}
      />

      <Controller
        name="loanTerm"
        control={control}
        rules={{ 
          required: "Срок займа обязателен",
          min: { value: 10, message: "Минимальный срок 10 дней" },
          max: { value: 30, message: "Максимальный срок 30 дней" }
        }}
        render={({ field, fieldState }) => (
          <div className="mb-3">
            <label className="form-label">Срок займа: {field.value} дней</label>
            <input
              type="range"
              min={10}
              max={30}
              step={1}
              value={field.value}
              onChange={(e) => field.onChange(+e.target.value)}
              onBlur={field.onBlur}
              className={`form-range ${fieldState.error ? 'is-invalid' : ''}`}
            />
            {fieldState.error && (
              <div className="invalid-feedback d-block">{fieldState.error.message}</div>
            )}
          </div>
        )}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <FormButtons
        currentStep={3}
        totalSteps={3}
        onBack={handleBack}
        submitButtonProps={{
          disabled: !isValid || isSubmitting,
          type: "submit"
        }}
        isSubmitting={isSubmitting}
      />

      <Modal visible={modalVisible} title="Поздравляем!" onClose={handleCloseModal}>
        <p>
          Поздравляем, {getValues().lastName} {getValues().firstName}. 
          Вам одобрено ${getValues().loanAmount} на {getValues().loanTerm} дней.
        </p>
      </Modal>
    </form>
  );
};

export default Step3;