import mongoose from "mongoose";

//เอามาจาก MongoDB ของตัวเอง
let cachedDb: mongoose.Connection | null = null;

export async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const opts = { dbName: "Todo-app"};
  const conn = await mongoose.connect(process.env.MONGODB_URI as string, opts);
  cachedDb = conn.connection;
  return cachedDb;
} 