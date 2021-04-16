import { useState, useEffect } from "react";
import firebase from "firebase";
import { db } from "./firebase_config";
import styles from "./App.module.css";
import TodoListItem from "./Todo";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    db.collection("todos").onSnapshot((querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          isCompleted: doc.data().isCompleted,
          time: doc.data().time,
        }))
      );
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    db.collection("todos").add({
      todo: todoInput,
      isCompleted: false,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodoInput("");
  }

  return (
    <div className={styles.App}>
      <h1 className={styles.header}>Todo App</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          className={styles.todoInput}
          type="text"
          placeholder="What's your plan for the day?"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <input className={styles.btn} type="submit" />
      </form>
      <div>
        <ul className={styles.todoList}>
          {todos.map((todo) => {
            return <TodoListItem key={todo.id} {...todo} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
