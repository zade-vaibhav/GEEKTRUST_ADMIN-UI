import React from 'react'
import "../styles/Pagenation.css"
const Pagenation = ({users,page,setPage,userPerPage}) => {
    const totalPages=Math.ceil(users.length/userPerPage);
    
    const pagePrev=()=>{
        if(page>1){
            setPage(page-1)
        }
    }

    const pageNext=()=>{
        if(page<totalPages)
        setPage(page+1)
    }

    const jumpPage=(number)=>{
        setPage(number)
    }
  return (
    <div>
      <button className='navigate__button' onClick={pagePrev}>prev</button>
    {
        Array.from({length:totalPages}).map((ele,ind)=>
            <span key={ind}>
                <span className={page==ind+1?"navigate__button_numbers_Active":"navigate__button_numbers"} onClick={()=>jumpPage(ind+1)}>{ind+1}</span>
            </span>
        )
    }
      <button className='navigate__button' onClick={pageNext}>next</button>
    </div>
  )
}

export default Pagenation;
