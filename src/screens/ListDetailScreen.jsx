import React, { useState, useEffect, useContext } from 'react';
import ListDetailPage from '../pages/ListDetailPage';
import { useParams } from 'react-router-dom';
import { getListById, updateList } from '../services/ListsService';
import { AppContext } from '../providers/AppProvider';

const ListDetailScreen = () => {
  const { appState, setAppState } = useContext(AppContext);
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
    setAppState("loading");
    const response = await getListById(id);

    if (!response.success) {
      console.error("Error fetching list: ", response.error);
      setAppState("error");
      return;
    }

    const listData = response.body.data;
    setData(listData);
    setAppState("ready");
  };

  const onItemNameEditCallback = async () => {
    const newName = prompt('Enter new name:', data.name);
    if (newName) {
      await updateList(id, { name: newName });
      setData({ ...data, name: newName });
    }
  };

  const handleAddMember = async () => {
    const newMemberName = prompt('Enter new member name:');
    if (newMemberName) {
      const newMember = { id: Date.now(), title: newMemberName };
      await updateList(id, { members: [...data.members, newMember] });
      setData({ ...data, members: [...data.members, newMember] });
    }
  };

  const handleDeleteMember = async (memberId) => {
    await updateList(id, { members: data.members.filter(member => member.id !== memberId)  });
    setData({ ...data, members: data.members.filter(member => member.id !== memberId) });
  };

  const handleSwitchShowType = () => {
    setShowType(showType === 'ALL' ? 'ACTIVE' : 'ALL');
  };

  const handleAddNewItem = async () => {
    const newItemTitle = prompt('Enter new item title:');
    if (newItemTitle) {
      const newItem = { id: Date.now(), title: newItemTitle, active: true };
      await updateList(id, { items: [...data.items, newItem] });
      setData({ ...data, items: [...data.items, newItem] });
    }
  };

  const handleDeleteItem = async (itemId) => {
    await updateList(id, { items: data.items.filter(item => item.id !== itemId) });
    setData({ ...data, items: data.items.filter(item => item.id !== itemId) });
  };

  const handleProcessItem = async (itemId) => {
    await updateList(id, { items: data.items.map(item => item.id === itemId ? { ...item, active: false } : item) });
    setData({ ...data, items: data.items.map(item => item.id === itemId ? { ...item, active: false } : item) });
  }

  const handleLeaveList = async () => {
    alert('You left the list!, redirecting to home page...');
    await updateList(id, { members: data.members.filter(member => member.id !== appState?.user?.id) });
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
