import React, { useState } from "react";
import { toast } from "react-toastify";

import Input from "./Input";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      toast.error("Please add a task");
      return;
    }

    onAdd({ text, day, reminder });

    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <Input
        type="text"
        name="text"
        label="Task"
        placeholder="Add Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Input
        type="text"
        name="day"
        label="Day & Time"
        placeholder="Add Day & Time"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      />

      <Input
        type="checkbox"
        name="reminder"
        label="Set Reminder"
        checkClass="form-control-check"
        checked={reminder}
        value={reminder}
        onChange={(e) => setReminder(e.currentTarget.checked)}
      />

      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
