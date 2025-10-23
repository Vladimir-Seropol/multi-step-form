import { useNavigate } from "react-router-dom";
import { useFormContext, Controller } from "react-hook-form"; 
import FormField from "../ui/FormField";
import FormButtons from "../ui/FormButtons";
import type { FormData } from "../../types/types";

const Step1 = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { isValid } } = useFormContext<FormData>(); 

  const onSubmit = () => {
    
    navigate("/step2");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
      <h3>Личные данные</h3>

      <Controller
        name="phone"
        control={control}
        rules={{ 
          required: "Телефон обязателен",
          validate: (value) => {
            if (!value) return "Телефон обязателен";
            const digits = value.replace(/\D/g, '');
            return digits.length === 11 || "Введите полный номер телефона";
          }
        }}
        render={({ field, fieldState }) => (
          <FormField
            label="Телефон"
            name="phone"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            placeholder="+7 (XXX) XXX XX XX"
          />
        )}
      />

      <Controller
        name="firstName"
        control={control}
        rules={{ 
          required: "Имя обязательно",
          minLength: {
            value: 2,
            message: "Имя должно содержать минимум 2 символа"
          }
        }}
        render={({ field, fieldState }) => (
          <FormField
            label="Имя"
            name="firstName"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            placeholder="Введите ваше имя"
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        rules={{ 
          required: "Фамилия обязательна",
          minLength: {
            value: 2,
            message: "Фамилия должна содержать минимум 2 символа"
          }
        }}
        render={({ field, fieldState }) => (
          <FormField
            label="Фамилия"
            name="lastName"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            placeholder="Введите вашу фамилию"
          />
        )}
      />

      <Controller
        name="gender"
        control={control}
        rules={{ required: "Пол обязателен" }}
        render={({ field, fieldState }) => (
          <FormField
            label="Пол"
            name="gender"
            type="select"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            options={["Мужской", "Женский"]}
            error={fieldState.error?.message}
          />
        )}
      />

      <FormButtons 
        currentStep={1} 
        totalSteps={3} 
        nextButtonProps={{ 
          disabled: !isValid,
          type: "submit"
        }}
      />
    </form>
  );
};

export default Step1;