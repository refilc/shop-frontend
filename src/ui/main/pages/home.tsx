import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-[200px]">
            <h1 className="mb-4 text-2xl">
                Üdv a reFilc webshopban!
            </h1>
            <Link to="/all-products" className="text-lg hover:underline ">
                <p className="text-lg">
                    Fedezd fel a reFilc-es termékeket.
                </p>
            </Link>
        </div>
    );    
};

export default HomePage;