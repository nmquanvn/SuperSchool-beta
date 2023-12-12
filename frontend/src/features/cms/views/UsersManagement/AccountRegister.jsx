import React, { useState } from 'react';
// core components
import UserRegister from '@cmscomponents/UserRegister/UserRegister.jsx';
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';

import Step1 from './UserRegisterSteps/Step1.jsx';
import Step2 from './UserRegisterSteps/Step2.jsx';
import Step3 from './UserRegisterSteps/Step3.jsx';
import UserContext from './UserContext';
export default function AccountRegister(props) {
  const [user, setUser] = useState({});
  return (
    <GridContainer justify="center">
      <ItemGrid xs={12} sm={8}>
        <UserContext.Provider value={{ user, setUser }}>
          <UserRegister
            validate
            steps={[
              {
                stepName: 'Thông tin',
                stepComponent: Step1,
                stepId: 'account',
              },
              {
                stepName: 'Tài khoản',
                stepComponent: Step2,
                stepId: 'accountType',
              },
              {
                stepName: 'Thông tin cá nhân',
                stepComponent: Step3,
                stepId: 'userInfo',
              },
            ]}
            title="Đăng ký tài khoản"
            subtitle="Hãy điền đầy đủ các thông tin."
          />
        </UserContext.Provider>
      </ItemGrid>
    </GridContainer>
  );
}
