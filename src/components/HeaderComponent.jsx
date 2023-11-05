import React from 'react';
import styled from 'styled-components';
import ButtonComponent from './ButtonComponent';

// Styled components
const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h1``;

const HeaderComponent = ({ title, showButton, buttonTitle, onButtonClickCallback }) => {
  return (
    <TitleRow>
      <Title>{title}</Title>
      {showButton && 
        <ButtonComponent
          title={buttonTitle}
          onClickCallback={onButtonClickCallback}
        />
      }
    </TitleRow>
  );
};

export default HeaderComponent;
