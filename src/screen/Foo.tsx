// MyComponent.tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useToast } from '../utils/ToastContext';

const Foo: React.FC = () => {
  const { showToast } = useToast();

  const handleShowSuccessToast = () => {
    showToast('Success message', 'success');
  };

  const handleShowErrorToast = () => {
    showToast('Error message', 'error');
  };

  return (
    <View>
      <Button title="Show Success Toast" onPress={handleShowSuccessToast} />
      <Button title="Show Error Toast" onPress={handleShowErrorToast} />
    </View>
  );
};

export default Foo;
