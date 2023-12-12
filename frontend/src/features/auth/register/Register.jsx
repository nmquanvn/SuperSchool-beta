import React, { useState } from 'react';
import AuthLayout from '../base/layout';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTitle, setCurrentTitle] = useState('Đăng ký');
  const [currentEmail, setCurrentEmail] = useState('');
  return (
    <AuthLayout title={currentTitle}>
      {currentStep === 0 && (
        <StepOne
          onSetCurrentStep={setCurrentStep}
          onSetCurrentEmail={setCurrentEmail}
          onChangeTitle={setCurrentTitle}
        />
      )}
      {currentStep === 1 && (
        <StepTwo
          onSetCurrentStep={setCurrentStep}
          onChangeTitle={setCurrentTitle}
          currentEmail={currentEmail}
        />
      )}
      {currentStep === 2 && (
        <StepThree
          onSetCurrentStep={setCurrentStep}
          onChangeTitle={setCurrentTitle}
          currentEmail={currentEmail}
        />
      )}
    </AuthLayout>
  );
}

export default Register;
