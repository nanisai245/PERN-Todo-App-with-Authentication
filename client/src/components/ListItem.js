import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteTodo = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        getData();
        toast.success("Todo deleted");
      } else toast.error("Failed to delete todo");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        {/* <ProgressBar /> */}
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteTodo}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </div>
  );
};

export default ListItem;
