import { CreateProductForm } from "@/components/create-product-form";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const products = await supabase.from("products").select("*");
  console.log("products:", products);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div>
          {products.data?.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-4 border rounded"
            >
              <div>
                <h3 className="font-bold">{product.name}</h3>
                <p>{product.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{product.price} USD</span>
                <InfoIcon className="text-gray-500" />
              </div>
            </div>
          ))}
        </div>
        <CreateProductForm />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
