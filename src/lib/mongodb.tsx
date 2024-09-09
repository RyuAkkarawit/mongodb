import mongoose from "mongoose";

//เอามาจาก MongoDB ของตัวเอง
const uri = "mongodb+srv://akkarawitp:<db_password>@cluster0.rqmqx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let cachedDb: mongoose.Connection | null = null;

export async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const opts = { dbName: "Todo-app"};
  const conn = await mongoose.connect(uri, opts);
  cachedDb = conn.connection;
  return cachedDb;
} 