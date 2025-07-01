import React from 'react';
import { render } from 'react-native-testing-library';
import LoginScreen from '../screens/LoginScreen';

const navigation = { navigate: jest.fn(), replace: jest.fn() };

test('renders Giriş Yap text', () => {
  const { getByText } = render(<LoginScreen navigation={navigation} />);
  expect(getByText('Giriş Yap')).toBeTruthy();
});
