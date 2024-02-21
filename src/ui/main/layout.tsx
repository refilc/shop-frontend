import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NextUIProvider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { BagHandleOutline, CafeOutline, ChevronDownOutline, ColorPaletteOutline, GameControllerOutline, ShirtOutline } from "react-ionicons";
import { useNavigate } from 'react-router-dom';
import fullLogo from '/image/brand/full_logo.svg?url';

import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const themeMode = window.localStorage.getItem('settings.thememode') ?? 'light';

    return (
        <NextUIProvider navigate={navigate} className={themeMode}>
            <div className="text-foreground bg-background w-screen h-screen">
                <Navbar shouldHideOnScroll className="w-full">
                    <NavbarBrand>
                        <div className="flex flex-row items-end justify-center gap-3">
                            <img src={fullLogo} alt="alt" width={120}/>
                            <p className="text-[22px] font-semibold">shop.</p>
                        </div>
                        
                        {/* <p>reFilc</p> */}
                    </NavbarBrand>
                    <NavbarContent className="hidden sm:flex gap-4" justify="center">
                        {/* collections */}
                        <Dropdown className={themeMode}>
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
                                aria-label="Navigation"
                                className="w-[340px]"
                                itemClasses={{
                                    base: "gap-4",
                                    title: "text-foreground",
                                }}
                            >
                                <DropdownItem as={Link}
                                    href="/collections/redraw-it"
                                    key="collections.redraw-it"
                                    description={<p className="text-foreground opacity-70">Egyéni, személyre szabható termékek. reFilc+ tagoknak!</p>}
                                    startContent={<ColorPaletteOutline color={themeMode == 'light' ? '#000' : '#fff'} />}
                                >
                                    reDraw it!
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {/* categories */}
                        <Dropdown className={themeMode}>
                            <NavbarItem>
                                <DropdownTrigger>
                                    <Button
                                        disableRipple
                                        className="p-0 bg-transparent data-[hover=true]:bg-transparent outline-none border-none text-[16px]"
                                        endContent={<ChevronDownOutline width={'16px'} color={'text-foreground'} />}
                                        radius="sm"
                                        variant="light"
                                    >
                                        Kategóriák
                                    </Button>
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu
                                aria-label="Navigation"
                                className="w-[340px]"
                                itemClasses={{
                                    base: "gap-4",
                                    title: "text-foreground",
                                }}
                            >
                                <DropdownItem as={Link}
                                    href="/categories/clothes"
                                    key="categories.clothes"
                                    description={<p className="text-foreground opacity-70">Pólók, pulcsik, zoknik, alsóneműk.</p>}
                                    startContent={<ShirtOutline color={themeMode == 'light' ? '#000' : '#fff'} />}
                                >
                                    Ruhák
                                </DropdownItem>
                                <DropdownItem as={Link}
                                    href="/categories/things"
                                    key="categories.things"
                                    description={<p className="text-foreground opacity-70">Bögrék, plüssök, párnák, kulcstartók, matricák.</p>}
                                    startContent={<CafeOutline color={themeMode == 'light' ? '#000' : '#fff'} />}
                                >
                                    Ajándéktárgyak
                                </DropdownItem>
                                <DropdownItem as={Link}
                                    href="/categories/devices"
                                    key="categories.devices"
                                    description={<p className="text-foreground opacity-70">Okoseszközök, pen-drive-ok.</p>}
                                    startContent={<GameControllerOutline color={themeMode == 'light' ? '#000' : '#fff'} />}
                                >
                                    Eszközök
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <NavbarItem>
                            <Button as={Link}
                                href="/all-products"
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent outline-none border-none text-[16px] data-[hover=true]:text-foreground text-foreground"
                                radius="sm"
                                variant="light"
                            >
                                Összes termék
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <Link
                                href="/cart"
                                className="p-0 outline-none border-none text-[16px] flex items-center justify-center"
                            >
                                <BagHandleOutline color={'foreground'} cssClasses={'text-foreground'} />
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/auth/login" variant="flat">
                                Belépés
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
                {children}
            </div>
        </NextUIProvider>
    )
}

export default MainLayout;