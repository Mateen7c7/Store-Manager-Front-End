"use client";

import { useEffect, useState } from "react";

function Items({ items, setSelectedItem, search }) {
  const [searchItems, setSearchItems] = useState(items);
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
    <div>
      {search
        ? searchItems.map((item, i) => (
            <Item item={item} setSelectedItem={setSelectedItem} key={i} />
          ))
        : items.map((item, i) => (
            <Item item={item} setSelectedItem={setSelectedItem} key={i} />
          ))}
    </div>
  );
}

export default Items;

function Item({ item, setSelectedItem }) {
  return (
    <div
      onClick={() => setSelectedItem(item)}
      className="cursor-pointer flex items-center justify-between sm:text-xl border-b border-primary py-2"
    >
      <p className=" w-[130px] sm:w-[150px]">{item.name}</p>
      <p className=" w-[40px] sm:w-[45px]">{item.sellPrice + " ₹"}</p>
      <p className=" w-[75px] pl-5 sm:w-[80px]">{item.quantity}</p>
    </div>
  );
}
