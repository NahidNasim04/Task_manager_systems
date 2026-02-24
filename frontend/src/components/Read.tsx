import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TypographyH2 } from "./ui/TypographyH2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

//Here added .Env files

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

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const API = import.meta.env.VITE_API_URL;

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

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const filteredData =
    searchTerm.trim() === ""
      ? apiData
      : apiData.filter(
          (item) => item.mark?.toLowerCase() === searchTerm.toLowerCase(),
        );

  return (
    <>
      <div className="text-center">
        <TypographyH2>Read Task Manager</TypographyH2>
      </div>
      <div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8"
                type="text"
                placeholder="Search by Mark as 'completed'..."
                value={searchInput}
                required
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <Button onClick={handleSearch}>Search</Button>
          </div>
          <Link to="/create">
            <Button>Create</Button>
          </Link>
        </div>
        <br />
        <Table>
          <TableCaption>A list of your recent added data.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Mark as Completed</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>{data.priority}</TableCell>
                <TableCell>{data.mark}</TableCell>
                <TableCell>{data.deadline}</TableCell>

                <TableCell>
                  <Link to="/edit">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                      onClick={() =>
                        setDataToStorage(
                          data.id,
                          data.title,
                          data.description,
                          data.priority,
                          data.mark,
                          data.deadline,
                        )
                      }
                    >
                      Edit
                    </button>
                  </Link>
                </TableCell>

                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="px-3 py-1 bg-red-600 text-white rounded">
                        Delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.This will permanently
                          delete this record.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(data.id)}
                        >
                          Yes, Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
