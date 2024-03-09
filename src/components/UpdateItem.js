"use client";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useDeleteItem, useUpdateItem } from "@/services/mutations";
import { useState } from "react";
function UpdateItem({ selectedItem, setSelectedItem }) {
  const [status, setStatus] = useState("update");
  return (
    <div className="w-full h-full absolute  backdrop-blur-md  top-0 left-0 flex items-center justify-center">
      <X
        size={30}
        className="text-xl text-primary cursor-pointer absolute top-5 right-5"
        onClick={() => setSelectedItem(null)}
      />
      <div className="absolute top-20  space-x-5 w-full ">
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => setStatus("update")}
            className="bg-green-400 text-white font-semibold text-xl px-2 py-1 rounded-md"
          >
            Update
          </button>
          <button
            onClick={() => setStatus("delete")}
            className="bg-red-400 text-white font-semibold text-xl px-2 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
      {status == "update" && (
        <UpdateForm
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
      {status == "delete" && (
        <DeleteForm
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
}

export default UpdateItem;

function UpdateForm({ selectedItem, setSelectedItem }) {
  const updateItemMutation = useUpdateItem();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    updateItemMutation.mutate({ id: selectedItem._id, data });

    setSelectedItem(null);
  };
  return (
    <form
      className=" bg-secondary rounded-md flex flex-col  px-5 py-10 text-primary
      gap-1 border border-primary
    "
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="">Name</label>
      <input
        {...register("name")}
        className="input"
        defaultValue={selectedItem.name}
      />
      <label>Brought Price</label>
      <input
        {...register("broughtPrice")}
        className="input"
        defaultValue={selectedItem.broughtPrice}
      />
      <label>Sell Price</label>
      <input
        {...register("sellPrice")}
        className="input"
        defaultValue={selectedItem.sellPrice}
      />
      <label>Quantity</label>
      <input
        {...register("quantity")}
        className="input"
        defaultValue={selectedItem.quantity}
      />
      <label>Category</label>
      <input
        {...register("category")}
        className="input"
        defaultValue={selectedItem.category}
      />
      <div className="text-center mt-5">
        <input
          type="submit"
          value={"Update"}
          className="text-white cursor-pointer bg-primary  rounded-sm px-5 py-1 font-semibold hover:text-primary hover:bg-white"
        />
      </div>
    </form>
  );
}

function DeleteForm({ selectedItem, setSelectedItem }) {
  const deleteItemMutation = useDeleteItem();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    deleteItemMutation.mutate(selectedItem._id);
    setSelectedItem(null);
  };
  return (
    <form
      className=" bg-secondary rounded-md flex flex-col  px-5 py-10 text-primary
        gap-1 border border-primary
      "
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="">Name</label>
      <input
        {...register("name")}
        className="input"
        defaultValue={selectedItem.name}
      />
      <label>Brought Price</label>
      <input
        {...register("broughtPrice")}
        className="input"
        defaultValue={selectedItem.broughtPrice}
      />
      <label>Sell Price</label>
      <input
        {...register("sellPrice")}
        className="input"
        defaultValue={selectedItem.sellPrice}
      />
      <label>Quantity</label>
      <input
        {...register("quantity")}
        className="input"
        defaultValue={selectedItem.quantity}
      />
      <label>Category</label>
      <input
        {...register("category")}
        className="input"
        defaultValue={selectedItem.category}
      />
      <div className="text-center mt-5">
        <input
          type="submit"
          value={"Delete"}
          className="text-white cursor-pointer bg-primary  rounded-sm px-5 py-1 font-semibold hover:text-primary hover:bg-white"
        />
      </div>
    </form>
  );
}
