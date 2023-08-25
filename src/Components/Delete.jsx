import React from 'react'
import "../styles/Delete.css"
const Delete = ({setUsers,filteredUser,setFilteredUser,users}) => {

    const deletee=()=>{
         const newUsers= users.filter(ele => ele.selected !==true);
         setUsers(newUsers); 
         setFilteredUser(filteredUser.filter(ele => ele.selected !==true))   
      }
  return (
    <div className='deleteSelected__container' >
      <button className='deleteSelected__button' onClick={deletee}>Delete Selected</button>
    </div>
  )
}

export default Delete;
