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
  Empty,
  Card,
  Typography,
  Space
} from 'antd';
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  ExpandOutlined
} from '@ant-design/icons';
import { Skeleton } from 'antd'; 
import styles from './ToDoList.module.css';
import { API_URL } from '../../config/api';

const { Title, Text, Paragraph } = Typography;

function Todo() {
  const [userId, setUserId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [allToDo, setAllToDo] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [currentTaskType, setCurrentTasktype] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [isViewing, setIsViewing] = useState(false);
  const [viewItem, setViewItem] = useState(null);

  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userdata = JSON.parse(user);
      setFirstname(userdata.firstname);
      setUsername(userdata.username);
      setUserId(userdata.userid);
    }
  }, []);

  useEffect(() => {
    if (userId) getAllToDo();
  }, [userId]);

  const displayedTodos = allToDo.filter(item => {
    const matchesSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (currentTaskType === "Incomplete") return matchesSearch && !item.isCompleted;
    if (currentTaskType === "Complete") return matchesSearch && item.isCompleted;
    return matchesSearch;
  });

  const getAllToDo = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/todo/get-all-to-do/${userId}`);
      const data = await res.json();
      setAllToDo(data);
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false);
    }
  };

  const handleAddTask = async (values) => {
    try {
      await axios.post(`${API_URL}/todo/create-to-do`, {
        ...values,
        isCompleted: false,
        createdBy: userId
      });

      message.success("Task added successfully");
      setIsAdding(false);
      addForm.resetFields();
      getAllToDo();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setCurrentEditItem(item);
    editForm.setFieldsValue({
      title: item.title,
      description: item.description,
      isCompleted: item.isCompleted
    });
    setIsEditing(true);
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`${API_URL}/todo/delete-to-do/${item._id}`);
      message.success(`${item.title} has been deleted`);
      getAllToDo();
    } catch (err) {
      console.log(err);
      message.error('There has been an error deleting the task');
    }
  };

  const handleUpdateTask = async (values) => {
    try {
      await axios.patch(`${API_URL}/todo/update-to-do/${currentEditItem._id}`, values);
      message.success(`${currentEditItem.title} updated`);
      setIsEditing(false);
      editForm.resetFields();
      getAllToDo();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleStatus = async (item) => {
    try {
      const updatedStatus = !item.isCompleted;
      await axios.patch(`${API_URL}/todo/update-to-do/${item._id}`, { isCompleted: updatedStatus });
      message.success(updatedStatus ? `${item.title} marked as completed` : `${item.title} marked as incomplete`);
      getAllToDo();
    } catch (err) {
      console.log(err);
      message.error("Failed to update status");
    }
  };

  const getFormattedDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleTypeChange = (value) => {
    setCurrentTasktype(value);
  };

  const handleViewDetails = (item) => {
    setViewItem(item);
    setIsViewing(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* WELCOME BANNER
        <div className="mb-8">
          <Text type="secondary" className="text-lg">Welcome back,</Text>
          <Title level={2} style={{ margin: 0 }} className="font-extrabold text-gray-800">
            {username || 'User'} 
          </Title>
        </div> */}

        {/* WORKSPACE CONTROLS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Space size="middle" className="w-full md:w-auto flex-wrap">
            <Title level={3} style={{ margin: 0 }} className="font-bold tracking-tight font-play">
              {username || 'User'}'s Tasks
            </Title>
            <Tag color="blue" className="font-medium px-2 rounded-md">
              {allToDo.length} Tasks
            </Tag>
          </Space>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Input 
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search tasks..." 
              className="w-full sm:w-64 rounded-lg h-10"
              allowClear
            />

            <Select
              value={currentTaskType}
              style={{ width: 140 }}
              onChange={handleTypeChange}
              className="h-10"
              options={[
                { value: "All", label: 'All' },
                { value: "Incomplete", label: 'Pending' },
                { value: "Complete", label: 'Completed' }
              ]}
            />

            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => setIsAdding(true)}
              className="h-10 px-6 font-semibold rounded-lg w-full sm:w-auto shadow-md"
            >
              Add Task
            </Button>
          </div>
        </div>

        {/* GRID LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {
            loading ? (
            [...Array(4)].map((_, i) => (
              <Card key={i} className="rounded-xl shadow-sm">
                <Skeleton active paragraph={{ rows: 3 }} />
              </Card>
            ))
          ):displayedTodos.length > 0 ? (
            displayedTodos.map((item) => (
              <Card
                key={item._id}
                hoverable
                className={`rounded-xl overflow-hidden shadow-sm h-full flex flex-col justify-between group ${styles.toDoCard}`}
                styles={{
                          body: {
                            padding: '24px',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                          }
                        }}
                onClick={() => handleViewDetails(item)}
              >
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <Title level={4} style={{ margin: 0, fontSize: '1.15rem' }} className="truncate font-bold text-gray-800">
                      {item.title}
                    </Title>
                    <Tag 
                      color={item.isCompleted ? 'success' : 'warning'} 
                      className="px-2 py-0.5 rounded-md font-medium text-xs m-0 shrink-0"
                    >
                      {item.isCompleted ? 'Completed' : 'Pending'}
                    </Tag>
                  </div>
                  <Paragraph 
                    type="secondary" 
                    ellipsis={{ rows: 3 }} 
                    className="mb-4 "
                  >
                    {item.description}
                  </Paragraph>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-auto flex justify-between items-center">
                  <Text className="text-xs text-gray-400 tracking-wide font-play">
                    {getFormattedDate(item.createdAt)}
                  </Text>

                  <Space onClick={(e) => e.stopPropagation()} size="middle" className="opacity-70 group-hover:opacity-100 transition-opacity">
                    <Tooltip title="Edit Task">
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<EditOutlined className="text-gray-500 hover:text-blue-500 text-base" />} 
                        onClick={() => handleEdit(item)} 
                      />
                    </Tooltip>
                    
                    <Tooltip title="Delete Task">
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<DeleteOutlined className="text-red-400 hover:text-red-600 text-base" />} 
                        onClick={() => handleDelete(item)} 
                      />
                    </Tooltip>

                    <Tooltip title={item.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}>
                      <Button
                        type="text"
                        size="small"
                        icon={
                          item.isCompleted ? (
                            <CheckCircleFilled className="text-green-500 text-base" />
                          ) : (
                            <CheckCircleOutlined className="text-gray-300 hover:text-green-500 text-base" />
                          )
                        }
                        onClick={() => toggleStatus(item)}
                      />
                    </Tooltip>
                  </Space>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200 flex justify-center items-center">
              <Empty description={<span className="text-gray-400 font-medium">No tasks found matching your criteria.</span>} />
            </div>
          )}
        </div>
      </div>


      {/* VIEW DETAILS MODAL */}
      <Modal
        title={
          <Space>
            <ExpandOutlined className="text-blue-500" />
            <span>Full Task</span>
          </Space>
        }
        open={isViewing}
        onCancel={() => setIsViewing(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsViewing(false)}>Close</Button>
        ]}
        centered
        width={600}
      >
        {viewItem && (
          <div className="py-4">
            <div className="mb-6">
              <Text type="secondary" className="uppercase text-xs font-bold tracking-widest">Title</Text>
              <Title level={3} style={{ marginTop: 4 }}>{viewItem.title}</Title>
              <Tag color={viewItem.isCompleted ? 'green' : 'gold'}>
                {viewItem.isCompleted ? 'Completed' : 'Pending'}
              </Tag>
            </div>

            <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <Text type="secondary" className="uppercase text-xs font-bold tracking-widest block mb-2">Full Description</Text>
              <Text className="text-lg leading-relaxed whitespace-pre-wrap">
                {viewItem.description}
              </Text>
            </div>

            <div className="flex justify-between text-gray-400 text-sm">
              <span>Created: {getFormattedDate(viewItem.createdAt)}</span>
              {viewItem.updatedAt && <span>Updated: {getFormattedDate(viewItem.updatedAt)}</span>}
            </div>
          </div>
        )}
      </Modal>

      {/* ADD MODAL */}
      <Modal
        title={<Title level={4} className="m-0 font-extrabold">New Task</Title>}
        open={isAdding}
        onCancel={() => setIsAdding(false)}
        onOk={() => addForm.submit()}
        okText="Add Task"
        cancelText="Cancel"
        className="rounded-2xl"
        centered
      >
        <Form form={addForm} layout="vertical" onFinish={handleAddTask} requiredMark={false} className="pt-4">
          <Form.Item
            name="title"
            label={<Text className="font-semibold text-gray-700">Title</Text>}
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="E.g., Daily Chores" className="rounded-md h-10" />
          </Form.Item>

          <Form.Item
            name="description"
            label={<Text className="font-semibold text-gray-700">Description</Text>}
            rules={[{ required: true, message: "Description is required" }]}
          >
            <Input.TextArea placeholder="Break down your steps..." rows={4} className="rounded-md" />
          </Form.Item>
        </Form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        title={<Title level={4} className="m-0 font-extrabold">Update Task</Title>}
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={() => editForm.submit()}
        okText="Save Changes"
        cancelText="Discard"
        className="rounded-2xl"
        centered
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdateTask} requiredMark={false} className="pt-4">
          <Form.Item 
            name="title" 
            label={<Text className="font-semibold text-gray-700">Title</Text>}
            rules={[{ required: true, message: 'Missing Title' }]}
          >
            <Input className="rounded-md h-10" />
          </Form.Item>

          <Form.Item 
            name="description" 
            label={<Text className="font-semibold text-gray-700">Description</Text>}
            rules={[{ required: true, message: 'Missing Description' }]}
          >
            <Input.TextArea rows={4} className="rounded-md" />
          </Form.Item>

          <Form.Item name="isCompleted" label={<Text className="font-semibold text-gray-700">Status</Text>}>
            <Select
              className="h-10"
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