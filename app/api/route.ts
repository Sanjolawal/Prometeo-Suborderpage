import dbConnect from "@/lib/dbconnect";
import { User } from "@/models/data";
export async function GET() {
  try {
    await dbConnect();
    const response = await User.find({});
    return Response.json(response);
  } catch (error) {
    return Response.json(error);
  }
}
