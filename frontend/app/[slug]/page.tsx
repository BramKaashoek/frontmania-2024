// import { Img } from '@/components/Img';
// import { trace } from '@opentelemetry/api';

// type Fruit = {
//   name: string;
//   price: number;
//   imageUrl: string;
//   description: string;
// };

// export default async function PDP({
//   params: { slug },
// }: {
//   params: { slug: string };
// }) {
//   const fruit = await trace
//     .getTracer('nextjs-example')
//     .startActiveSpan(`fetch-fruit`, async (span) => {
//       span.setAttribute('fruit', slug);
//       const data = await fetch(`http://localhost:4000/fruit/${slug}`);
//       const fruit = await data.json();
//       span.end();
//       return fruit as Fruit;
//     });

//   return (
//     <>
//       <h1>{fruit.name}</h1>
//       <Img src={`/${fruit.imageUrl}`} alt={`picture of a ${fruit.name}`} />
//       <span>
//         {new Intl.NumberFormat('en-GB', {
//           style: 'currency',
//           currency: 'EUR',
//         }).format(fruit.price)}
//       </span>
//       <button>Buy now!</button>
//     </>
//   );
// }

import { ClsElement } from '@/components/cls-element';
import { DelayedRender } from '@/components/delayed-rendered';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { trace } from '@opentelemetry/api';
import { Apple, ArrowLeft, ShoppingCart, Star, Truck } from 'lucide-react';
import Link from 'next/link';

type Fruit = {
  name: string;
  price: string;
  imageUrl: string;
  icon: string;
  slug: string;
  description: string;
  blurb: string;
};

export default async function ProductPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const fruit = await trace
    .getTracer('nextjs-example')
    .startActiveSpan(`fetch-fruit`, async (span) => {
      span.setAttribute('fruit', slug);
      const data = await fetch(`http://localhost:4000/fruit/${slug}`, {
        cache: 'no-store',
      });
      const fruit = await data.json();
      span.end();
      return fruit as Fruit;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <Apple className="h-6 w-6 text-pink-500" />
            <span className="font-bold text-xl text-pink-500">Fruitle</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/fruits"
              className="text-gray-500 hover:text-pink-500 transition-colors"
            >
              Fruits
            </Link>
            <Link
              href="/about"
              className="text-gray-500 hover:text-pink-500 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-500 hover:text-pink-500 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search fruits..."
              className="hidden md:block w-[200px]"
            />
            <Button size="icon" variant="outline">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 bg-gray-50">
        <div className="container">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-pink-500 hover:text-pink-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Fruits</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardContent className="p-6">
                  <img
                    src={`http://localhost:4000/static/${fruit.imageUrl}`}
                    alt={fruit.name}
                    className="w-full h-auto rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{fruit.name}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(128 reviews)</span>
                </div>
                <p className="text-2xl font-bold text-pink-500 mb-4">
                  {fruit.price}
                </p>
                {slug === 'banana' ? <ClsElement /> : undefined}

                <DelayedRender>
                  <p className="text-gray-600 mb-6">{fruit.blurb}</p>
                </DelayedRender>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select quantity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
                    Add to Cart
                  </Button>
                </div>
                <Button variant="outline" className="w-full">
                  Add to Wishlist
                </Button>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="h-5 w-5" />
                  <span>Free shipping on orders over $50</span>
                </div>
              </div>
            </div>
          </div>

          {slug === 'banana' ? <ClsElement /> : undefined}
          <Tabs defaultValue="description" className="mt-12">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{fruit.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Variety: Honeycrisp</li>
                    <li>Origin: Specially selected orchards</li>
                    <li>Taste Profile: Sweet with a hint of tartness</li>
                    <li>Texture: Incredibly crisp and juicy</li>
                    <li>Size: Large (approx. 3 inches in diameter)</li>
                    <li>Best Used For: Fresh eating, baking, salads</li>
                    <li>Storage: Keep refrigerated for maximum freshness</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>
                    Read what our customers are saying about Premium Apple
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Alice W.',
                        rating: 5,
                        comment:
                          "Best apples I've ever tasted! Worth every penny.",
                      },
                      {
                        name: 'Bob M.',
                        rating: 4,
                        comment:
                          'Great taste, but a bit pricey. Still, quality fruit!',
                      },
                      {
                        name: 'Charlie D.',
                        rating: 5,
                        comment:
                          "These apples are life-changing. I'm never going back to regular apples.",
                      },
                    ].map((review, index) => (
                      <div
                        key={index}
                        className="border-b last:border-b-0 pb-4"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.name}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read More Reviews
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="w-full border-t bg-white">
        <div className="container flex flex-col items-center justify-between space-y-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <Apple className="h-6 w-6 text-pink-500" />
            <p className="text-center text-sm leading-loose md:text-left">
              © 2023 Fruitle Inc. All rights reserved. Enjoy responsibly.
            </p>
          </div>
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <Link
              href="/terms"
              className="text-gray-500 hover:text-pink-500 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-pink-500 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="text-gray-500 hover:text-pink-500 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
