import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
/******
 Create task
(title,
description,
priority,
 Mark as
completed
deadline)
 Edit task
 Delete task
 Filter
(Completed
/ Pending)
https://698ec424aded595c2532b6b0.mockapi.io/task
 */
export const Create = () => {
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [priority, SetPriority] = useState("");
  const [mark, SetMark] = useState("");
  const [deadline, SetDeadline] = useState("");

  const navigate = useNavigate();


  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    axios
      .post(API,{
        title,
        description,
        priority,
        mark,
        deadline,
      })
      .then((res) => {
        navigate("/");
        console.log("res", res);
        
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <>
      <div>
        <h1>Create Task Manager</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              placeholder="Title name"
              onChange={(e) => SetTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => SetDescription(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="priority">Priority</label>
            <input
              type="text"
              value={priority}
              placeholder="Priority"
              onChange={(e) => SetPriority(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="title">Mark as complited</label>
            <select value={mark} onChange={(e) => SetMark(e.target.value)}>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="on going">On going</option>
            </select>
          </div>
          <div>
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              value={deadline}
              placeholder="Deadline date"
              onChange={(e) => SetDeadline(e.target.value)}
            ></input>
          </div>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </>
  );
};
