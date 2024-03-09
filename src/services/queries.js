import { useQuery } from "@tanstack/react-query";
import { getDashboardData, getItemById, getItems } from "./api";

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: getItems,
  });
}

export function useItemById(id) {
  return useQuery({
    queryKey: ["item", { id }],
    queryFn: () => getItemById(id),
  });
}

export function useDashboardData(dates) {
  return useQuery({
    queryKey: ["dashboard", dates],
    queryFn: () => getDashboardData(dates),
  });
}
