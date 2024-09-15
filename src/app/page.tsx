'use client';
import { useEffect, useState } from "react";
import Todo, { ITodo } from "./Todo";

export default function Home() {
  const [currentTodo, setCurrentTodo] = useState<ITodo>({
    name: '',
    description: '',
    status: false,
    duedate: ''
  });
  const [todos, setTodos] = useState<ITodo[]>([]);
  useEffect(() => {

  }, []);

  function AddHandler() {
    const todo = {
      ...currentTodo,
      status: false
    }
    setTodos([...todos, todo]);

    // Clear form
    setCurrentTodo({
      name: '',
      description: '',
      status: false,
      duedate: ''
    });
  }
  function DoneHandler(index: number) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  return (
    <>
      <div className="flex justify-center my-5 ;">
        <div className="container border border-gray-500 p-8 rounded-lg bg-yellow-200 ">
          <p className="text-xl font-bold text-center  text-blue-600 ">Todo App</p>
          <div className="flex justify-end">
            <div className="grid gap-y-2.5">
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-1" >
                <label className="content-center text-end sm:col-span-1 lg:col-span-1 px-2">ชื่อเรื่อง: </label>
                <input type="text" id="name" className="border border-gray-400 rounded-lg p-2 sm:col-span-1 lg:col-span-2" onChange={(event) => {
                  setCurrentTodo({
                    ...currentTodo,
                    name: event.target.value
                  });
                }} value={currentTodo.name} />
              </div>
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-1">
                <label className="content-center text-end sm:col-span-1 lg:col-span-1 px-2">รายละเอียด: </label>
                <input type="text" id="description" className="border border-gray-400 rounded-lg p-2 sm:col-span-1 lg:col-span-2" onChange={(event) => {
                  setCurrentTodo({
                    ...currentTodo,
                    description: event.target.value
                  });
                }} value={currentTodo.description} />
              </div>
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-1">
                <label className="content-center text-end sm:col-span-1 lg:col-span-1 px-2">วันครบกำหนด: </label>
                <input type="datetime-local" id="date" className="border border-gray-400 rounded-lg p-2 sm:col-span-1 lg:col-span-2 text-center" onChange={(event) => {
                  setCurrentTodo({
                    ...currentTodo,
                    duedate: event.target.value
                  });
                }} value={currentTodo.duedate} />
              </div>
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-x-1">
                <button className="bg-blue-500 text-white rounded-lg p-2 w-full sm:col-span-1 lg:col-span-3" onClick={AddHandler}>เพิ่ม</button>
              </div>
            </div>
          </div>
          <hr className="m-6" />
          <div className="grid gap-y-4">
            {todos.map((todo, index) => {
              return <Todo key={index} todo={todo} todoIndex={index} donHandler={DoneHandler} />
            })}
          </div>
        </div>
      </div>
    </>
  );
}
