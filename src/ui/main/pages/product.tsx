import { useLoaderData } from "react-router-dom";

const ProductPage = () => {
    const publicId = useLoaderData();

    return (
        <div className="flex flex-col items-center justify-center h-screen pb-[200px]">
            <h1 className="mb-4 text-2xl">
                Üdv a reFilc webshopban!
            </h1>
            <p className="text-lg">
                Ez a {publicId as string} termék oldala.
            </p>
        </div>
    );    
};

export default ProductPage;