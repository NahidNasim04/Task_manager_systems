import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { TypographyH2 } from "./ui/TypographyH2";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export const Create = () => {
  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [priority, SetPriority] = useState("");
  const [mark, SetMark] = useState("");
  const [deadline, SetDeadline] = useState<Date | undefined>();


  const navigate = useNavigate();

const API = import.meta.env.VITE_API_URL;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(API, {
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
      <div className="text-center">
        <TypographyH2>Create Task Manager</TypographyH2>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-muted/40 p-2">
      <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold">
              Create Task
            </CardTitle>
          </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              value={title}
              placeholder="Title name"
              onChange={(e) => SetTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              value={description}
              placeholder="Description"
              onChange={(e) => SetDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Input
              type="text"
              value={priority}
              placeholder="Priority"
              onChange={(e) => SetPriority(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="mark">Mark as Project</Label>
                <Select value={mark} onValueChange={(value) => SetMark(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="on going">On Going</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left"
                    >
                      {deadline ? format(deadline, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={SetDeadline}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <CardFooter className="flex flex-col gap-2">
                {/* <Button type="submit" className="w-full">
                Submit
              </Button>

              <Button variant="outline" className="w-full">
                <Link to={"/"}>Go to Read Sections</Link>
              </Button> */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="w-full">Submit</Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to submit this data?
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction
                        onClick={(e) => {
                          handleSubmit(e as unknown as React.FormEvent);
                        }}
                      >
                        Yes, Submit
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="outline" className="w-full">
                  <Link to={"/"}>Go to Read Sections</Link>
                </Button>
              </CardFooter>
          </CardContent>
        </form>
        </Card>
      </div>
    </>
  );
};
