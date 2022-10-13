import {useState} from "react";
import {ItemData} from "./list-definitions";

interface ITotal {
  price: number;
  number: number;
}

const useTotals = () => {
  const [totals, setTotals] = useState<ITotal>({price: 0, number: 0});
  const updateTotals = (items: ItemData[]) => {
    const newTotals: ITotal = {price: 0, number: 0};
    items.forEach(item => {
      newTotals.price += Number(item.price || 0);
      newTotals.number += Number(item.number || 0);
    });
    setTotals(newTotals);
  };
  return {totals, updateTotals};
}

export default useTotals;
