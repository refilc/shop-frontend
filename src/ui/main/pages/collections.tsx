import { useLoaderData } from "react-router-dom";

const CollectionsPage = () => {
    const name = useLoaderData();

    return (
        <div className="flex flex-col items-center justify-center h-screen pb-[200px]">
            <p>{name as string}</p>
        </div>
    );    
};

export default CollectionsPage;