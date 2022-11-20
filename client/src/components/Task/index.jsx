import styles from './styles.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { BsPencil, BsTrash, BsPlusLg } from 'react-icons/bs';

const Task = () => {
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
  
    return (
      <div className={styles.task_container}>
        <form className={styles.form_container} onSubmit={e => addItem(e)}>
          <h1>My Todo</h1>
          <div>
            <input type="text" placeholder='Add Todo Item' onChange={e => { setItemText(e.target.value) }} value={itemText} />
            <button type='submit'><BsPlusLg className={styles.icon}/></button>
          </div>
        </form>

        <div className={styles.items_container}>
          {
            listItems.map(item => (
          <div className={styles.todo_item} key={ item._id }>
            {
              isUpdating === item._id
              ? <form className={styles.update_form} onSubmit={(e) => {updateItem(e)}}>
              <input className='update-new-input' type="text" placeholder="New Item" onChange={e => setUpdateItemText(e.target.value)} value={updateItemText}/>
              <button className={styles.update_button} type='submit'><BsPencil className={styles.icon}/></button>
            </form>
              : <>
                  <div className={styles.checkbox_text}>
                    <input type="checkbox"></input>
                    <p className={styles.item_content}>{item.item}</p>
                  </div>
                  <div className={styles.item_buttons}>
                    <button className={styles.update_button} onClick={() => {setIsUpdating(item._id)}}><BsPencil className={styles.icon}/></button>
                    <button className={styles.delet_button} onClick={() => {deleteItem(item._id)}}><BsTrash className={styles.icon}/></button>
                  </div>
                </>
            }
          </div>
          ))
          }
        </div>
      </div>
    )
};

export default Task;