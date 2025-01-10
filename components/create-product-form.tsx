import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

export function CreateProductForm() {
  async function createProduct(formData: FormData) {
    "use server";

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const supabase = await createClient();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));

    // 1. Create product in Stripe
    const stripeProduct = await stripe.products.create({
      name,
    });

    // 2. Create price in Stripe
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: price,
      currency: "usd",
    });

    const userResponse = await supabase.auth.getUser();

    const userId = userResponse.data.user?.id;

    // 3. Create product in supabase
    await supabase
      .from("products")
      .insert({
        name,
        price,
        user_id: userId,
        stripe_product_id: stripeProduct.id,
        stripe_price_id: stripePrice.id,
      })
      .single();
  }

  return (
    <form
      action={createProduct}
      className="rounded-lg p-4 bg-gray-100 flex flex-col gap-4"
    >
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" />
      <button type="submit" className="bg-black text-white">
        Create
      </button>
    </form>
  );
}
