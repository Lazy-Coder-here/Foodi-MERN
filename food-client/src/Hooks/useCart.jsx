import { useAuth } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { BaseURL } from "../Config/config";

const useCart = () => {
  const { user } = useAuth();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(`${BaseURL}/carts?email=${user?.email}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });
  return [cart, refetch];
};

export default useCart;
