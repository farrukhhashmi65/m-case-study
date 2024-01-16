import React from 'react';
import styled from 'styled-components/native';
import Text, { fontVariant } from './Text';
import { useTheme } from 'styled-components'

const ButtonContainer = styled.TouchableOpacity`
  margin-vertical: 8px;
  height: 54px;
  padding: 12px;
  border-radius: 8px;
  flex-direction: row;
  alignItems : center;
  justifyContent : center;
  background-color:${props => props.disabled ? props.theme.DISBALED_COLOR : props.theme.PRIMARY_COLOR};
`;


export const SimpleButton = styled.TouchableOpacity`
  flex-direction: row;
  alignItems : center;
`;


const Button: React.FC<any> = (props): JSX.Element => {
  const theme = useTheme();
  const { onPress, title, disabled } = props;

  return (
    <ButtonContainer onPress={onPress} activeOpacity={0.6} disabled={disabled}>
      <Text color={theme.SECONDARY_TEXT_COLOR} variant={fontVariant.button}>{title}</Text>
    </ButtonContainer>

  )
}


export default Button;