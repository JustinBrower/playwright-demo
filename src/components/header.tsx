import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    Text,
    Badge,
    useDisclosure,
    Stack,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Links = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/catalog" },
    { label: "Orders", href: "/orders" },
];

const NavLink = ({ label, href }: { label: string; href: string }) => (
    <ChakraLink
        as={Link}
        to={href}
        px={2}
        py={1}
        rounded="md"
        _hover={{
            textDecoration: "none",
            bg: "gray.100",
        }}
        fontWeight="medium"
    >
        {label}
    </ChakraLink>
);

type Props = {
    cart?: { inCartAmount: number; onCartClick: () => void; }


};

export function Header({
    cart,
}: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bg="white" px={4} shadow="sm" position="sticky" top={0} zIndex={10}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <IconButton
                    size="md"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ md: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                />

                <HStack spacing={8} alignItems="center">
                    <Text fontWeight="bold" fontSize="lg">
                        Nigh Key
                    </Text>

                    <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
                        {Links.map((link) => (
                            <NavLink key={link.label} {...link} />
                        ))}
                    </HStack>
                </HStack>

                {cart && <Button
                    variant="ghost"
                    position="relative"
                    _hover={{ bg: "gray.100" }}
                    aria-label="Cart"
                    onClick={cart.onCartClick}
                >
                    <FaShoppingCart size={20} />
                    {cart.inCartAmount > 0 && (
                        <Badge
                            colorScheme="red"
                            position="absolute"
                            top="0"
                            right="0"
                            borderRadius="full"
                            fontSize="0.7em"
                            px={1.5}
                        >
                            {cart.inCartAmount}
                        </Badge>
                    )}
                </Button>}
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: "none" }}>
                    <Stack as="nav" spacing={4}>
                        {Links.map((link) => (
                            <NavLink key={link.label} {...link} />
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
}
