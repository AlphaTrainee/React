{
  let discount = 0.1;
  discount = "10%";
}

{
  let a: Date;
  a = new Date();

  let b = new Date();

  let c: Date = "2022-01-01";
}

{
  const dates: Date[] = [];
  dates.push(new Date());
  dates.push("tomorrow");
}

{
  type Product = { name: string; unitPrice?: number };
  const p: Product = { name: "Table" };
  const total = p.unitPrice * 2;
}

{
  type RGB = "red" | "green" | "blue" | null;

  let color: RGB = "red";
  color = null;
  color = "yellow";
}

{
  type Product = { name: string; unitPrice?: number };
  type DiscountedProduct = Product & { discount: number };

  const x: DiscountedProduct = { name: "Chair", discount: 5 };
  const y: DiscountedProduct = { discount: 5 };
}

{
  // - Definiere einen Function Type `Purchase`, der `quantity: number` nimmt und nichts zurückgibt.
  // - Nutze ihn dann in einem `Product`-Typ.

  type Purchase = (quantity: number) => void;

  type Product = {
    name: string;
    price: number;
    onPurchase: Purchase;
  };
}
