import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector((state) => state.cart.totalQuantity);

  return (
    <header className="sticky top-0 z-50 w-full p-5 bg-white flex justify-center">
      {/* Top nav */}
      <div className="w-full sm:w-11/12 flex items-center justify-between">
        <Logo />

        {/* Right */}
        <div className="flex items-center space-x-6 whitespace-nowrap text-base md:text-xl">
          <div
            onClick={!session ? signIn : signOut}
            className="hover:text-primary cursor-pointer"
          >
            <p className="font-medium">
              {session ? `Hello, ${session.user.name}` : "Sign In"}
            </p>
          </div>
          <div
            className="hover:text-primary cursor-pointer"
            onClick={() => router.push("/orders")}
          >
            <p className="font-medium">Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="relative hover:text-primary cursor-pointer flex items-center"
          >
            <span className="text-sm absolute top-0 right-0 md:right-10 h-[18px] w-[18px] bg-secondary flex items-center justify-center rounded-full text-black font-bold">
              <span>{items}</span>
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
