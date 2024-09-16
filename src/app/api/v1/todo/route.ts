import { connectToDatabase } from "@/libs/mongodb";
import todo from "@/models/todo";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const todoResult = await Todo.find({});
    return NextResponse.json({ data: todoResult });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: err,
    });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  if(!data.name || !data.description || data.status == undefined || !data.duedate){
    return NextResponse.json({
      status: 402,
      message: "Missing fields"
    })
  }

  const newTodo = new todo(data);
  await newTodo.save();

  return NextResponse.json({
    status: 200,
    message: "Added Success"
  })
}