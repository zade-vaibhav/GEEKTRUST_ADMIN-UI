import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Delete from './Components/Delete';
import Edit from './Components/Edit';
import Pagenation from './Components/pagenation';
import TableRows from './Components/TableRows';



function App() {
  const [searchinput, setSearchInput] = useState("")
  const [users, setUsers] = useState([])
  const [filteredUser,setFilteredUser]=useState([])
  const [selectedAll, setSelectedAll] = useState(false)
  const [editUser,setEdituser]=useState(-1)
  const[page,setPage]=useState(1)
  const userPerPage=10;
  // const totalUsers=users.length;
  const start=(page*userPerPage)-userPerPage
  const end=page*userPerPage;
  
  useEffect(() => {
    const fetchingUser = async () => {
      const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      const res_data = await response.json();
      setUsers(res_data)
      setFilteredUser(res_data)
    }
    fetchingUser()
  },[]) 

  const selectAll = () => {
    setSelectedAll(!selectedAll);
    const updatedUser=users.map((user,ind) =>ind>=start && ind+1<=end ?({ ...user, selected: !selectedAll }):{...user})
    setUsers(updatedUser)
    setFilteredUser(filteredUser.map((user,ind) =>ind>=start && ind+1<=end ?({ ...user, selected: !selectedAll }):{...user}))

  }
  

  const select = (id) => {
    const updatedUser=users.map((user => user.id === id ? { ...user, selected: !user.selected } : user))
    setUsers(updatedUser)
    setFilteredUser(filteredUser.map(user => user.id === id ?({ ...user, selected: !selectedAll }):{...user}))
  }

  const keyWords=["name","email","role"]
  useEffect(()=>{
    const searchFilter=()=>{
      if(searchinput===""){
        setUsers(filteredUser)
      }else{
        setUsers(users.filter((ele)=>{return keyWords.some((key)=>{
          return ele[key].toLowerCase().includes(searchinput)
        })
      }))
      }
      } 
    searchFilter()
  },[searchinput])
  

  return (
    <div className='container'>
          <div className='container__top'>
              <input className="searchbar" placeholder='Search by name,email or role' value={searchinput} onChange={(e) =>{setSearchInput(e.target.value)}} />
          </div>
          <div className='container__tablecontainer'>
          <table cellSpacing={0}>
          <thead>
            <tr className='table_headderRow'>
              <th><input className='headder_checkbox' type='checkbox' checked={selectedAll} onChange={selectAll} /></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.slice(start,end).map((ele) =>
             editUser===ele.id?<Edit key={ele.id} currEle={ele} users={users} setUsers={setUsers} setFilteredUser={setFilteredUser} setEdituser={setEdituser}/>
             :
              <TableRows key={ele.id} ele={ele} setUsers={setUsers} setFilteredUser={setFilteredUser} users={users} setEdituser={setEdituser} select={select}/> 
              )
            }
          </tbody>
        </table>
        <div className='container__bottom'>
          <div className="container__bottom_Left">
            <Delete setUsers={setUsers} filteredUser={filteredUser} setFilteredUser={setFilteredUser} users={users}/>
          </div >
          <div className='container__bottom_Right'>
          <Pagenation users={users} page={page} setPage={setPage} userPerPage={userPerPage}/>
          </div>
        </div>
    </div>
    </div>
  );
}

export default App;
