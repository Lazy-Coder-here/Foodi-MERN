import { useAuth } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { BaseURL } from "../Config/config";

const useCart = () => {
  const { user, userLoggedIn } = useAuth();
  const token = localStorage.getItem("access-token");

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(`${BaseURL}/carts?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });
  return [cart, refetch];
};

export default useCart;
