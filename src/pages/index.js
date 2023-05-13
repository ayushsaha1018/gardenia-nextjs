import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const products = [
  {
    id: 1,
    name: 'Zip Tote Basket',
    description: 'White and black',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: 140,
  },
  // More products...
]

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main>
        {/* Banner  */}
        <Banner />
        {/* Product Feed */}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  // const products = await fetch("https://fakestoreapi.com/products").then(
  //   (res) => res.json()
  // );

  return {
    props: {
      // products,
      session
    },
  };
}
