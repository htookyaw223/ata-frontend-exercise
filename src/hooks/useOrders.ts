import { useState } from "react";
import dayjs from "dayjs";
import { mockOrders, type Order } from "../constants/mockData";

interface SearchParams {
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
}

export function useOrders() {
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);

  const filterOrders = ({ startDate, endDate }: SearchParams) => {
    let result = mockOrders;

    if (startDate && endDate) {
      result = result.filter(
        (order) =>
          (dayjs(order.date).isSame(startDate, "day") || dayjs(order.date).isAfter(startDate, "day")) &&
          (dayjs(order.date).isSame(endDate, "day") || dayjs(order.date).isBefore(endDate, "day"))
      );
    }

    setFilteredOrders(result);
  };

  return { filteredOrders, filterOrders };
}
