"use client";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useCreateItem } from "@/services/mutations";
function AddItem({ itemStatus, setItemStatus }) {
  return (
    <div className="w-full h-full absolute  backdrop-blur-md  top-0 left-0 flex items-center justify-center">
      <X
        size={30}
        className="text-xl text-primary cursor-pointer absolute top-5 right-5"
        onClick={() => setItemStatus(false)}
      />
      {itemStatus == "addItem" && <AddForm setItemStatus={setItemStatus} />}
    </div>
  );
}

export default AddItem;

function AddForm({ setItemStatus }) {
  const createItemMutation = useCreateItem();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    createItemMutation.mutate(data);
    console.log(data);

    setItemStatus(false);
  };
  return (
    <form
      className=" bg-secondary rounded-md flex flex-col  px-5 py-10 text-primary
      gap-1 border border-primary
    "
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="">Name</label>
      <input {...register("name")} className="input" />
      <label>Brought Price</label>
      <input {...register("broughtPrice")} className="input" />
      <label>Sell Price</label>
      <input {...register("sellPrice")} className="input" />
      <label>Quantity</label>
      <input {...register("quantity")} className="input" />
      <label>Category</label>
      <input {...register("category")} className="input" />
      <div className="text-center mt-5">
        <input
          type="submit"
          value={"Add"}
          className="text-white cursor-pointer bg-primary  rounded-sm px-5 py-1 font-semibold hover:text-primary hover:bg-white"
        />
      </div>
    </form>
  );
}
