import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [completedVisual, setCompletedVisual] = useState([]);
  const [task, setTask] = useState("");
  const [editingTaskModal, setEditingTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("todo")) || [];
    setTodo(savedTasks);
    setCompletedVisual(savedTasks.filter(task => task.completed));
  }, []);

  const saveToLocalStorage = (tasks) => {
    localStorage.setItem("todo", JSON.stringify(tasks));
  };

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleClick = () => {
    const newTasks = [...todo, { text: task, completed: false }];
    setTodo(newTasks);
    setCompletedVisual([...completedVisual, { text: task, completed: false }]);
    saveToLocalStorage(newTasks);
    setTask("");
  };

  const deleteAll = () => {
    setTodo([]);
    setCompletedVisual([]);
    saveToLocalStorage([]);
  };

  const deleteItem = (index) => {
    const newTodo = [...todo];
    const newCompletedVisual = [...completedVisual];
    const [removedTask] = newTodo.splice(index, 1);
    setTodo(newTodo);
    if (removedTask.completed) {
      setCompletedVisual(newCompletedVisual.filter(task => task.text !== removedTask.text));
    }
    saveToLocalStorage(newTodo);
  };

  const success = (index) => {
    let newTodo = [...todo];
    newTodo[index] = { ...newTodo[index], completed: true };
    setTodo(newTodo);
    setCompletedVisual([...completedVisual, newTodo[index]]);
    saveToLocalStorage(newTodo);
  };

  const openEdit = (index) => {
    setEditingTaskModal(true);
    setEditingTask(todo[index].text);
    setEditingTaskIndex(index);
  };

  const saveEdit = () => {
    const newTodo = [...todo];
    newTodo[editingTaskIndex] = { ...newTodo[editingTaskIndex], text: editingTask };
    setTodo(newTodo);
    setCompletedVisual([...completedVisual, newTodo[editingTaskIndex]]);
    saveToLocalStorage(newTodo);
    setEditingTaskModal(false);
    setEditingTaskIndex(null);
  };

  const handleEditChange = (event) => {
    setEditingTask(event.target.value);
  };

  const cancelEdit = () => {
    setEditingTaskModal(false);
    setEditingTask("");
  };

  return (
    <div className="App">
      <form className="form">
        <h1>Tarefas</h1>
        <input
          className="input-title"
          type="text"
          placeholder="digite sua tarefa"
          value={task}
          onChange={handleChange}
        />
        <button className="btn-add" type="button" onClick={handleClick}>
          Adicionar 
        </button>
        <button className="btn-deletar" type="button" onClick={deleteAll}>
          Remover Todos
        </button>
      </form>

      <ul className="container-items">
        {todo.map((tarefa, index) => (
          <div key={index}>
            <li className="listItem">
              <div className="taskItem">
                {tarefa.completed ? (
                  <span style={{ textDecoration: "line-through", color: "red" }}>
                    {tarefa.text}
                  </span>
                ) : (
                  tarefa.text
                )}
              </div>
              <button
                className="btn-delete"
                type="button"
                onClick={() => deleteItem(index)}
              >
                Remover
              </button>
              <button
                className="btn-edit"
                type="button"
                onClick={() => openEdit(index)}
              >
                Editar
              </button>
              <button
                className="btn-sucess"
                type="button"
                onClick={() => success(index)}
              >
                Concluido
              </button>
            </li>
          </div>
        ))}
      </ul>
      {editingTaskModal && (
        <>
          <div className="backdrop" />
          <div className="modal-edit">
            <input
              className="input-edit"
              type="text"
              value={editingTask}
              onChange={handleEditChange}
            />
            <button className="btn-save" onClick={saveEdit} type="button">
              Salvar
            </button>
            <button className="btn-save" onClick={cancelEdit} type="button">
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
