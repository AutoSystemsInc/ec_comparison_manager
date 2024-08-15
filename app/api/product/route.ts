import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const headers={    // レスポンスヘッダー
      "Access-Control-Allow-Credentials":"false",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  const params = request.nextUrl.searchParams;
  const id = params.get("id");

  if (!id) { // Check if id is null
    return NextResponse.json(
      { error: "ID is required" },
      { 
        status: 400,
        headers: headers,
      },
    );
  }
  
  try{
    const item = await prisma.product.findUnique({
      where: { 
        id: id,
      },
    });
    console.log({item})
    return NextResponse.json(
      item, 
      {
        status: 201,
        headers:headers,
      }
    )
  }
  catch {
    return NextResponse.json(
      { error: "get item id error" },
      { 
        status: 400,
        headers:headers,
      },
    )
  }
}
