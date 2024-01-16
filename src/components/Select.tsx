import React from 'react';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'
import { useTheme } from 'styled-components'
import Text, { fontVariant } from './Text';

const SelectContainer = styled.TouchableOpacity`
  margin-vertical: 12px;
  height: 54px;
  padding: 12px;
  border-radius: 8px;
  flex-direction: row;
  alignItems : center;
  width: 100%;
  border-width: 1px;
  border-color: ${props => props.theme.PRIMARY_TEXT_COLOR};
`;

const IconContainer = styled.View`
   justifyContent : center;
   alignItems : center;
   margin-horizontal : 8px;
   width: 30px
`;

const PlaceHolderContainer = styled.View`
   flex: 1;
   alignItems : flex-start;
`;


const Select: React.FC<any> = ({ onPress, label, left, value }): JSX.Element => {
    const theme = useTheme();

    return (
        <SelectContainer onPress={onPress} activeOpacity={0.6}>
            {left &&
                <IconContainer>
                    {left}
                </IconContainer>
            }
            <PlaceHolderContainer>
                {value ? <>
                    <Text variant={fontVariant.caption2}>{label}</Text>
                    <Text variant={fontVariant.body1}>{value}</Text>
                </>:
                <Text variant={fontVariant.body1}>{label}</Text>
                }
            </PlaceHolderContainer>
            <IconContainer>
                <FontAwesomeIcon size={18} icon={faAngleRight} color={theme.PRIMARY_TEXT_COLOR} />
            </IconContainer>
        </SelectContainer>
    )
}


export default Select;