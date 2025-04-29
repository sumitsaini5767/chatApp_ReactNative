import React from 'react';
import TabRoutes from './Tabroutes';

const MainStack = (Stack : any) => {
  return (
    <>
      <Stack.Screen name="Home" component={TabRoutes} />
    </>
  );
};

export default MainStack;

