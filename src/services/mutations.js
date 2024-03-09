import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBill, createItem, deleteItemById, updateItemById } from "./api";

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item) => {
      return createItem(item);
    },
    onSettled: async (_, error) => {
      console.log("Settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => {
      return deleteItemById(id);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return updateItemById(data);
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
        await queryClient.invalidateQueries({
          queryKey: ["item", { id: variables.id }],
        });
      }
    },
  });
}

export function useCreateBill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bill) => {
      return createBill(bill);
    },
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["items"] });
      }
    },
  });
}

// export function useDashboardData() {
//   return useMutation({
//     mutationFn: (dates) => {
//       return getDashboardData(dates);
//     },
//   });
// }
