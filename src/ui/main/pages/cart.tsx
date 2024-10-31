import { useEffect, useState } from "react";
import { AddCircleOutline, ArrowForwardCircleOutline, RemoveCircleOutline, TrashOutline } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

interface Product {
    publicId: string;
    title: string;
    price: number;
    image: string;
    alertTitle?: string | undefined;
    colors: string[];
    description?: string;
    cartId?: string;
    count: number;
    stripePriceId: string;
}

const CartPage = () => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([] as Product[]);

    // read items from local storage
    useEffect(() => {
        setCartItems([]);

        const itemTypes: string[] = [];
        var tempItems: Product[] = [];

        const items = localStorage.getItem("cart_items");
        if (items) {
            const itemList = items.split(";");

            for (let i = 0; i < itemList.length; i++) {
                const product: Product = JSON.parse(itemList[i]);
                if (itemTypes.includes(product.publicId)) {
                    const index = tempItems.findIndex((item) => item.publicId === product.publicId);
                    tempItems[index].count += 1;
                } else {
                    itemTypes.push(product.publicId);
                    tempItems.push(product);
                    // setCartItems((cartItems) => [...cartItems, product]);
                }
            }

            setCartItems(tempItems);
        }
    }, []);

    const removeCartItem = (itemId: string) => {
        // remove item
        const newCartItems = cartItems.filter((item) => item.cartId !== itemId);
        setCartItems(newCartItems);
        localStorage.setItem("cart_items", newCartItems.map((item) => JSON.stringify(item)).join(";"));
        // show toast
        toast.error('A termék törölve lett a kosárból.', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    const updateCartItemCount = (itemId: string, count: number) => {
        // update item count
        const index = cartItems.findIndex((item) => item.cartId === itemId);
        if (cartItems[index].count + count <= 0) {
            removeCartItem(itemId);
            return;
        }
        cartItems[index].count += count;
        // store updated items
        setCartItems([...cartItems]);
        localStorage.setItem("cart_items", cartItems.map((item) => JSON.stringify(item)).join(";"));
    };

    // create own session, open payment method selection
    const createCheckoutSession = async (): Promise<boolean> => {
        return fetch("https://api.refilc.hu/v4/shop/pay/create-checkout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cartItems }),
        }).then(async (res) => {
            if (res.ok) {
                localStorage.setItem("checkout_session_token", (await res.json())["data"]["checkout_session"]["secret_token"]);
                localStorage.removeItem("cart_items");

                return true;
            }
            return false;
        });
    };

    // call this in checkout button click
    const showToastThenNavigateToCheckout = () => {
        toast.promise(createCheckoutSession(), {
            pending: 'Fizetés megkezdése...',
            success: 'Átirányítás...',
            error: 'Hiba történt a fizetés megkezdése közben.',
            
        }, {theme: "light", autoClose: 3000, position: "bottom-right"},).then((success) => {
            if (success) {
                navigate('/pay/shipping-method');
            }
        });
    }

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart_items");
    };

    return (
        <div className="flex flex-col items-center justify-center h-max pb-[50px]">
            <h1 className="text-foreground text-[40px] font-[700] mt-[80px] mb-[32px]">Kosár</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-500">A kosarad még sajnos üres :(</p>
            ) : (
                <div>
                    <div className="flex flex-col divide-y divide-textsec/25">
                        {cartItems.map((item) => (
                            <div key={item.cartId} className="flex items-center justify-between gap-4 py-[15px] min-w-[650px] max-w-[1000px]">
                                <div className="flex items-center justify-start gap-4">
                                    <img src={item.image} alt={item.title} className="h-16" />
                                    <div className="max-w-[700px]">
                                        <h2 className="text-lg font-bold">{item.title}</h2>
                                        <p className="text-gray-500 max-w-[500px]">{item.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-4">
                                    <p className="text-lg">{item.count} x <span className="font-bold">{item.price} €</span></p>
                                    <div onClick={() => updateCartItemCount(item.cartId ?? "", -1)} className="cursor-pointer">
                                        <RemoveCircleOutline color={'secondary'} cssClasses={'text-secondary'} />
                                    </div>
                                    <div onClick={() => updateCartItemCount(item.cartId ?? "", +1)} className="cursor-pointer">
                                        <AddCircleOutline color={'secondary'} cssClasses={'text-secondary'} />
                                    </div>
                                    <div onClick={() => removeCartItem(item.cartId ?? "")} className="hover:text-red-500 cursor-pointer">
                                        <TrashOutline color={'secondary'} cssClasses={'text-secondary hover:text-red-500'} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row items-center justify-between mt-[40px]">
                        <div onClick={clearCart} className="flex flex-row items-center justify-center px-4 py-2 bg-textsec/25 text-white rounded-full cursor-pointer gap-2">
                            <p>Kosár ürítése</p>
                            <TrashOutline color={'white'} cssClasses={'text-white'} />
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <p className="text-lg">Összesen: <span className="font-bold">{cartItems.reduce((acc, item) => acc + (item.price * item.count), 0)} €</span></p>
                            <div onClick={showToastThenNavigateToCheckout} className="flex flex-row items-center justify-center px-4 py-2 bg-secondary text-white rounded-full cursor-pointer gap-2">
                                <p>Folytatás</p>
                                <ArrowForwardCircleOutline color={'white'} cssClasses={'text-white'} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        // <div className="flex flex-col items-center">
        //     <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            

        //     <div className="mt-8">
        //         <button
        //             onClick={createCheckoutSession}
        //             className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
        //         >
        //             Checkout
        //         </button>
        //         <button
        //             onClick={clearCart}
        //             className="px-4 py-2 bg-red-500 text-white rounded-md"
        //         >
        //             Clear Cart
        //         </button>
        //     </div>
        // </div>
    );
};

export default CartPage;