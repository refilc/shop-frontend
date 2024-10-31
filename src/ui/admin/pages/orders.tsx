import { useEffect, useState } from "react";
import { Text } from "react-ionicons";
import { toast } from "react-toastify";

interface Item {
    public_id: string;
    secret_token: string;
    product_id: string;
    product_name: string;
    unit_price: number;
    cart_id: string;
    quantity: number;
    stripe_price_id: string;
}

interface Order {
    created_at: string;
    public_id: string;
    order_id: string;
    checkout_session_id: string;
    item_ids: string[];
    shipping_method: string;
    shipping_address: string;
    payment_status: string;
    state: string;
    total_amount: number;
}

interface OrderResponse {
    order_details: Order;
    order_items: Item[];
}

const OrdersPage = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);

    const fetchOrders = async (state: string) => {
        toast.info('Fetching orders...', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        const response = await fetch('https://api.refilc.hu/v4/shop/admin/orders/get/all?state=' + state, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            },
        });

        if (response.ok) {
            const json = await response.json();
            setOrders(json["data"]["orders"]);
        } else {
            toast.error('Failed to fetch orders!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    useEffect(() => {
        fetchOrders('');
    }, []);

    return (
        <div className="flex flex-col items-start justify-start w-screen h-screen text-white bg-black">
            <div className="flex flex-row items-center justify-center gap-8">
                <h1>Order List</h1>
                <div className="flex flex-row items-center justify-center gap-4">
                    <button className="bg-neutral-800 text-white" onClick={() => {fetchOrders('')}}>All</button>
                    <button className="bg-neutral-800 text-white" onClick={() => {fetchOrders('accepted')}}>Accepted (paid, waiting for completion)</button>
                    <button className="bg-neutral-800 text-white" onClick={() => {fetchOrders('shipped')}}>Shipped (completed, waiting for arrival)</button>
                    <button className="bg-neutral-800 text-white" onClick={() => {fetchOrders('failed')}}>Failed (unpaid or cancelled)</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Shipping Method</th>
                        <th>Items</th>
                        <th>Shipping Address</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((o, _) => (
                        <tr key={o.order_details.public_id}>
                            <td className="px-[5px]" style={o.order_details.state == "accepted" ? {color: "#ffac11"} : {}}>{o.order_details.state}</td>
                            <td className="px-[5px]">{(new Date(o.order_details.created_at)).toDateString()}</td>
                            <td className="px-[5px]">
                                <p className="whitespace-pre-line text-center">{o.order_details.total_amount.toString()} €{"\n"} (~{o.order_details.total_amount*400} HUF)</p>
                            </td>
                            <td className="px-[5px]">{o.order_details.shipping_method.replace(/_/g, ' ')}</td>
                            <td className="px-[5px]">
                                <p className="whitespace-pre-line">{o.order_items.map((i) => `${i.quantity} x ${i.product_name}`).join('\n')}</p>
                            </td>
                            <td className="px-[5px]">{o.order_details.shipping_address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;