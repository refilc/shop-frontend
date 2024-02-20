import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NextUIProvider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { ChevronDownOutline } from "react-ionicons";
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ currentPage }: { currentPage: string }) => {
    const navigate = useNavigate();

    return (
        <NextUIProvider navigate={navigate}>
            <div className="dark text-foreground bg-background w-screen h-screen">
                <Navbar shouldHideOnScroll className="w-full">
                    <NavbarBrand>
                        {/* <img src="" alt="" /> */}
                        <p>reFilc</p>
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-4" justify="center">
                        <Dropdown>
                            <NavbarItem>
                                <DropdownTrigger>
                                    <Button
                                        disableRipple
                                        className="p-0 bg-transparent data-[hover=true]:bg-transparent outline-none border-none text-[16px]"
                                        endContent={<ChevronDownOutline width={'16px'} color={'text-foreground'} />}
                                        radius="sm"
                                        variant="light"
                                    >
                                        Kollekciók
                                    </Button>
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu
                                aria-label="sexah"
                                className="w-[340px]"
                                itemClasses={{
                                base: "gap-4",
                                }}
                            >
                                <DropdownItem
                                    key="autoscaling"
                                    description="sex"
                                    startContent={undefined}
                                >
                                    igen
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <NavbarItem>
                            
                        </NavbarItem>
                        <NavbarItem>
                            <Link color={currentPage != 'categories' ? 'foreground' : undefined} href="#" aria-current={currentPage == 'categories' ? 'page' : undefined}>
                                Kategóriák
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive={currentPage == 'all-products'}>
                            <Link color={currentPage != 'all-products' ? 'foreground' : undefined} href="/all-products" aria-current={currentPage == 'all-products' ? 'page' : undefined}>
                                Összes termék
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/auth/login" variant="flat">
                                Belépés
                            </Button>
                        </NavbarItem>
                        <NavbarItem isActive={currentPage == 'cart'}>
                            <Link color={currentPage != 'cart' ? 'foreground' : undefined} href="/cart" aria-current={currentPage == 'cart' ? 'page' : undefined}>
                                
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
                <div>sex</div>
            </div>
        </NextUIProvider>
    )
}

export default MainLayout;