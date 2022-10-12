
import './App.css';

import { useEffect, useState } from "react";
import { Col, Form, Row, Button, Table, Alert } from "react-bootstrap";



const BASE_URL = 'http://localhost:8000'


function App() {



  useEffect(() => {
    getTodos();
  }, [])


  const [taskName, setTaskName] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('');
  const [todos, setTodos] = useState([]);
  const [showAlert, setAlert] = useState({variant: '', msg: ""});

  const [isEdit,setEdit] = useState(false);

  const [selectedTask,setSelectedTask] = useState({});

  const createTask = async () => {
    //e.preventDefault();
    console.log(`taskName ==> ${taskName}`);
    console.log(`taskDetails ==> ${taskDetails}`);
    console.log(`fromDate ==> ${fromDate}`);
    console.log(`toDate ==> ${toDate}`);
    console.log(`status ==> ${status}`);

    try {
      //"2022-10-13 04:56:17"

      let createTodo = {
        "name": taskName,
        "detail": taskDetails,
        "start_time": fromDate,
        "end_time": toDate,
        "status": status

      }
       await fetch(`${BASE_URL}/todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(createTodo)
    
      })
        .then(response => response.json());
        await getTodos();
        setAlert({variant: "success", msg: "TODO saved successfully"})
      //console.log(data);
    } catch (error) {
      console.log("error ===> ", error);
    }

  };


  const updateTask = async (taskId) => {
    console.log('selectedTaskselectedTask',selectedTask);
   // e.preventDefault();
    console.log(`taskName ==> ${taskName}`);
    console.log(`taskDetails ==> ${taskDetails}`);
    console.log(`fromDate ==> ${fromDate}`);
    console.log(`toDate ==> ${toDate}`);
    console.log(`status ==> ${status}`);

    try {
     

      let createTodo = {
        "name": taskName,
        "detail": taskDetails,
        "start_time": fromDate,
        "end_time": toDate,
        "status": status

      }
      console.log('----------->>>>>>>>>>>',createTodo);
      await fetch(`${BASE_URL}/todos/${selectedTask.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createTodo)
        // mode: 'cors',
      })
        .then(response => {
          console.log('------------------------', response);
          // response.json()
        });
        await getTodos();
        setAlert({variant: "success", msg: "TODO UPDATED successfully"});
        setEdit(false); 
      
      //console.log(data);
    } catch (error) {
      console.log("error ===> ", error);
    }

  };


  const getTodos = async () => {
    try {
      //"2022-10-13 04:56:17"
      let data = await fetch(`${BASE_URL}/todos/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        },
        // mode: 'cors',
      })
        .then(response => response.json());

      console.log("todso ===>", data);
      setTodos(data);
    } catch (error) {
      console.log("error ===> ", error);
    }
  }

  const deleteTodo = async (id) => {
    try {
      //"2022-10-13 04:56:17"
      let data = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',

        },
        // mode: 'cors',
      })
        .then(response => response.json());

      console.log("todso ===>", data);
      await getTodos();
      setAlert({variant: "success", msg: "TODO deleted successfully"})
     
    } catch (error) {
      console.log("error ===> ", error);
    }
  }
 

  return (
    <>
      <div className='container'>
        <h1 className="mt-5">ADD TASK</h1>
        <Form className="mt-5">
        {showAlert.msg &&  <Alert variant={showAlert.variant}>
          {showAlert.msg}
        </Alert>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" defaultValue={selectedTask?.name} value={taskName} placeholder="Task Name" onChange={event => setTaskName(event.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Details</Form.Label>
            <Form.Control type="text" defaultValue={selectedTask?.detail} value={taskDetails} placeholder="Details" onChange={event => setTaskDetails(event.target.value)} />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>From Date</Form.Label>
                <Form.Control type="datetime-local" placeholder="From Date" value={fromDate} onChange={event => setFromDate(event.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>To Date</Form.Label>
                <Form.Control type="datetime-local" placeholder="To Date" value={toDate} onChange={event => setToDate(event.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Progress</Form.Label>
            <Form.Select aria-label="Default select example" value={status} onChange={event => setStatus(event.target.value)}>
              <option>Select Status</option>
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" size="lg" onClick={ !isEdit ? ()=> createTask() :(e)=> updateTask(e.id)}>
            {isEdit ? 'Edit task' : 'Add Task'   }
          </Button>
        </Form>

        <hr />
        <h2 className="mt-5"> TASKS LIST</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Select Date</Form.Label>
          <Form.Control type="date" placeholder="Select Date" />
        </Form.Group>

       {
        todos.length === 0 ? <p>No todo found</p>  :  <Table striped bordered className="mb-5">
        <thead>
          <tr>
            <th>Sr.No</th>

            <th>Task Name</th>

            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((e, index) => (
            <tr key={e.id}>
              <td>{index + 1}</td>
              <td>
                {e.name}
              </td>
              <td
                style={{
                  color: e.status.toLowerCase().toString().includes("open")
                    ? "green"
                    : "red",
                }}
              >
                {e.status}
              </td>
              <td>{e.start_time}</td>
              <td>{e.end_time}</td>
              <td style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button variant="primary" size="sm" onClick={()=>{
                  setEdit(true); 
                  setSelectedTask({...e})
                  setTaskName(e.name);
                  setTaskDetails(e.detail);
                  setFromDate(e.start_time);
                  setToDate(e.end_time);
                  setStatus(e.status)
                  }}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={()=> deleteTodo(e.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
       }

       
      </div>

    </>


  );



}

export default App;
