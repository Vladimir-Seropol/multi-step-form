import React from 'react';
import type { FormButtonsProps } from '../../types/types';
import Button from './Button';

const FormButtons: React.FC<FormButtonsProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onSubmit,
  isSubmitting = false,
  nextLabel = "Далее",
  submitLabel = "Подать заявку",
  backButtonProps = {},
  nextButtonProps = {},
  submitButtonProps = {}
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="d-flex gap-2 mt-4">
      {!isFirstStep && (
        <Button
          type="button"
          variant="secondary"
          onClick={onBack}
          disabled={isSubmitting}
          {...backButtonProps}
        >
          Назад
        </Button>
      )}
      
      {!isLastStep ? (
        <Button
          type={nextButtonProps?.type || "button"}
          variant="primary"
          disabled={isSubmitting || nextButtonProps?.disabled}
          onClick={onNext}
          {...nextButtonProps}
        >
          {nextLabel}
        </Button>
      ) : (
        <Button
          type={submitButtonProps?.type || "button"}
          variant="success"
          disabled={isSubmitting || submitButtonProps?.disabled}
          onClick={onSubmit}
          loading={isSubmitting}
          {...submitButtonProps}
        >
          {submitLabel}
        </Button>
      )}
    </div>
  );
};

export default FormButtons;