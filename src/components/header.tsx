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
    Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionLink = motion(ChakraLink);

const Links = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/catalog" },
    { label: "Orders", href: "/orders" },
];

const NavLink = ({ label, href }: { label: string; href: string }) => (
    <MotionLink
        as={Link}
        // @ts-ignore type cast doesn't get it
        to={href}
        position="relative"
        px={2}
        py={1}
        rounded="md"
        fontWeight="medium"
        fontSize="md"
        color="whiteAlpha.900"
        _hover={{ textDecoration: "none", _after: { width: "100%" }, }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        _after={{
            content: '""',
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "0%",
            height: "2px",
            bgGradient: "linear(to-r, teal.300, blue.400)",
            transition: "width 0.3s",
        }}
    >
        {label}
    </MotionLink>
);

type Props = {
    cart?: { inCartAmount: number; onCartClick: () => void };
};

export function Header({ cart }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <MotionBox
            bgGradient="linear(to-r, gray.900, blue.900)"
            backdropFilter="blur(10px)"
            px={4}
            shadow="lg"
            position="sticky"
            top={0}
            zIndex={50}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <Flex h={16} alignItems="center" justifyContent="space-between" maxW="7xl" mx="auto">
                <IconButton
                    size="md"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ md: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                    variant="ghost"
                    color="whiteAlpha.900"
                    _hover={{ bg: "whiteAlpha.200" }}
                />

                <HStack spacing={8} alignItems="center">
                    <HStack as={Link} to="/" spacing={2} _hover={{ textDecoration: "none" }}>
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                            alt="Run Free Logo"
                            boxSize="35px"
                            borderRadius="full"
                        />
                        <Text
                            fontWeight="extrabold"
                            fontSize="xl"
                            bgGradient="linear(to-r, teal.300, blue.400, purple.400)"
                            bgClip="text"
                            letterSpacing="wider"
                        >
                            Run Free
                        </Text>
                    </HStack>

                    <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
                        {Links.map((link) => (
                            <NavLink key={link.label} {...link} />
                        ))}
                    </HStack>
                </HStack>

                {cart && (
                    <Button
                        variant="ghost"
                        position="relative"
                        aria-label="Cart"
                        onClick={cart.onCartClick}
                        color="whiteAlpha.900"
                        _hover={{ bg: "whiteAlpha.200", transform: "scale(1.05)" }}
                        transition="all 0.2s"
                    >
                        <FaShoppingCart size={20} />
                        {cart.inCartAmount > 0 && (
                            <Badge
                                data-testid={"cart-badge"}
                                colorScheme="red"
                                position="absolute"
                                top="-1"
                                right="-1"
                                borderRadius="full"
                                fontSize="0.7em"
                                px={1.5}
                                boxShadow="0 0 10px rgba(255,0,0,0.6)"
                            >
                                {cart.inCartAmount}
                            </Badge>
                        )}
                    </Button>
                )}
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
        </MotionBox>
    );
}
