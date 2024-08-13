'use client'
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
const indexingAPI=async()=>{
  const res = await fetch('/api/update', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword:'コスメ'
      }),
  })
  if (res.ok) {
    console.log("updateAPI: ok")
  }else {
    const resError = await res.json();
    console.log(resError)
  }
}

export default function Indexing() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Update API</CardTitle>
          <CardDescription>
            アップデートコントローラ
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={indexingAPI} className="w-full">楽天・Amazon API</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
