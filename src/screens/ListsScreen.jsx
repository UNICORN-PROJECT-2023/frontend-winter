import React, { useState, useEffect, useContext } from 'react';
import { getLists, createList, deleteList } from '../services/ListsService';
import ListsPage from '../pages/ListsPage';
import { AppContext } from '../providers/AppProvider';

const ListsScreen = ({ children }) => {
  const { appState, setAppState } = useContext(AppContext);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    setAppState("loading");
    
    const result = await getLists();

    if(!result.success) {
      console.error("Error fetching lists: ", result.error);
      setAppState("error");
      return;
    }

    const listsData = result.body.data;
    setLists(listsData);
    setAppState("ready");
  };

  const onListClick = (listId) => {
    // Navigate to list detail page
    window.location.href = '/list/' + listId ;
  };

  const onAddNewListClickCallback = async (title) => {
    const newListTitle = prompt('Enter new list title:');
    const newList = { id: Date.now(), name: newListTitle, type: 'owner', status: 'active' }; // This should be returned from the backend
    await createList(newList);
    setLists(prevLists => [...prevLists, newList]);
  };

  const onDeleteListClickCallback = async (listId) => {
    const confirmation = window.confirm('Are you sure you want to delete this list?');

    if (confirmation) {
      // set the list status to archived
      await deleteList(listId);
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
