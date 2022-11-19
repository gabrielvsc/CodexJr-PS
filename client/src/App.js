import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const user = localStorage.getItem("token")

  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');


  //adiciona novo item para a database
  //TODO - adicionar relação com ID do usuario
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("token");
        if (!userId) return
        const { id } = JSON.parse(userId);

      const res = await axios.post('http://localhost:8080/api/item', { item: itemText , userId: id});
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    } catch (error) {
      console.log(error);
    }
  }

  //Create function to fetch all todo items from database - use useEffect hook
  //TODO - implementar relação com id do usuario
  useEffect(() => {
    const getItemList = async () => {
      try {
        const userId = localStorage.getItem("token");
        if (!userId) return
        const {id} = JSON.parse(userId);

        const res = await axios.get(`http://localhost:8080/api/item/${id}`)
        setListItems(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getItemList()
  }, []);

  //Delete item when clicked on delete
  //TODO relacionar com ID do usuario
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/item/${id}`)
      const newListItems = listItems.filter(item => item._id != id)
      setListItems(newListItems)
    } catch (error) {
      console.log(error)
    }
  }

  //Update Item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const id = isUpdating;

      const res = await axios.put(`http://localhost:8080/api/item/${id}`, {item: updateItemText});
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    } catch (error) {
      console.log(error)
    }
  }

  //befora updating we need to show input field where we will creat our update item
  // const UpdateForm = () => (
  //   <form className='update-form' onSubmit={(e) => {updateItem(e)}}>
  //     <input className='update-new-input' type="text" placeholder="New Item" onChange={e => setUpdateItemText(e.target.value)} value={updateItemText}/>
  //     <button className='update-new-btn' type='submit'>Update</button>
  //   </form>
  // )


  return (
    <><div className='App'>
      <h1>Todo List</h1>
      <form className='form' onSubmit={e => addItem(e)}>
        <input type="text" placeholder='Add Todo Item' onChange={e => { setItemText(e.target.value) }} value={itemText} />
        <button type='submit'>Add</button>
      </form>
      <div className='todo-listItems'>
        {
          listItems.map(item => (
        <div className='todo-item' key={ item._id }>
          {
            isUpdating === item._id
            ? <form className='update-form' onSubmit={(e) => {updateItem(e)}}>
            <input className='update-new-input' type="text" placeholder="New Item" onChange={e => setUpdateItemText(e.target.value)} value={updateItemText}/>
            <button className='update-new-btn' type='submit'>Update</button>
          </form>
            : <>
                <p className='item-content'>{item.item}</p>
                <button className='update-item' onClick={() => {setIsUpdating(item._id)}}>Update</button>
                <button className='delete-item' onClick={() => {deleteItem(item._id)}}>Delete</button>
                <button className='complete-item' onClick={() => {deleteItem(item._id)}}>Complete</button>
              </>
          }
        </div>
        ))
        }
      </div>



    </div><Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes></>
  );
}

export default App;
