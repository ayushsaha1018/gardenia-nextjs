import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const products = [
  {
    id: 1,
    name: "Zip Tote Basket",
    description: "White and black",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: 140,
  },
  {
    id: 2,
    name: "Mens Casual Premium Slim Fit T-Shirts ",
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    href: "#",
    imageSrc:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    imageAlt: "dummy",
    price: 150,
  },
  {
    id: 3,
    name: "Mens Cotton Jacket",
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    href: "#",
    imageSrc: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    imageAlt: "dummy",
    price: 55.99,
  },
  // More products...
];

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Gardenia</title>
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

  return {
    props: {
      session,
    },
  };
}
