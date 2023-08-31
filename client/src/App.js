import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
      <ListHeader listName="Holiday tick list" getData={getData} />
      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />
      ))}
    </div>
  );
}

export default App;
