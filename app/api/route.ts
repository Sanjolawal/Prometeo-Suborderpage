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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.get("files");
    const data: any = formData.get("data");
    const data_recieved = JSON.parse(data);
    console.log(data_recieved);
    return Response.json({ testing: `testing` });
  } catch (error) {
    return Response.json(error);
  }
}
