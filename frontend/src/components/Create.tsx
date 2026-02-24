import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { TypographyH2 } from "./ui/TypographyH2";

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
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [mark, setMark] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(API, {
        title,
        description,
        priority,
        mark,
        date: date?.toISOString(),
      })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="text-center">
        <TypographyH2>Create Task Manager</TypographyH2>
      </div>

      <div className="flex items-center justify-center min-h-screen bg-muted/40 p-2">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">
              Create Task
            </CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-3">

              <div>
                <Label>Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <Label>Priority</Label>
                <Input
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
              </div>

              <div>
                <Label>Status</Label>
                <Select value={mark} onValueChange={setMark}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="completed">
                        Completed
                      </SelectItem>
                      <SelectItem value="pending">
                        Pending
                      </SelectItem>
                      <SelectItem value="ongoing">
                        On Going
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => setDate(d)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Submit
              </Button>

              <Button variant="outline" className="w-full">
                <Link to="/">Go Back</Link>
              </Button>
            </CardFooter>

          </form>
        </Card>
      </div>
    </>
  );
};