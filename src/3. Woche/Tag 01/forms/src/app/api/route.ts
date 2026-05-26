import { insertContact } from "@/data/insertContact";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json()
    const result = await insertContact(data)

    if (result.ok) {
        return Response.json({}, { status: 201 })// 201 Created
    }

    return Response.json({}, { status: 501}) // 500 Internal Server Error
}