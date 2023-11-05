import React from 'react';
import styled from 'styled-components';
import ItemComponent from '../components/ItemComponent';
import HeaderComponent from '../components/HeaderComponent';

// Styled components
const ScreenContainer = styled.div`
  padding: 20px;
`;

const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2``;

// New Grid container for items
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
  margin-bottom: 30px;
`;

const ListsPage = ({
  myLists,
  otherLists,
  archivedLists,
  onListClick,
  onAddNewListClickCallback,
  onDeleteListClickCallback
}) => {
  const RenderItems = ({
    items,
    showButton = true,
    showSecondaryButton = false,
    buttonTitle = 'View',
    secondaryButtonTitle = 'Delete',
    onClickCallback,
    onButtonClickCallback,
    onSecondaryButtonClickCallback,
  }) => {
    return (
      <GridContainer>
        {items.map(item => (
          <ItemComponent
            key={item.id}
            id={item.id}
            title={item.name}
            layoutType={"block"}
            showButton={showButton}
            buttonTitle={buttonTitle}
            showSecondaryButton={showSecondaryButton}
            secondaryButtonTitle={secondaryButtonTitle}
            onClickCallback={onClickCallback}
            onButtonClickCallback={onButtonClickCallback}
            onSecondaryButtonClickCallback={onSecondaryButtonClickCallback}
          />
        ))}
      </GridContainer>
    );
  };

  return (
    <ScreenContainer>
      <HeaderComponent
        title="Lists"
        showButton={true}
        buttonTitle="Add New List"
        onButtonClickCallback={onAddNewListClickCallback}
      />
      <SectionTitleRow>
        <SectionTitle>My Lists</SectionTitle>
      </SectionTitleRow>
      <RenderItems
        items={myLists}
        onClickCallback={onListClick}
        onButtonClickCallback={onListClick}
        onSecondaryButtonClickCallback={onDeleteListClickCallback}
        showSecondaryButton={true}
      />
      <SectionTitleRow>
        <SectionTitle>Other Lists</SectionTitle>
      </SectionTitleRow>
      <RenderItems
        items={otherLists}
        onButtonClickCallback={onListClick}
        showSecondaryButton={false}
      />
      <SectionTitleRow>
        <SectionTitle>Archived Lists</SectionTitle>
      </SectionTitleRow>
      <RenderItems
        items={archivedLists}
        onButtonClickCallback={onListClick}
        showSecondaryButton={false}
      />
    </ScreenContainer>
  );
};

export default ListsPage;
