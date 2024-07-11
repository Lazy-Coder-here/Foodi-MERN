import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BaseURL } from "../Config/config";
import axios from "axios";

const useMenu = () => {
  const {
    data: menu = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axios.get(`${BaseURL}/menu`);
      // console.log(res.data);
      return res.data;
    },
  });
  return [menu, loading, refetch];
};

export default useMenu;
