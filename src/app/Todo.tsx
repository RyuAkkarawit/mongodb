import React from 'react'

export interface ITodo {
    name: string;
    description: string;
    status: boolean;
    duedate: string;
}

export default function Todo({ todo, todoIndex, donHandler, toggleStatusHandler }: { todo: ITodo, todoIndex: number, donHandler: (todoIndex: number) => void, toggleStatusHandler: (todoIndex: number) => void }) {
    
    const timeConvert = (time: string) => {
        const date = new Date(time);
        return date.toLocaleString();
    }

    return (
        <div className='grid grid-cols-7 hover:bg-slate-200 p-2 items-center rounded-xl text-center'>
            <div className='col-span-1'>
                {todo.name}
            </div>
            <div className='col-span-2'>
                {todo.description}
            </div>
            <div className='col-span-1'>
                {todo.status ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}
            </div>
            <div className='col-span-2'>
                {timeConvert(todo.duedate)}
            </div>
            <div className='col-span-1 flex flex-col gap-2'>
                {/* ปุ่มเปลี่ยนสถานะ */}
                <button 
                    className={`${
                        todo.status ? 'bg-green-500' : 'bg-yellow-500'
                    } text-white rounded-lg p-2 w-full`}
                    onClick={() => { toggleStatusHandler(todoIndex); }}
                >
                    {todo.status ? 'ไม่สำเร็จ' : 'สำเร็จ'}
                </button>
                {/* ปุ่มลบ */}
                <button 
                    className="bg-red-500 text-white rounded-lg p-2 w-full"
                    onClick={() => { donHandler(todoIndex); }}
                >
                    ลบ
                </button>
            </div>
        </div>
    )
}
