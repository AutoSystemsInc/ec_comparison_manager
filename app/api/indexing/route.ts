import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const getData=async(keyword:string)=> {
  //console.log(keyword)
  const res = await fetch(`https://jcxcmpwqxg.execute-api.ap-northeast-1.amazonaws.com/webhook/?keyword=${keyword}&shop%5B%5D=rakuten&shop%5B%5D=amazon&order=relevanceblender`)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // エラーオブジェクトに追加情報を付与します。
    //error.info = await res.json()
    //error.status = res.status
    throw error
    //throw new Error('Failed to fetch data')
    //console.log('getData: Failed to fetch data')
  }
  const res_json=await res.json()
  //console.log({res_json})
  return res_json
}

export async function GET() {
  return Response.json({
    message: 'Uncomment to seed data after DB is set up.'
  });

}

export async function POST(req: NextRequest) {
    const { keyword } = await req.json()
    const data=await getData(keyword)
    //console.log({data})
    const products=data.map((item:any)=>({
      url:item.url,
      name:item.title,
      image:item.image,
      description:item.title,
      price: parseFloat(item.price),
      priceCurrency:'JPY',
      availability:'https://schema.org/InStock',
      //tags:[{name:keyword}],
      //shops:[{name:item.shop}],
    }))
    console.log(products)

    try {
      await prisma.product.createMany({
        data: products,
      })
    } catch {
      return new NextResponse(
        JSON.stringify({ errors: "product create error" }),
        { status: 400 }
      );
    }
    return new NextResponse(JSON.stringify({ message: "Success" }), {
      status: 201,
    });
}
