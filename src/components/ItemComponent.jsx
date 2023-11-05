import React from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ItemTitle = styled.span`
  margin-right: 10px;
  color: black;
`;

const ItemButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  margin-left: 5px; // Added space between buttons if both are present
  outline: none;

  &:hover {
    background-color: #0056b3;
  }
`;

const ItemComponent = ({
  id,
  title,
  onClickCallback,
  showButton,
  showSecondaryButton,
  buttonTitle,
  secondaryButtonTitle,
  onButtonClickCallback,
  onSecondaryButtonClickCallback,
}) => {
  return (
    <ItemContainer onClick={() => onClickCallback(id)}>
      <ItemTitle>{title}</ItemTitle>
      <div>
        {showSecondaryButton && (
          <ItemButton
            onClick={(e) => {
              e.stopPropagation(); // Prevent the onClickCallback from being called when the button is clicked
              onSecondaryButtonClickCallback(id);
            }}
          >
            {secondaryButtonTitle}
          </ItemButton>
        )}
        {showButton && (
          <ItemButton
            onClick={(e) => {
              e.stopPropagation(); // Prevent the onClickCallback from being called when the button is clicked
              onButtonClickCallback(id);
            }}
          >
            {buttonTitle}
          </ItemButton>
        )}
      </div>
    </ItemContainer>
  );
};

export default ItemComponent;
