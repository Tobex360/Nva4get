import React, { useState, useEffect } from 'react'
import { Button, Input, Divider, Modal, message, Tag, Tooltip, Select, Empty} from 'antd'
import { CheckCircleFilled,CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'




function Todo() {
  const[firstname, setFirstname] = useState("");
  const[lastname, setLastname] = useState("");
  const[username, setUsername] = useState("");

  useEffect(()=>{
    const user = localStorage.getItem('user');
    if(user){
      const userdata = JSON.parse(user);
      setFirstname(userdata.firstname || 'firstname');
      setLastname(userdata.lastname || 'lastname');
      setUsername(userdata.username || 'firstname');
    }
  },[])



  return (
    <>
    <div className='flex flex-col'>
      <div>Hello {firstname}</div>
      <div className='flex gap-7 border-b border-[#0D4715]/10 shadow-sm pb-10'>
        <div className='font-bold text-3xl'>Your Tasks</div>
        <div className='w-300'><Input type='text' placeholder='search your task Here....' /></div>
        <div className=''><Button type='primary' size='large'>Add Task</Button></div>
        <div>
          <Select
          value="All"
          size='large'
          style={{width:180}}
          options={[
            {Value: "", label:"All"},
            {Value: "", label:"Complete"},
            {Value: "", label:"Incomplete"}
          ]}
          />
        </div>
      </div>

    </div>
    </>
  )
}

export default Todo