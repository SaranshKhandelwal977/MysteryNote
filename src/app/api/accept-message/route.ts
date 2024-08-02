import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

//updating the status of isAcceptingMessage
export async function POST(req: Request){
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User
    if(!session || !session.user){
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }
    const userId = user._id;
    const {acceptMessages} = await req.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {isAcceptingMessage: acceptMessages}, {new: true});
        if (!updatedUser) {
            // User not found
            return Response.json(
                {
                    success: false,
                    message: 'Unable to find user to update message acceptance status',
                },
                { status: 404 }
            );
        }
      
          // Successfully updated message acceptance status
          return Response.json(
                {
                    success: true,
                    message: 'Message acceptance status updated successfully',
                    updatedUser,
                },
                { status: 200 }
        );
    } catch (error) {
        return Response.json(
            { success: false, message: 'Failed to update user status to accept messages' },
            { status: 500 }
        );
    }
}

//returning the founded user
export async function GET(req: Request){
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User
    if(!session || !session.user){
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }
    const userId = user._id;
    try {
        const foundUser = await UserModel.findById(userId);
        if(!foundUser){
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }
        return Response.json(
            {
              success: true,
              isAcceptingMessages: foundUser.isAcceptingMessage,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving message acceptance status:', error);
        return Response.json(
            { success: false, message: 'Error retrieving message acceptance status' },
            { status: 500 }
        );
    }
}