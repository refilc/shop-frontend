import { Card, CardBody, Image } from "@nextui-org/react";
import exclamationMarkIcon from '/image/icon/exclamation.svg?url';
import { useNavigate } from "react-router-dom";

interface Product {
    publicId: string;
    title: string;
    price: number;
    image: string;
    alertTitle?: string | undefined;
    colors: string[];
}

const products: Product[] = [
    // { publicId: 'rf-tshirt-uwu', title: "reFiwc Póló :3", price: 169.99, image: "/image/product/uwushirt_black.png", alertTitle: "Limitált", colors: ['#000', '#fff', '#217AFF', '#FF6969'], },
    { publicId: 'rf-sticker-pack-blue', title: "reFilc Matricacsomag - 10 db", price: 2.99, image: "/image/product/sticker_pack_blue.png", colors: ['#217AFF'], },
    { publicId: 'rf-sticker-pack-blue-25', title: "reFilc Matricacsomag - 25 db", price: 6.99, image: "/image/product/sticker_pack_blue.png", colors: ['#217AFF'], },
    { publicId: 'rf-sticker-pack-blue-50', title: "reFilc Matricacsomag - 50 db", price: 9.99, image: "/image/product/sticker_pack_blue.png", colors: ['#217AFF'], },
    // { id: 2, title: "reFilc Pulcsi - kapucni nélkül", price: 69.99, image: "/image/product/pen_jumper_black.png", alertTitle: "5 maradt", colors: ['#000', '#fff', '#217AFF'], },
    // { publicId: 'rf-mug-white-base', title: "reFilc Pen Bögre", price: 420.49, image: "/image/product/mug_white_lightblue.png", colors: ['#000', '#fff', '#217AFF', '#55D933', '#FFC046'], },
    // { publicId: 'rf-phonecase-ifilc', title: "reFilc Telefontok - iFilc", price: 19.99, image: "/image/product/ifilc_case_white_blue.png", colors: ['#fff'], },
    // { id: 3, title: "reFilc Telefontok - iFilc", price: 19.99, image: "/image/product/ifilc_case_white_blue.png", colors: ['#fff'], },
];

const AllProductsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-max pb-[50px]">
            <h1 className="text-foreground text-[40px] font-[700] mt-[80px] mb-[32px]">Összes termék</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[24px] w-max">
                    {products.map((product) => (
                        <div className="relative">
                            <div className="flex flex-col items-center justify-center absolute right-[20px] top-[20px] z-[20] gap-[10px]">
                                {product.colors.map((color) => (
                                    <div className={(color == '#fff') ? 'rounded-full w-[16px] h-[16px] border-[1px] border-[#C7D3EB]' : 'rounded-full w-[16px] h-[16px]'} style={{ backgroundColor: color }}></div>
                                ))}
                            </div>
                            <Card shadow="none" key={product.publicId} isPressable onPress={() => navigate('/product/' + product.publicId)} className="p-[10px] w-[421px] h-[493px] bg-white rounded-[32px] outline-none border-none">
                                <CardBody className="overflow-visible p-0 flex flex-col h-full w-full items-center justify-center">
                                    <Image
                                        shadow="none"
                                        width="100%"
                                        alt={product.title}
                                        className="w-full object-cover h-full rounded-[24px]"
                                        src={product.image}
                                    />
                                </CardBody>
                            </Card>
                            <div className="mt-[18px] flex w-full flex-row items-center justify-between pl-[20px] pr-[20px]">
                                <div className="flex flex-col items-start justify-center">
                                    <p className="text-text text-[20px] font-bold">{product.title}</p>
                                    <p className="text-textblue text-[18px] font-medium">{product.price.toString().replace('.', ',')} €</p>
                                </div>
                                {
                                    product.alertTitle != undefined ? <div className="flex flex-row items-center justify-center rounded-[12px] bg-[#D1DEF6] p-[12px] gap-[12px]">
                                        <img src={exclamationMarkIcon} alt="exclamation" height={18} />
                                        <p className="text-textblue font-[500] text-[16px]">{product.alertTitle}</p>
                                    </div> : <div></div>
                                }
                                
                            </div>
                        </div>
                    ))}
            </div>
        </div>
        // <div className="flex flex-col items-center justify-center h-screen pb-[50px]">
        //     <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 gap-[20px]">
        //             {products.map((product) => (
        //                 <Card shadow="sm" key={product.id} isPressable onPress={() => console.log("item pressed")} className="p-[10px]">
        //                     <CardBody className="overflow-visible p-0">
        //                         <Image
        //                             shadow="sm"
        //                             radius="md"
        //                             width="100%"
        //                             alt={product.title}
        //                             className="w-full object-cover h-[240px]"
        //                             src={product.image}
        //                         />
        //                         </CardBody>
        //                     <CardFooter className="text-small justify-between">
        //                         <b>{product.title}</b>
        //                         <p className="text-default-500">{product.price}</p>
        //                     </CardFooter>
        //                 </Card>
        //             ))}
        //     </div>
        // </div>
    );    
};

export default AllProductsPage;