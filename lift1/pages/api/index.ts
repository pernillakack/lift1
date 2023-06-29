import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "@/utils/db"
import {Workout} from "@/Types/workout"

export default async function handler(
req: NextApiRequest,
res: NextApiResponse<Workout | Workout[] | string>
) {
try {
 const db = await connectToDatabase()
 switch (req.method) {
 case "GET": {
 // Get all users from the database
 const db = await connectToDatabase()
 const workouts = await db.collection("workout").find().toArray()
 const convertedWorkouts: Workout[] = workouts.map((workoutDoc) => {
 return {
 name: workoutDoc.name as string,
 email: workoutDoc.email as string,
 age: workoutDoc.age as number,
 }
 })
 if (convertedWorkouts.length === 0) {
 console.log("PRETTY EMPTY DUDE")
 res.status(200).json("EMPTY")
 } else {
 res.status(200).json(convertedWorkouts)
 }
 break
 }
 default: {
 // Return a 405 Method Not Allowed error for all other HTTP methods
 res.setHeader("Allow", ["GET", "POST"])
 res.status(405).end(`Method ${req.method} Not Allowed`)
 break
 }
 }
 } catch (error) {
 throw new Error("Something went wrong " + error)
 }
}