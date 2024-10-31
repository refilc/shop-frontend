import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FoxpostSelectorPage = () => {
    const navigate = useNavigate();

    const setCheckoutSessionShipping = async (parcelMachine: any): Promise<boolean> => {
        // start payment
        return fetch('https://api.refilc.hu/v4/shop/pay/set-checkout-shipping', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shipping_method: 'foxpost_parcel_machine', data: parcelMachine, secret_token: localStorage.getItem("checkout_session_token") }),
        }).then(async (res) => {
            if (res.ok) {
                return true;
            }
            return false;
        });
    }

    var alreadyProcessing = false;

    const handleParcelMachineSelect = (event: {
        origin: string; data: string; 
    }) => {
        if (event.origin !== 'https://cdn.foxpost.hu') return;
        if (alreadyProcessing) return;
        // parse apt
        try {
            alreadyProcessing = true;
            var apt = JSON.parse(event.data);
        } catch (e) {
            alreadyProcessing = false;
            return;
        }
        // update checkout session
        toast.promise(setCheckoutSessionShipping(apt), {
            pending: 'Szállítási mód frissítése...',
            success: 'Átirányítás...',
            error: 'A szállítási mód frissítése közben hiba történt.',
            
        }, {theme: "light", autoClose: 3000, position: "bottom-right"},).then((success) => {
            if (success) {
                navigate('/pay/payment-method');
            }
        });
    };

    window.addEventListener('message', handleParcelMachineSelect, false);

    return (
        <div className="flex flex-col items-center justify-center h-max pb-[50px]">
            <h1 className="text-foreground text-[40px] font-[700] mt-[80px] mb-[32px]">FoxPost csomagautomata kiválasztása</h1>
            {/* <p className="max-w-[600px] text-justify">
                Kérjük válassz fizetési módot! A bankkártyás, valamint digitális tárcás fizetést a Stripe biztosítja. A rendelésedet a fizetés után a lehető legrövidebb időn belül feldolgozzuk. Amennyiben bármilyen kérdésed vagy problémád adódik a rendelés leadása során, kérjük vedd fel velünk a kapcsolatot az alábbi elérhetőségek egyikén: <a href="mailto:social@refilc.hu">social@refilc.hu</a>, <a href="https://filc.one/discord" target="_blank">Discord</a>, <a href="https://filc.one/instagram" target="_blank">Instagram</a>
            </p> */}
            {/* <div className="flex flex-row items-center justify-center gap-4 mt-[50px]">
                <div className="flex flex-row items-center justify-center p-[20px] bg-white rounded-[18px] outline-none border-none gap-2 cursor-pointer" onClick={handlePaypal}>
                    <LogoPaypal color={'#003087'} cssClasses={'text-[#003087]'} />
                    <p className="text-text text-[20px] font-bold">PayPal</p>
                </div>
                <div className="flex flex-row items-center justify-center p-[20px] bg-white rounded-[18px] outline-none border-none gap-2 cursor-pointer" onClick={handleStripe}>
                    <CardOutline color={'#000'} cssClasses={'text-[#000]'} />
                    <p className="text-text text-[20px] font-bold">Bankkártya, Apple Pay, Google Pay</p>
                </div>
            </div> */}
            <iframe frameBorder="0" loading="lazy" src="https://cdn.foxpost.hu/apt-finder/app/?desktop_height=600&tablet_width=600&tablet_height=350&mobile_width=400&mobile_height=350" width="100%" height="600">
            </iframe>
        </div>
    );
};

export default FoxpostSelectorPage;