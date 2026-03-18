import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Input,
  Modal,
  message,
  Tag,
  Tooltip,
  Select,
  Form,
  Empty
} from 'antd';
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import styles from './ToDoList.module.css';

function Todo() {
  const [userId, setUserId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [allToDo, setAllToDo] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [currentTaskType, setCurrentTasktype] = useState("Incomplete");
  const [searchedTodo, setSearchedTodo] = useState([]);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const API_URL = 'http://localhost:9000';

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userdata = JSON.parse(user);
      setFirstname(userdata.firstname);
      setUserId(userdata.userid);
    }
  }, []);

  useEffect(() => {
    if (userId) getAllToDo();
  }, [userId]);

  const filteredTodos = allToDo.filter((item) => {
  if (currentTaskType === "Incomplete") return !item.isCompleted;
  if (currentTaskType === "Complete") return item.isCompleted;
  return true; // All
});

  const getAllToDo = async () => {
    try {
      const res = await fetch(`${API_URL}/todo/get-all-to-do/${userId}`);
      const data = await res.json();
      setAllToDo(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ADD TASK
  const handleAddTask = async (values) => {
    try {
      await axios.post(`${API_URL}/todo/create-to-do`, {
        ...values,
        isCompleted: false,
        createdBy: userId
      });

      message.success("Task added");
      setIsAdding(false);
      addForm.resetFields();
      getAllToDo();
    } catch (err) {
      console.log(err);
    }
  };

  // OPEN EDIT
  const handleEdit = (item) => {
    setCurrentEditItem(item);

    editForm.setFieldsValue({
      title: item.title,
      description: item.description,
      isCompleted: item.isCompleted
    });

    setIsEditing(true);
  };

  // Delete task
  const handleDelete = async(item)=>{
    try{
      const response = await axios.delete(`${API_URL}/todo/delete-to-do/${item._id}`);
      console.log(response.data);
      message.success(`${item.title} has been deleted`);
      getAllToDo();
    } catch(err){
      console.log(err);
      message.error('there has been an error')
    }
  }

  // UPDATE TASK
  const handleUpdateTask = async (values) => {
    try {
      await axios.patch(
        `${API_URL}/todo/update-to-do/${currentEditItem._id}`,
        values
      );

      message.success("Task updated");
      setIsEditing(false);
      editForm.resetFields();
      getAllToDo();
    } catch (err) {
      console.log(err);
    }
  };

  // Status Change 
  const toggleStatus = async (item) => {
  try {
    const updatedStatus = !item.isCompleted;

    await axios.patch(
      `${API_URL}/todo/update-to-do/${item._id}`,
      { isCompleted: updatedStatus }
    );

    message.success(
      updatedStatus ? "Marked as completed" : "Marked as incomplete"
    );

    getAllToDo();

  } catch (err) {
    console.log(err);
    message.error("Failed to update status");
  }
};
  const getFormattedDate = (value) => {
    const date = new Date(value);
    return date.toLocaleString();
  };

  // Type change
  const handleTypeChange=(value)=>{
    console.log(value);
    setCurrentTasktype(value);
    if(value==='incomplete'){
      setCurrentTodoTask(incompletedTodo);
    } else if(value==='complete'){
      setCurrentTodoTask(completedTodo)
    } else{
      setCurrentTodoTask(allToDo)
    }
    getAllToDo();
  }


  // search function
  const handleSearch=(e)=>{
    let query = (e.target.value);
    let filteredList = allToDo.filter((item)=>item.title.toLowerCase().match(query.toLowerCase()));
    console.log(filteredList);
    if(filteredList.length> 0 && query){
      setSearchedTodo(filteredList);
    } else{
      setSearchedTodo([]);
    }
  }

  return (
    <div className="flex flex-col">
      <div>Hello {firstname}</div>

      {/* HEADER */}
      <div className="flex gap-7 pb-6">
        <h1 className='font-bold text-3xl'>Your Tasks</h1>
        <div className='w-300'><Input type='text' onChange={handleSearch} placeholder='search your task Here....' /></div>
        <Button type="primary" onClick={() => setIsAdding(true)}>
          Add Task
        </Button>
        <Select
             value={currentTaskType}
             style={{width:180,marginLeft:'10px'}}
             size ="large"
             onChange={handleTypeChange}
             options={[
              { value: "All", label:'All' },
              { value: "Incomplete", label:'Incomplete' },
              { value:"Complete", label:'Complete' }
            ]}/>
      </div>

      {/* LIST */}
      <div className={styles.toDoListCardWrapper}>
        {searchedTodo.length>0? searchedTodo.map((item) => {
          return(
          <div key={item._id} className={styles.toDoCard}>
            <div>
              <div className={styles.toDoCardHeader}>
                <h3>{item.title}</h3>
                <Tag color={item.isCompleted ? 'cyan' : 'red'}>
                  {item.isCompleted ? 'Completed' : 'Incomplete'}
                </Tag>
              </div>
              <p>{item.description}</p>
            </div>

            <div className={styles.toDoCardFooter}>
              <Tag>{getFormattedDate(item.createdAt)}</Tag>

              <div>
                <Tooltip title="Edit">
                  <EditOutlined onClick={() => handleEdit(item)} />
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteOutlined style={{ color: 'red' }} onClick={()=> handleDelete(item)} />
                </Tooltip>
                {item.isCompleted ? (
                  <Tooltip title="Mark as Incomplete">
                  <CheckCircleFilled 
                  className={styles.actionIcon}
                  style={{ color: item.isCompleted ? "green" : "gray" }}
                  onClick={()=>toggleStatus(item)}
                  />
                  </Tooltip>
                ) : (
                  <Tooltip title='Mark as complete'>
                  <CheckCircleOutlined
                  className={styles.actionIcon}
                  style={{ color: item.isCompleted ? "green" : "gray" }}
                  onClick={()=>toggleStatus(item)}
                  />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        )}): filteredTodos.length>0 ? filteredTodos.map((item)=>{
          return(
          <div key={item._id} className={styles.toDoCard}>
            <div>
              <div className={styles.toDoCardHeader}>
                <h3>{item.title}</h3>
                <Tag color={item.isCompleted ? 'cyan' : 'red'}>
                  {item.isCompleted ? 'Completed' : 'Incomplete'}
                </Tag>
              </div>
              <p>{item.description}</p>
            </div>

            <div className={styles.toDoCardFooter}>
              <Tag>{getFormattedDate(item.createdAt)}</Tag>

              <div>
                <Tooltip title="Edit">
                  <EditOutlined onClick={() => handleEdit(item)} />
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteOutlined style={{ color: 'red' }} onClick={()=> handleDelete(item)} />
                </Tooltip>
                {item.isCompleted ? (
                  <Tooltip title="Mark as Incomplete">
                  <CheckCircleFilled 
                  className={styles.actionIcon}
                  style={{ color: item.isCompleted ? "green" : "gray" }}
                  onClick={()=>toggleStatus(item)}
                  />
                  </Tooltip>
                ) : (
                  <Tooltip title='Mark as complete'>
                  <CheckCircleOutlined
                  className={styles.actionIcon}
                  style={{ color: item.isCompleted ? "green" : "gray" }}
                  onClick={()=>toggleStatus(item)}
                  />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        )
        }):
        <div className={styles.noTaskWrapper}>
          <Empty />
        </div>
        }
      </div>

      {/* ADD MODAL */}
      <Modal
        title="Add Task"
        open={isAdding}
        onCancel={() => setIsAdding(false)}
        onOk={() => addForm.submit()}
      >
        <Form form={addForm} layout="vertical" onFinish={handleAddTask}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
        </Form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        title="Edit Task"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={() => editForm.submit()}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdateTask}>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="isCompleted">
            <Select
              options={[
                { value: true, label: "Completed" },
                { value: false, label: "Incomplete" }
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Todo;