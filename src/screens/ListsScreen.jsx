import React, { createContext, useState, useEffect } from 'react';
import { getLists, } from '../services/ListsService';
import ListsPage from '../pages/ListsPage';

const ListsScreen = ({ children }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    const result = await getLists();
    const listsData = result.data; // Assuming this is the structure that getLists returns
    setLists(listsData);
  };

  const onListClick = (listId) => {
    // Navigate to list detail page
    window.location.href = '/list/' + listId ;
  };

  const onAddNewListClickCallback = async (title) => {
    const newListTitle = prompt('Enter new list title:');
    const newList = { id: Date.now(), name: newListTitle, type: 'owner', status: 'active' }; // This should be returned from the backend
    setLists(prevLists => [...prevLists, newList]);
  };

  const onDeleteListClickCallback = async (listId) => {
    const confirmation = window.confirm('Are you sure you want to delete this list?');

    if (confirmation) {
      // set the list status to archived
      setLists(prevLists => prevLists.map(list => list.id === listId ? { ...list, status: 'archived' } : list));
    }
  };

  const myLists = lists.filter(list => list.type === 'owner' && list.status === 'active');
  const otherLists = lists.filter(list => list.type === 'member' && list.status === 'active');
  const archivedLists = lists.filter(list => list.status === 'archived');

  return (
    <ListsPage
      myLists={myLists}
      otherLists={otherLists}
      archivedLists={archivedLists}
      onListClick={onListClick}
      onAddNewListClickCallback={onAddNewListClickCallback}
      onDeleteListClickCallback={onDeleteListClickCallback}
    />
  );
};


export default ListsScreen;
