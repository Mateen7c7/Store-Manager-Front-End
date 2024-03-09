"use client";

import Items from "@/components/Items";
import { useItems } from "@/services/queries";
import { useState } from "react";
import { PlusSquare } from "lucide-react";
import AddItem from "@/components/AddItem";
import UpdateItem from "@/components/UpdateItem";

export default function Home() {
  const itemsQuery = useItems();
  const [search, setSearch] = useState("");
  const [itemStatus, setItemStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <div className="w-full my-5 text-center sm:my-12">
        <input
          value={search}
          className="placeholder:text-primary placeholder:text-lg px-4 py-2 bg-secondary rounded-md w-full text-primary outline-none max-w-[450px] sm:py-4 sm:px-6 sm:placeholder:text-2xl sm:text-2xl "
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="search"
        />
      </div>
      <div className="w-full  mb-5 flex items-center justify-start gap-10 ">
        <p className="text-primary text-lg sm:text-xl ">
          Items : {itemsQuery.data ? itemsQuery.data.length : "0"}
        </p>
        <p onClick={() => setItemStatus("addItem")}>
          <PlusSquare size={25} className="text-primary cursor-pointer" />
        </p>
      </div>

      <div className="flex items-center justify-between text-primary border-b border-primary pb-1 sm:text-xl">
        <p className="  w-[110px] sm:w-[150px] ">Name</p>
        <p className=" w-[40px]  sm:w-[45px] ">Price</p>
        <p className=" w-[70px]  sm:w-[80px] ">Quantity</p>
      </div>
      {itemsQuery.isFetched ? (
        <Items
          search={search}
          items={itemsQuery.data}
          setSelectedItem={setSelectedItem}
        />
      ) : (
        <p>Loading...</p>
      )}

      {/* <h1 className="h-[900px] w-full bg-primary mt-20"></h1> */}
      {itemStatus && (
        <AddItem itemStatus={itemStatus} setItemStatus={setItemStatus} />
      )}
      {selectedItem && (
        <UpdateItem
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
}
