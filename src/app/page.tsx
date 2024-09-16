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
    // คำสั่งที่อาจต้องการใส่ใน future
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

    fetch('/api/v1/todo', {
      method: 'POST',
      body: JSON.stringify({
        name: currentTodo.name,
        description: currentTodo.description,
        status: currentTodo.status,
        duedate: currentTodo.duedate
      })
    }).then(res=>res.json()).then(data=>{
      console.log(data)
    }).catch(err=>{
      console.log(err);
    })
  }

  function DoneHandler(index: number) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function toggleStatusHandler(index: number) {
    const newTodos = [...todos];
    newTodos[index].status = !newTodos[index].status; // เปลี่ยนสถานะของ todo
    setTodos(newTodos);
  }

  return (
    <>
      <div className="flex justify-center my-5">
        <div className="container border border-gray-200 p-8 rounded-lg bg-white shadow-lg">
          <p className="text-2xl font-semibold text-center text-gray-800 mb-6">Todo App</p>
          
          <div className="grid gap-y-4">
            {/* ชื่อเรื่อง */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 items-center">
              <label htmlFor="name" className="text-gray-700 text-right pr-4 sm:col-span-1">ชื่อเรื่อง:</label>
              <input 
                type="text" 
                id="name" 
                className="border border-gray-300 rounded-lg p-2 sm:col-span-1" 
                placeholder="เพิ่มชื่อเรื่อง"
                onChange={(event) => setCurrentTodo({ ...currentTodo, name: event.target.value })}
                value={currentTodo.name}
              />
            </div>

            {/* รายละเอียด */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 items-center">
              <label htmlFor="description" className="text-gray-700 text-right pr-4 sm:col-span-1">รายละเอียด:</label>
              <input 
                type="text" 
                id="description" 
                className="border border-gray-300 rounded-lg p-2 sm:col-span-1" 
                placeholder="เพิ่มรายละเอียด"
                onChange={(event) => setCurrentTodo({ ...currentTodo, description: event.target.value })}
                value={currentTodo.description}
              />
            </div>

            {/* วันครบกำหนด */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 items-center">
              <label htmlFor="duedate" className="text-gray-700 text-right pr-4 sm:col-span-1">วันครบกำหนด:</label>
              <input 
                type="datetime-local" 
                id="duedate" 
                className="border border-gray-300 rounded-lg p-2 sm:col-span-1 text-center" 
                onChange={(event) => setCurrentTodo({ ...currentTodo, duedate: event.target.value })}
                value={currentTodo.duedate}
              />
            </div>

            {/* ปุ่มเพิ่ม */}
            <div className="flex justify-center">
              <button 
                className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 w-full sm:w-auto sm:col-span-3" 
                onClick={AddHandler}
              >
                เพิ่ม
              </button>
            </div>
          </div>

          <hr className="my-6" />

          {/* แสดง Todo */}
          <div className="grid gap-y-4">
            {todos.map((todo, index) => (
              <Todo 
                key={index} 
                todo={todo} 
                todoIndex={index} 
                donHandler={DoneHandler} 
                toggleStatusHandler={toggleStatusHandler} // ส่งฟังก์ชันเปลี่ยนสถานะไปยัง Todo component
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
