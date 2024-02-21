import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

const products: Product[] = [
    { id: 1, title: "Product 1", price: 29.99, image: "https://fakeimg.pl/1500x1500" },
    { id: 2, title: "Product 2", price: 49.99, image: "https://fakeimg.pl/1500x1500" },
    { id: 3, title: "Product 3", price: 19.99, image: "https://fakeimg.pl/1500x1500" },
];

const AllProductsPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen pb-[50px]">
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <Card shadow="sm" key={product.id} isPressable onPress={() => console.log("item pressed")} className="p-[10px]">
                            <CardBody className="overflow-visible p-0">
                                <Image
                                    shadow="sm"
                                    radius="md"
                                    width="100%"
                                    alt={product.title}
                                    className="w-full object-cover h-[240px]"
                                    src={product.image}
                                />
                                </CardBody>
                            <CardFooter className="text-small justify-between">
                                <b>{product.title}</b>
                                <p className="text-default-500">{product.price}</p>
                            </CardFooter>
                        </Card>
                    ))}
            </div>
        </div>
    );    
};

export default AllProductsPage;