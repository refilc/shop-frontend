import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

const MainLayout = ({ currentPage }: { currentPage: string }) => {
    return (
        <div>
            <Navbar shouldHideOnScroll>
                <NavbarBrand>
                    {/* <img src="" alt="" /> */}
                    <p>reFilc</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link color={currentPage != 'collections' ? 'foreground' : undefined} href="#" aria-current={currentPage == 'collections' ? 'page' : undefined}>
                            Kollekciók
                        </Link>
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
        </div>
    )
}

export default MainLayout;