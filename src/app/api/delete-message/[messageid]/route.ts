import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

//displaying messages
export async function DELETE(req: Request, {params}: {params: {messageid: string}}){
    const messageId = params.messageid;
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User
    if(!session || !session.user){
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }
    try {
        const updateResult = await UserModel.updateOne({_id: user._id}, {$pull: {messages: {_id: messageId}}});
        if (updateResult.modifiedCount === 0) {
            return Response.json(
                { message: 'Message not found or already deleted', success: false },
                { status: 404 }
            );
        }
      
        return Response.json(
            { message: 'Message deleted', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting message:', error);
        return Response.json(
            { message: 'Error deleting message', success: false },
            { status: 500 }
        );
    }

}