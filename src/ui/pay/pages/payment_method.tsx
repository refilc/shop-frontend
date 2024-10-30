import { CardOutline, LogoPaypal } from "react-ionicons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentMethodPage = () => {
    const navigate = useNavigate();

    const paymentRequest = async (gateway: string): Promise<boolean> => {
        // start payment
        return fetch('https://api.refilc.hu/v4/shop/pay/start-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payment_gateway: gateway, secret_token: localStorage.getItem("checkout_session_token") }),
        }).then(async (res) => {
            if (res.ok) {
                const url = (await res.json())["data"]["payment_url"];
                localStorage.setItem("checkout_payment_url", url);
                return true;
            }
            return false;
        });
    }

    const handlePaypal = () => {
        // handle paypal payment
        toast.promise(paymentRequest('paypal'), {
            pending: 'PayPal fizetés kérése...',
            success: 'Átirányítás a PayPal oldalára...',
            error: 'A fizetés közben hiba történt.',
            
        }, {theme: "light", autoClose: 3000, position: "bottom-right"},).then((success) => {
            if (success) {
                const payUrl = localStorage.getItem("checkout_payment_url");
                if (payUrl) {
                    navigate(payUrl);
                }
            }
        });
    };

    const handleStripe = () => {
        // handle stripe payment
        toast.promise(paymentRequest('stripe'), {
            pending: 'Stripe fizetés kérése...',
            success: 'Átirányítás a Stripe oldalára...',
            error: 'A fizetés közben hiba történt.',
            
        }, {theme: "light", autoClose: 3000, position: "bottom-right"},).then((success) => {
            if (success) {
                const payUrl = localStorage.getItem("checkout_payment_url");
                if (payUrl) {
                    navigate(payUrl);
                }
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-max pb-[50px]">
            <h1 className="text-foreground text-[40px] font-[700] mt-[80px] mb-[32px]">Fizetési mód kiválasztása</h1>
            <p className="max-w-[600px] text-justify">
                Kérjük válassz fizetési módot! A bankkártyás, valamint digitális tárcás fizetést a Stripe biztosítja. A rendelésedet a fizetés után a lehető legrövidebb időn belül feldolgozzuk. Amennyiben bármilyen kérdésed vagy problémád adódik a rendelés leadása során, kérjük vedd fel velünk a kapcsolatot az alábbi elérhetőségek egyikén: <a href="mailto:social@refilc.hu">social@refilc.hu</a>, <a href="https://filc.one/discord" target="_blank">Discord</a>, <a href="https://filc.one/instagram" target="_blank">Instagram</a>
            </p>
            <div className="flex flex-row items-center justify-center gap-4 mt-[50px]">
                <div className="flex flex-row items-center justify-center p-[20px] bg-white rounded-[18px] outline-none border-none gap-2 cursor-pointer" onClick={handlePaypal}>
                    <LogoPaypal color={'#003087'} cssClasses={'text-[#003087]'} />
                    <p className="text-text text-[20px] font-bold">PayPal</p>
                </div>
                <div className="flex flex-row items-center justify-center p-[20px] bg-white rounded-[18px] outline-none border-none gap-2 cursor-pointer" onClick={handleStripe}>
                    <CardOutline color={'#000'} cssClasses={'text-[#000]'} />
                    <p className="text-text text-[20px] font-bold">Bankkártya, Apple Pay, Google Pay</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodPage;