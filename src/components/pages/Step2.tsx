import { useNavigate } from "react-router-dom";
import { useFormContext, Controller } from "react-hook-form";
import FormField from "../ui/FormField";
import FormButtons from "../ui/FormButtons";
import { useCategories } from "../../hooks/useCategories";
import type { FormData } from "../../types/types";

const Step2 = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { isValid } } = useFormContext<FormData>();
  const { categories, loading } = useCategories();

  const onSubmit = () => {
    navigate("/step3");
  };

  const handleBack = () => navigate("/");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5"> 
      <h3>Адрес и место работы</h3>

      <Controller
        name="workPlace"
        control={control}
        rules={{ required: "Место работы обязательно" }}
        render={({ field, fieldState }) => (
          <FormField
            label="Место работы"
            name="workPlace"
            type="select"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            options={loading ? ["Загружаем список..."] : categories}
            error={fieldState.error?.message}
            
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        rules={{ 
          required: "Адрес обязателен",
          minLength: {
            value: 5,
            message: "Адрес должен содержать минимум 5 символов"
          }
        }}
        render={({ field, fieldState }) => (
          <FormField
            label="Адрес"
            name="address"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            placeholder="Введите ваш адрес"
          />
        )}
      />

      <FormButtons
        currentStep={2}
        totalSteps={3}
        onBack={handleBack}
        nextButtonProps={{
          disabled: !isValid || loading, 
          type: "submit"
        }}
      />
    </form>
  );
};

export default Step2;