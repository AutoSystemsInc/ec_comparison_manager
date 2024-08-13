import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {

  try{
    const item_list = await prisma.product.findMany({
      where: { 
        //userId: session?.user?.id,
        tags: {some:{name:'コスメ'}},
      },
    });
    console.log({item_list})
    return new NextResponse(JSON.stringify(item_list), {
      status: 201,
    })
  }
  catch {
    return new NextResponse(
      JSON.stringify({ errors: "item search error" }),
      { status: 400 }
    );
}
}
