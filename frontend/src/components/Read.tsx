import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

//type for data
interface DataItem {
  id: number;
  title: string;
  description: string;
  priority: string;
  mark: string;
  deadline: string;
}

export const Read = () => {
  const [apiData, setApiData] = useState<DataItem[]>([]);

  const API = import.meta.env.VITE_API_URL;

 const navigate = useNavigate();

  function getData() {
    axios
      .get(API)

      .then((res) => {
        setApiData(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }
  function handleDelete(id: number | string) {
    axios
      .delete(`${API}/${id}`)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  function setDataToStorage(
    id: number | string,
    title: string,
    description: string,
    priority: string,
    mark: string,
    deadline: string,
  ) {
    localStorage.setItem("id", id.toString());
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("priority", priority);
    localStorage.setItem("mark", mark);
    localStorage.setItem("deadline", deadline);
  }

  return (
    <>
      <div>
        <h1>Crud Read</h1>
      </div>
      <Link to="/create">
        <button>Create</button>
      </Link>
        <div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>DESCRIPTION</th>
                  <th>PRIORITY</th>
                  <th>MARK</th>
                  <th>DEADLINE</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {apiData.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.title}</td>
                      <td>{data.description}</td>
                      <td>{data.priority}</td>
                      <td>{data.mark}</td>
                      <td>{data.deadline}</td>
                      <td>
                        <Link to="/Edit">
                          <button
                            onClick={() => {
                              setDataToStorage(
                                data.id,
                                data.title,
                                data.description,
                                data.priority,
                                data.mark,
                                data.deadline,
                              );
                            }}
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            if (
                              window.confirm("Are you sure to delete data??")
                            ) {
                              handleDelete(data.id);
                              navigate("/");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      
    </>
  );
};
