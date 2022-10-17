import { useState } from "react";
import { Col, Form, Row, Button,Alert } from "react-bootstrap";

import { BASE_URL } from "./constants";

const CreateTodo = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");

  const [showAlert, setAlert] = useState({ variant: "", msg: "" });

  const [isEdit, setEdit] = useState(false);

  const [selectedTask, setSelectedTask] = useState({});

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
        name: taskName,
        detail: taskDetails,
        start_time: fromDate,
        end_time: toDate,
        status: status,
      };
      await fetch(`${BASE_URL}/todos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(createTodo),
      }).then((response) => response.json());
      await getTodos();
      setAlert({ variant: "success", msg: "TODO saved successfully" });
      //console.log(data);
    } catch (error) {
      console.log("error ===> ", error);
    }
  };

  const updateTask = async () => {
    console.log("selectedTaskselectedTask", selectedTask);
    // e.preventDefault();
    console.log(`taskName ==> ${taskName}`);
    console.log(`taskDetails ==> ${taskDetails}`);
    console.log(`fromDate ==> ${fromDate}`);
    console.log(`toDate ==> ${toDate}`);
    console.log(`status ==> ${status}`);

    try {
      let createTodo = {
        name: taskName,
        detail: taskDetails,
        start_time: fromDate,
        end_time: toDate,
        status: status,
      };
      console.log("----------->>>>>>>>>>>", createTodo);
      await fetch(`${BASE_URL}/todos/${selectedTask.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createTodo),
        // mode: 'cors',
      }).then((response) => {
        console.log("------------------------", response);
        // response.json()
      });
      await getTodos();
      setAlert({ variant: "success", msg: "TODO UPDATED successfully" });
      setEdit(false);

      //console.log(data);
    } catch (error) {
      console.log("error ===> ", error);
    }
  };

  return (
    <>
      <Form className="mt-5">
        {showAlert.msg && (
          <Alert variant={showAlert.variant}>{showAlert.msg}</Alert>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={selectedTask?.name}
            value={taskName}
            placeholder="Task Name"
            onChange={(event) => setTaskName(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Details</Form.Label>
          <Form.Control
            type="text"
            defaultValue={selectedTask?.detail}
            value={taskDetails}
            placeholder="Details"
            onChange={(event) => setTaskDetails(event.target.value)}
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="From Date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="To Date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task Progress</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option>Select Status</option>
            <option value="Open">Open</option>
            <option value="Close">Close</option>
          </Form.Select>
        </Form.Group>

        <Button
          variant="primary"
          size="lg"
          onClick={!isEdit ? () => createTask() : () => updateTask()}
        >
          {isEdit ? "Edit task" : "Add Task"}
        </Button>
      </Form>
    </>
  );
};

export default CreateTodo;
