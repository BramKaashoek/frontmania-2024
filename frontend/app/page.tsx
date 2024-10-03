import { ClsNotification } from "@/components/ClsNotification";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { trace } from "@opentelemetry/api";
import {
  AlarmClock,
  Apple,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

type Fruit = {
  name: string;
  price: string;
  imageUrl: string;
  icon: string;
  slug: string;
};

export default async function Home() {
  const fruits: Fruit[] = await trace
    .getTracer("nextjs-example")
    .startActiveSpan("fetch-fruits", async (span: any) => {
      const data = await fetch("http://localhost:4000/fruit", {
        cache: "no-store",
      });
      const fruit = await data.json();
      span.end();
      return fruit;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <ClsNotification />

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

      <ClsNotification />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Badge className="px-3 py-1 text-sm bg-pink-100 text-pink-800">
                Redefining Fruit Shopping
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to Fruitle
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Experience fruit shopping like never before. Fresh, fun, and
                slightly ridiculous.
              </p>
              <div className="space-x-4">
                <Button
                  size="lg"
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                >
                  Shop Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-pink-500 border-pink-500"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-12">
              Our Exclusive Fruit Collection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {fruits.map((fruit) => (
                <div
                  key={fruit.name}
                  className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-white hover:shadow-md transition-shadow duration-300"
                >
                  <Icon
                    name={fruit.icon}
                    className="h-12 w-12 mb-2 text-pink-500"
                  />
                  <a href={`/${fruit.slug}`}>
                    <h3 className="text-lg font-semibold">{fruit.name}</h3>
                  </a>
                  <p className="text-sm text-gray-500">{fruit.price}</p>
                  <Badge className="bg-secondary text-secondary-foreground">
                    Limited Stock
                  </Badge>
                  <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-12">
              Why Choose Fruitle?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Trendy Fruits",
                  icon: Sparkles,
                  description: "Always in season, always in style",
                },
                {
                  title: "Quick Delivery",
                  icon: Zap,
                  description: "Fruits at the speed of light",
                },
                {
                  title: "Freshness Guarantee",
                  icon: TrendingUp,
                  description: "So fresh, they're practically time travelers",
                },
                {
                  title: "24/7 Support",
                  icon: AlarmClock,
                  description: "We're here for all your fruity needs",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <feature.icon className="h-8 w-8 text-pink-500 mb-2" />
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-500 text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">
              Join the Fruitle Family
            </h2>
            <p className="mx-auto max-w-[600px] text-pink-100 md:text-lg mb-8">
              Be the first to know about our new arrivals, special offers, and
              fruit-related humor.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                placeholder="Enter your email"
                className="w-full sm:w-auto bg-white text-gray-900 placeholder-gray-500"
              />
              <Button className="w-full sm:w-auto bg-white text-pink-500 hover:bg-pink-100">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
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
