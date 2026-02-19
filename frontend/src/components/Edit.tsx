import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Edit = () => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [mark, setMark] = useState("Completed");
  const [deadline, setDeadline] = useState("");

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`https://698ec424aded595c2532b6b0.mockapi.io/task/${id}`, {
        title,
        description,
        priority,
        mark,
        deadline,
      })
      .then(() => {
        alert("Data updated successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    setId(localStorage.getItem("id") ?? "");
    setTitle(localStorage.getItem("title") ?? "");
    setDescription(localStorage.getItem("description") ?? "");
    setPriority(localStorage.getItem("priority") ?? "");
    setMark(localStorage.getItem("mark") ?? "");
    setDeadline(localStorage.getItem("deadline") ?? "");
  }, []);
//input section
  return (
    <>
      <div>
        <h1>Update Task Manager</h1>
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              placeholder="Title name"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="priority">Priority</label>
            <input
              type="text"
              value={priority}
              placeholder="Priority"
              onChange={(e) => setPriority(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="title">Mark as complited</label>
            <select value={mark} onChange={(e) => setMark(e.target.value)}>
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
              onChange={(e) => setDeadline(e.target.value)}
            ></input>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};
