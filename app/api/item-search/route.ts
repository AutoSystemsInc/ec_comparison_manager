import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const headers={    // レスポンスヘッダー
      "Access-Control-Allow-Credentials":"false",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  try{
    const item_list = await prisma.product.findMany({
      where: { 
        //userId: session?.user?.id,
        tags: {some:{name:'コスメ'}},
      },
    });
    console.log({item_list})
    return NextResponse.json(
      item_list, 
      {
        status: 201,
        headers:headers,
      }
    )
  }
  catch {
    return NextResponse.json(
      { error: "item search error" },
      { 
        status: 400,
        headers:headers,
      },
    )
  }
}
