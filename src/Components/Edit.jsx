import React from 'react'
import "../styles/Edit.css"
const Edit = ({currEle,users,setUsers,setEdituser,setFilteredUser}) => {
    const updateuser=(e)=>{
        let newUser=users.map((ele)=>
         ele.id===currEle.id?{...ele,[e.target.name]:e.target.value}:ele
        )
        setUsers(newUser)
        setFilteredUser(newUser)
       }
       
       const update=()=>{
          setEdituser(-1)
       }
      
       return (
              <tr>
                 <td></td>
                 <td><input className='edit_user' type='text' name="name" onChange={(e)=>updateuser(e)} value={currEle.name}/></td>
                 <td><input className='edit_user' type='text' name="email" onChange={updateuser} value={currEle.email}/></td>
                 <td><input className='edit_user' type='text' name="role" onChange={updateuser} value={currEle.role}/></td>
                 <td><button className='update_user' onClick={update}>update</button></td>
              </tr>
       )
}

export default Edit
