"use client";

import { useEffect, useState } from "react";

interface IProduct {
  product_id: number;
}

export default function Home() {
  const [newProduct, setNewProduct] = useState<IProduct>();
  const [quantityProduct, setQuantityProduct] = useState(0);

  useEffect(() => {
    const uuid = crypto.randomUUID();
    const token = 123456;
    const socketPath = `ws://localhost:8080?token=${token}&uuid=${uuid}`;
    const socket = new WebSocket(socketPath);

    socket.addEventListener("open", () => {
      console.log("cliente conectado");

      socket.addEventListener("message", (msg) => {
        const { data } = msg;

        if (data) {
          setNewProduct(JSON.parse(data));
          setQuantityProduct((prev) => prev + 1);
        }
      });
    });
  }, []);

  useEffect(() => {
    document.title = `${quantityProduct} new(s) product(s)`;
  }, [quantityProduct]);
  
  return (
    <>
      <div className="flex flex-col items-center p-7 rounded-2xl gap-[16]">
        <h1 className="text-2xl font-medium">Hello, welcome to the consumer</h1>
        <div className="flex flex-col items-center gap-[8]">
          <h2>New product received</h2>
          <div className="bg-gray-900 text-white font-mono p-4 rounded-lg text-sm">
            <pre>
              <code>{JSON.stringify(newProduct)}</code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
