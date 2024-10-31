import { useNavigate } from "react-router-dom";

import foxpostLogo from '/image/external/foxpost_logo_red.png?url';

const ShippingMethodPage = () => {
    const navigate = useNavigate();

    const handleFoxpost = () => {
        // handle foxpost shipping
        navigate('/pay/foxpost-selector');
    };

    return (
        <div className="flex flex-col items-center justify-center h-max pb-[50px]">
            <h1 className="text-foreground text-[40px] font-[700] mt-[80px] mb-[32px]">Szállítási mód kiválasztása</h1>
            {/* <p className="max-w-[600px] text-justify">
                Kérjük válassz fizetési módot! A bankkártyás, valamint digitális tárcás fizetést a Stripe biztosítja. A rendelésedet a fizetés után a lehető legrövidebb időn belül feldolgozzuk. Amennyiben bármilyen kérdésed vagy problémád adódik a rendelés leadása során, kérjük vedd fel velünk a kapcsolatot az alábbi elérhetőségek egyikén: <a href="mailto:social@refilc.hu">social@refilc.hu</a>, <a href="https://filc.one/discord" target="_blank">Discord</a>, <a href="https://filc.one/instagram" target="_blank">Instagram</a>
            </p> */}
            <div className="flex flex-row items-center justify-center gap-4 mt-[50px]">
                <div className="flex flex-row items-center justify-center p-[20px] bg-white rounded-[18px] outline-none border-none gap-2 cursor-pointer" onClick={handleFoxpost}>
                    <img src={foxpostLogo} alt="foxpost" width={32} />
                    <p className="text-text text-[20px] font-bold">FoxPost csomagautomata</p>
                </div>
            </div>
        </div>
    );
};

export default ShippingMethodPage;