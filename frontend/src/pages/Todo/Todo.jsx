import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Input, Divider, Modal, message, Tag, Tooltip, Select, Empty} from 'antd'
import { CheckCircleFilled,CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router';
import styles from './ToDoList.module.css'





function Todo() {
  const[userId, setUserId]= useState("")
  const[title, setTitle] = useState("");
  const[description, setDescription] = useState("")
  const[firstname, setFirstname] = useState("");
  const[lastname, setLastname] = useState("");
  const[username, setUsername] = useState("");
  const[isAdding, setIsAdding] = useState(false);
  const[allToDo, setAllToDo] = useState([]);
  const[loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const API_URL = 'http://localhost:9000';
    const user = localStorage.getItem('user');
  useEffect(()=>{
    const user = localStorage.getItem('user');
    if(user){
      const userdata = JSON.parse(user);
      setFirstname(userdata.firstname || 'firstname');
      setLastname(userdata.lastname || 'lastname');
      setUsername(userdata.username || 'firstname');
      setUserId(userdata.userid || '');
    }
  },[])
  
  useEffect(()=>{
    if(userId){
    getAllToDo();
  }
  },[userId]);

  const getAllToDo = async ()=>{
    try{
      const response = await fetch(`${API_URL}/todo/get-all-to-do/${userId}`);
      const data = await response.json();
      console.log(data);
      setAllToDo(data);

    }catch(error){
      console.error('Error fetching outgoing todos:', error);
    } finally{

    }
  }

  const handleSubmitTask = async()=>{
    try{
      const data ={
        title,
        description,
        isCompleted:false,
        createdBy:userId
      }
      const response = await axios.post(`${API_URL}/todo/create-to-do`, data);
      console.log(response.data);
      message.success("ToDo Task Added successfully");
      getAllToDo();
    }catch(err){
      console.log(err)
    }
  }



  const getFormattedDate = (value)=>{
    let date = new Date(value);
    let dateString = date.toDateString();
    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();
    let finalDate = `${dateString} at ${hh}:${min}:${ss}`;
    return finalDate;
  }
  

  return (
    <>
    <div className='flex flex-col'>
      <div>Hello {firstname}</div>
      <div className='flex gap-7 border-b border-[#0D4715]/10 shadow-sm pb-10'>
        <div className='font-bold text-3xl'>Your Tasks</div>
        <div className='w-300'><Input type='text' placeholder='search your task Here....' /></div>
        <div className=''><Button type='primary' size='large' onClick={()=>setIsAdding(true)}>Add Task</Button></div>
        <div>
          <Select
          value="All"
          size='large'
          style={{width:180}}
          options={[
            { Value: "", label:"All" },
            { Value: "", label:"Complete" },
            { Value: "", label:"Incomplete" }
          ]}
          />
        </div>
      </div>
      <div className={styles.toDoListCardWrapper}>
        { allToDo.map((item)=>{
          return(
          <div key={item?._id} className={styles.toDoCard}>
            <div>
              <div className={styles.toDoCardHeader}>
                <h3>{item?.title}</h3>
                {item?.isCompleted ? <Tag color='cyan'>Completed</Tag>:<Tag color='red'>Incomplete</Tag>}
              </div>
              <p>{item?.description}</p>
            </div>
            <div className={styles.toDoCardFooter}>
              <Tag color='blue'>{getFormattedDate(item?.createdAt)}</Tag>
              <div className={styles.toDoFooterAction}>
                <Tooltip title='Edit Task'><EditOutlined className={styles.actionIcon} /></Tooltip>
                <Tooltip title='Delete Task'><DeleteOutlined style={{color:'red'}} className={styles.actionIcon} /></Tooltip>
                {item?.isCompleted ? (
                  <Tooltip title="Mark as Incomplete">
                    <CheckCircleFilled 
                      className={styles.actionIcon}
                    />
                  </Tooltip>
                ):(
                  <Tooltip title = 'Mark as complete'>
                    <CheckCircleOutlined 
                      className={styles.actionIcon}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          
          
        )


        })}
      </div>

      <Modal confirmLoading={loading} title="Add New ToDo Task" open={isAdding} onOk={handleSubmitTask} onCancel={()=>setIsAdding(false)}>
        <Input type='text' style={{marginBottom:'1rem'}} placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}></Input>
        <Input.TextArea placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)}></Input.TextArea>
      </Modal>

    </div>
    </>
  )
}

export default Todo