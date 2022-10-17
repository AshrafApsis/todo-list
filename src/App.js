
import './App.css';

import { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import CreateTodo from './components/create-todo.component';
import { BASE_URL } from './constants';






function App() {

  const [todos, setTodos] = useState([]);


  useEffect(() => {
    getTodos();
  }, [])


 
 






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
        <CreateTodo  ></CreateTodo>
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
                  // setTaskName(e.name);
                  // setTaskDetails(e.detail);
                  // setFromDate(e.start_time);
                  // setToDate(e.end_time);
                  // setStatus(e.status)
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
