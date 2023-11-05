import React, { useEffect, useState } from 'react';
import ListDetailPage from '../pages/ListDetailPage';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../services/ListsService';

const ListDetailScreen = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    type: "",
    members: [],
    items: []
  });
  
  const [showType, setShowType] = useState('ALL');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const response = await getArticleById(id);
    // Assume the response will have the necessary structure
    setData(response.data);
  };

  const onItemNameEditCallback = () => {
    const newName = prompt('Enter new name:', data.name);
    if (newName) {
      setData({ ...data, name: newName });
    }
  };

  const handleAddMember = () => {
    const newMemberName = prompt('Enter new member name:');
    if (newMemberName) {
      const newMember = { id: Date.now(), title: newMemberName };
      setData({ ...data, members: [...data.members, newMember] });
    }
  };

  const handleDeleteMember = (memberId) => {
    setData({ ...data, members: data.members.filter(member => member.id !== memberId) });
  };

  const handleSwitchShowType = () => {
    setShowType(showType === 'ALL' ? 'ACTIVE' : 'ALL');
  };

  const handleAddNewItem = () => {
    const newItemTitle = prompt('Enter new item title:');
    if (newItemTitle) {
      const newItem = { id: Date.now(), title: newItemTitle, active: true };
      setData({ ...data, items: [...data.items, newItem] });
    }
  };

  const handleDeleteItem = (itemId) => {
    setData({ ...data, items: data.items.filter(item => item.id !== itemId) });
  };

  const handleProcessItem = (itemId) => {
    setData({ ...data, items: data.items.map(item => item.id === itemId ? { ...item, active: false } : item) });
  }

  const handleLeaveList = () => {
    alert('You left the list!, redirecting to home page...');
    window.location.href = '/';
  }

  // Filtering items based on showType
  const filteredItems = data.items.filter(item => showType === 'ALL' || item.active);

  const isOwner = data.type === 'owner';

  return (
    <ListDetailPage
      itemListName={data.name}
      onItemListNameEditCallback={onItemNameEditCallback}
      showItemListNameEdit={isOwner}
      showAddUser={isOwner}
      showDeleteUser={isOwner}
      showLeaveList={!isOwner}
      membersList={data.members}
      itemsList={filteredItems}
      showType={showType}
      onSwitchShowTypeClickCallback={handleSwitchShowType}
      onUserAddCallback={handleAddMember}
      onUserDeleteCallback={handleDeleteMember}
      onAddNewItemClickCallback={handleAddNewItem}
      onDeleteItemClickCallback={handleDeleteItem}
      onProcessItemClickCallback={handleProcessItem}
      onLeaveListClickCallback={handleLeaveList}
    />
  );
};

export default ListDetailScreen;
