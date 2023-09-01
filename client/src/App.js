import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { ToastContainer } from "react-toastify";
import Auth from "./components/Auth";

function App() {
  const [tasks, setTasks] = useState([]);

  const authToken = false;

  const getData = async () => {
    try {
      const user_id = "1";
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/todos/users/${user_id}`
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
      {authToken ? (
        <>
          <ListHeader listName="Holiday tick list" getData={getData} />
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
