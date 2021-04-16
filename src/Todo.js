import { db } from "./firebase_config";
import styles from "./Todo.module.css";

const TodoListItem = ({ id, todo, isCompleted }) => {
  function toggleTaskStatus() {
    db.collection("todos").doc(id).update({
      isCompleted: !isCompleted,
    });
  }

  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }

  return (
    <li className={styles.listItem}>
      <div className={styles.todo}>
        {todo}
        <br></br>
        <small className={styles.taskStatus}>
          {isCompleted ? "Completed" : "In Progress"}
        </small>
      </div>
      <div>
        {isCompleted ? (
          <button className={styles.btn} onClick={toggleTaskStatus}>
            Mark as Incomplete
          </button>
        ) : (
          <button className={styles.btn} onClick={toggleTaskStatus}>
            Mark as completed
          </button>
        )}
        <button className={styles.btn} onClick={deleteTodo}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoListItem;
