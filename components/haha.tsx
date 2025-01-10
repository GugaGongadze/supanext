import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

export const CreateProduct = () => {
  const createProduct = async (formData: FormData) => {
    "use server";

    const supabase = await createClient();
    const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;

    // // Create a Stripe product
    const stripeProduct = await stripeClient.products.create({
      name,
    });

    const stripePrice = await stripeClient.prices.create({
      unit_amount: Number(price),
      currency: "usd",
      product: stripeProduct.id,
    });

    console.log(stripeProduct, stripePrice);

    const user = await supabase.auth.getUser();

    // // Once product & price are created on Stripe, save to Supabase
    const {
      data: supabaseProduct,
      error,
      status,
    } = await supabase
      .from("products")
      .insert({
        name,
        user_id: user.data.user?.id,
        price: Number(price),
        stripe_product_id: stripeProduct.id,
        stripe_price_id: stripePrice.id,
      })
      .single();

    console.log(error, supabaseProduct, status);
  };

  return (
    <form action={createProduct} className="flex flex-col gap-4 border p-4 rounded-md">
      <input type="text" name="name" id="name" placeholder="Name" />
      <input type="number" name="price" id="price" placeholder="Price" />
      <button className="rounded-md bg-black text-white">Create Product</button>
    </form>
  );
};
