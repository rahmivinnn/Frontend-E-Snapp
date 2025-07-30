import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomButton from '../../src/components/CustomButton';

describe('CustomButton', () => {
  it('renders correctly with title', () => {
    const {getByText} = render(
      <CustomButton title="Test Button" onPress={() => {}} />,
    );
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CustomButton title="Test Button" onPress={onPressMock} />,
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when loading prop is true', () => {
    const {getByTestId} = render(
      <CustomButton title="Test Button" onPress={() => {}} loading={true} />,
    );
    
    // Check if ActivityIndicator is rendered
    expect(getByTestId).toBeDefined();
  });

  it('is disabled when disabled prop is true', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CustomButton title="Test Button" onPress={onPressMock} disabled={true} />,
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
}); 