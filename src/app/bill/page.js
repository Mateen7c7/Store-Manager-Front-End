"use client";

import { useCreateBill } from "@/services/mutations";
import { useItems } from "@/services/queries";
import { useEffect, useState } from "react";

export default function Home() {
  const itemsQuery = useItems();
  const createBillMutation = useCreateBill();
  const [items, setItems] = useState();

  function handelBill() {
    let bill = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].tookQuantity > 0) {
        bill.push({
          id: items[i]._id,
          name: items[i].name,
          broughtPrice: items[i].broughtPrice,
          sellPrice: items[i].sellPrice,
          quantity: items[i].quantity,
          category: items[i].category,
          tookQuantity: items[i].tookQuantity,
        });
      }
    }

    createBillMutation.mutate({
      data: [...bill],
    });
    console.log("bill", bill);
  }

  function handleAdd(obj) {
    let newItems = items.map((item) => {
      if (item._id == obj._id) {
        return {
          ...obj,
          tookQuantity: item.tookQuantity + 1,
        };
      } else {
        return item;
      }
    });
    setItems(newItems);
  }

  function handleMinus(obj) {
    let newItems = items.map((item) => {
      if (item._id == obj._id) {
        return {
          ...obj,
          tookQuantity: item.tookQuantity - 1,
        };
      } else {
        return item;
      }
    });
    setItems(newItems);
  }

  useEffect(() => {
    const setData = async () => {
      const data = await itemsQuery.data;
      setItems(
        data?.map((obj) => {
          return {
            ...obj,
            tookQuantity: 0,
          };
        })
      );
    };
    setData();
  }, [itemsQuery.data]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center   ">
      {items ? (
        <div className="flex  flex-col sm:flex-row gap-5 sm:gap-10 ">
          <SearchBar items={items} setItems={setItems} />
          <Select
            items={items}
            handleAdd={handleAdd}
            handleMinus={handleMinus}
            handelBill={handelBill}
            createBillMutation={createBillMutation}
          />
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

function Select({
  items,
  handleAdd,
  handleMinus,
  handelBill,
  createBillMutation,
}) {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let newTotalItems = 0;
    let newTotalPrice = 0;
    items.forEach((item) => {
      newTotalItems += item.tookQuantity;
      newTotalPrice += item.tookQuantity * item.sellPrice;
    });
    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
  }, [items]);
  return (
    <div className="bg-secondary rounded-md px-3 py-2 max-w-[400px] space-y-3">
      <div className="flex items-center justify-between text-primary px-2">
        <p className="w-[120px]  ">Name</p>
        <p className="w-[40px] ">Took</p>
        <p className="w-[40px] ">Price</p>
        <div className="flex  items-center justify-between text-2xl gap-5">
          <p className="px-2">-</p>
          <p className="px-2">+</p>
        </div>
      </div>
      {items.map((item, i) => {
        if (item.tookQuantity > 0) {
          return (
            <SelectedItem
              key={i}
              item={item}
              handleAdd={handleAdd}
              handleMinus={handleMinus}
            />
          );
        }
      })}
      <div className="flex px-2 items-center justify-between text-primary">
        <p>Total Items : {totalItems}</p>
        <p>Total Price : {totalPrice}</p>
      </div>
      {totalItems > 0 && (
        <div className="w-full flex items-center justify-center">
          <button
            onClick={() => handelBill()}
            className="bg-primary text-white px-2 rounded-sm text-xl font-bold "
            disabled={createBillMutation.isLoading}
          >
            Bill
          </button>
        </div>
      )}
    </div>
  );
}

function SelectedItem({ item, handleAdd, handleMinus }) {
  return (
    <div className="flex items-center justify-between px-2 py-1 border-primary border-2 rounded-md">
      <p className="w-[120px]  ">{item.name}</p>
      <p className="w-[40px] ">{item.tookQuantity}</p>
      <p className="w-[40px]">{item.sellPrice + " ₹"}</p>
      <button
        onClick={() => handleAdd(item)}
        className="bg-green-500 text-white px-2 rounded-sm font-bold "
      >
        +
      </button>
      <button
        onClick={() => handleMinus(item)}
        className="bg-red-500 text-white px-2 rounded-sm font-bold "
      >
        -
      </button>
    </div>
  );
}

function SearchBar({ items, setItems }) {
  const [search, setSearch] = useState("");
  const [searchItems, setSearchItems] = useState(items);

  const handleSelect = (obj) => {
    // console.log(obj);

    let newItems = items.map((item) => {
      if (item._id == obj._id) {
        // console.log(item);
        return {
          ...obj,
          tookQuantity: item.tookQuantity ? item.tookQuantity + 1 : 1,
        };
      } else {
        return item;
      }
    });
    // console.log(newItems);
    setItems(newItems);
  };

  useEffect(() => {
    if (search) {
      setSearchItems(
        items.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setSearchItems(items);
    }
  }, [search, items]);
  return (
    <div className="bg-secondary rounded-md px-3 py-2 max-w-[400px]">
      <div className="w-full my-5 text-center sm:my-12">
        <input
          value={search}
          className="placeholder:text-primary placeholder:text-lg px-4 py-2 bg-white rounded-md w-full text-primary outline-none max-w-[450px] sm:py-4 sm:px-6 sm:placeholder:text-2xl sm:text-2xl "
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="search"
        />
      </div>
      <div className="space-y-3">
        {search
          ? searchItems.map((item, i) => (
              <Item key={i} handleSelect={handleSelect} item={item} />
            ))
          : items.map((item, i) => (
              <Item key={i} handleSelect={handleSelect} item={item} />
            ))}
      </div>
    </div>
  );
}

function Item({ item, handleSelect }) {
  return (
    <div
      className="flex cursor-pointer items-center justify-between px-2 py-1 border-primary border-2 rounded-md"
      onClick={() => handleSelect(item)}
    >
      <p className="w-[150px] ">{item.name}</p>
      <p className="w-[45px]">{item.sellPrice + " ₹"}</p>
      <p className="w-[45px]">{item.quantity - item.tookQuantity}</p>
    </div>
  );
}
