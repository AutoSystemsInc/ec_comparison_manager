'use client'
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useState } from 'react';

const indexingAPI=async(keyword: string)=>{
  const res = await fetch('/api/indexing', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword:keyword
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
  const [keyword, setKeyword] = useState('');
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
          <div className="w-full mb-4 p-2 border">
        <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
          />
          </div>
          <div className="w-full">
          <Button onClick={()=> indexingAPI(keyword)} className="w-full">楽天・Amazon API</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
