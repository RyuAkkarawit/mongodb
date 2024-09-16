import { connectToDatabase } from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

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

/*
export async function POST(req: NextRequest){
  try{
  const body = await req.json();
  const res = await Todo.create(body);
  return NextResponse.json({ data: res });
  }catch(error){
    return NextResponse.json({
      error: error,
    });
  }
 }
//Update
export async function PUT(){}
//Delete
export async function DELETE(){}
*/