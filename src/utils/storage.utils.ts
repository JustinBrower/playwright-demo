import type { Order } from "../@types/types";

export const fetchOrders = (): Order[] => JSON.parse(localStorage.getItem("orders") ?? "[]");

export const saveOrder = (order: Order) => localStorage.setItem("orders", JSON.stringify([...fetchOrders(), order]));

export const cancelOrder = (order: Order) => localStorage.setItem(
    "orders",
    JSON.stringify([...fetchOrders().filter((o) => o.id !== order.id), { ...order, status: 'Cancelled' }])
);