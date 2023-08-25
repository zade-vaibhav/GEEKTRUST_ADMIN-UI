import React from 'react'
import "../styles/TableRow.css"
import { AiOutlineDelete,AiOutlineEdit} from "react-icons/ai"

const Table = ({ele,select,setUsers,setEdituser,setFilteredUser,users}) => {
   
  const deleteUser = (id) => {
    const newUsers=users.filter(user => user.id !== id)
    setUsers(newUsers)
    setFilteredUser(newUsers)
  }

  const edit=(id)=>{
      setEdituser(id)
  }
  
  return (
           <tr className={ele.selected?"checked_background":""}>
             <td><input className='row_checkbox' type='checkbox' checked={ele.selected} onChange={() => select(ele.id)} /></td>
             <td>{ele.name}</td>
             <td>{ele.email}</td>
             <td>{ele.role}</td>
             <td><AiOutlineDelete className='user_delete' onClick={()=>deleteUser(ele.id)}/><AiOutlineEdit className='user_edit' onClick={()=>{edit(ele.id)}}/></td>
           </tr> 
    
               
  )
}

export default Table
