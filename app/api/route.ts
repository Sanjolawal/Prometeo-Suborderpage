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
    const data_recieved: any = formData.get("data");
    const data = JSON.parse(data_recieved);
    const user = await User.find({}).lean();

    const test = await User.findOneAndUpdate(
      {
        company_name: "Example ",
        "sub_orders.warehouse_name": `${data.warehouse}`,
      },
      {
        $set: {
          "sub_orders.$.date_to_storage": `${data.arrival_time}`,
          "sub_orders.$.date_to_come_order": `${data.arrival_date}`,
          "sub_orders.$.document_number": `${data.document_number}`,
          "sub_orders.$.document_type": `${data.document_type}`,
          "sub_orders.$.description": `${data.description}`,
        },
      },
      { new: true }
    ).lean();
    console.log(test);
    return Response.json({ msg: `Success` });
  } catch (error) {
    return Response.json(error);
  }
}
