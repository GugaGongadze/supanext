import Link from "next/link";

export async function getProducts() {
  const products = await fetch("https://dummyjson.com/products", {
    next: {
      revalidate: 0
    }
  });

  return products
}

export default async function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}

export const revalidate = 0; 
