import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const getData = async () => {
    try {
      const user_id = "1";
      const response = await fetch(
        `http://localhost:8000/todos/users/${user_id}`
      );
      const res = await response.json();

      setTasks(res.data.todos);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <div className="app">
      <ListHeader listName="This is List Header" />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default App;
