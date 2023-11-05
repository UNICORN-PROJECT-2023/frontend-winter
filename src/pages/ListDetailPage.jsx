import React from 'react';
import styled from 'styled-components';
import ButtonComponent from '../components/ButtonComponent';
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
  margin-top: 50px; /* Increased margin-top for larger spacing between sections */
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2``;

const ListDetailPage = ({
  itemListName,
  onItemListNameEditCallback,
  membersList,
  itemsList,
  showType,
  showItemListNameEdit,
  showAddUser,
  showDeleteUser,
  showLeaveList,
  onUserAddCallback,
  onUserDeleteCallback,
  onAddNewItemClickCallback,
  onDeleteItemClickCallback,
  onProcessItemClickCallback,
  onSwitchShowTypeClickCallback,
  onLeaveListClickCallback,
}) => {
  const RenderItems = (
    {items, 
    showButton,
    buttonTitle,
    secondaryButtonTitle,
    showSecondaryButton,
    onClickCallback,
    onButtonClickCallback, 
    onSecondaryButtonClickCallback
  }) => {
    return items.map(item => (
      <div key={item.id} style={{ marginBottom: '20px' }}> 
        <ItemComponent
          id={item.id}
          title={item.title}
          onClickCallback={onClickCallback}
          showButton={showButton}
          showSecondaryButton={item.active && showSecondaryButton}
          buttonTitle={buttonTitle}
          secondaryButtonTitle={secondaryButtonTitle}
          onButtonClickCallback={onButtonClickCallback}
          onSecondaryButtonClickCallback={onSecondaryButtonClickCallback}
        />
      </div>
    ));
  };

  return (
    <ScreenContainer>
      <HeaderComponent
        title={itemListName}
        showButton={showItemListNameEdit}
        buttonTitle="Edit"
        onButtonClickCallback={onItemListNameEditCallback}
      />

      <SectionTitleRow>
        <SectionTitle>Members</SectionTitle>
        {showAddUser &&
          <ButtonComponent
            title="Add Member"
            onClickCallback={onUserAddCallback}
          />
        }
      </SectionTitleRow>

      <RenderItems
        items={membersList}
        showButton={showDeleteUser}
        buttonTitle={"Delete"}
        onButtonClickCallback={onUserDeleteCallback}
        />

      { showLeaveList &&
        <div style={{ marginTop: '50px' }}>
          <ButtonComponent
            title="Leave List"
            onClickCallback={onLeaveListClickCallback}
          />
        </div>
      }
      <SectionTitleRow>
        <SectionTitle>Items</SectionTitle>
        <ButtonComponent
          title={showType === "ALL" ? "Show Active" : "Show All"}
          onClickCallback={onSwitchShowTypeClickCallback}
        />
      </SectionTitleRow>

      <RenderItems
        items={itemsList}
        showButton={true}
        buttonTitle={"Delete"}
        showSecondaryButton={true}
        secondaryButtonTitle={"Process"}
        onButtonClickCallback={onDeleteItemClickCallback}
        onSecondaryButtonClickCallback={onProcessItemClickCallback}
        />

      <div style={{ marginTop: '50px' }}>
        <ButtonComponent
          title="Add New Item"
          onClickCallback={onAddNewItemClickCallback}
        />
      </div>

    </ScreenContainer>
  );
};

export default ListDetailPage;
