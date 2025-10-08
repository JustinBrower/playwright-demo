import {
    Box,
    Image,
    Text,
    Badge,
    SimpleGrid,
    Flex,
    Button,
    Stack,
    Spacer,
    useDisclosure,
    useToast,
    Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import catalogData from "../data/catalog.json";
import { Header } from "../components/header";
import { useState } from "react";
import type { Cart, Shoe } from "../@types/types";
import { CartDrawer } from "../components/drawer";
import { saveOrder } from "../utils/storage.utils";

const MotionBox = motion(Box);

export function Catalog() {
    const data: Shoe[] = catalogData;
    const [cart, setCart] = useState<Cart>({ items: [] });
    const { isOpen, onClose, onOpen } = useDisclosure();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const addToCart = (item: Shoe) =>
        setCart((prev) => ({ ...prev, items: [...prev.items, item] }));

    const removeFromCart = (item: Shoe) =>
        setCart((prev) => ({
            ...prev,
            items: prev.items.filter((it) => it.name !== item.name),
        }));

    const isInCart = (item: Shoe) =>
        cart.items.map((shoe) => shoe.name).includes(item.name);

    const onSubmitCart = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast({
            title: "Order submitted!",
            description: "Your cart has been successfully checked out.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
        saveOrder({
            items: cart.items,
            id: Math.floor(Math.random() * 10000).toString(),
            date: new Date().toISOString(),
            status: "Approved",
        });
        setLoading(false);
        onClose();
        setCart({ items: [] });
    };

    return (
        <>
            <Header cart={{ inCartAmount: cart.items.length, onCartClick: onOpen }} />

            <Box
                minH="100vh"
                bgGradient="linear(to-br, gray.900, gray.800, blue.900)"
                px={{ base: 4, md: 10 }}
                py={10}
            >
                <Box textAlign="center" mb={10}>
                    <Heading
                        size="2xl"
                        bgGradient="linear(to-r, teal.300, blue.400, purple.400)"
                        bgClip="text"
                        fontWeight="extrabold"
                        pb={4}
                    >
                        Explore the Catalog
                    </Heading>
                    <Text color="gray.300" mt={2}>
                        Discover the latest drops. Add your favorites to the cart
                    </Text>
                </Box>

                <SimpleGrid minChildWidth="260px" spacing="24px">
                    {data.map((item, index) => {
                        const outOfStock = !item.inStock || item.inStock === 0;
                        const inCart = isInCart(item);

                        return (
                            <MotionBox
                                key={item.name}
                                data-testid={"catalog-item-" + {index}}
                                bg="whiteAlpha.100"
                                borderRadius="xl"
                                overflow="hidden"
                                border="1px solid"
                                borderColor="whiteAlpha.200"
                                transition={{ duration: 0.3 }}
                                boxShadow="0 4px 20px rgba(0,0,0,0.4)"
                            >
                                <Box position="relative">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        w="100%"
                                        h="220px"
                                        objectFit="cover"
                                    />

                                    {outOfStock && (
                                        <Badge
                                            position="absolute"
                                            top={3}
                                            right={3}
                                            colorScheme="red"
                                            fontSize="0.8em"
                                            borderRadius="md"
                                            px={2}
                                            py={1}
                                        >
                                            Sold Out
                                        </Badge>
                                    )}
                                </Box>

                                <Box p={4}>
                                    <Flex mb={2} align="center">
                                        <Badge
                                            colorScheme="blue"
                                            textTransform="capitalize"
                                            fontSize="0.75em"
                                        >
                                            {item.category}
                                        </Badge>
                                        <Spacer />
                                        <Badge
                                            colorScheme={outOfStock ? "red" : "green"}
                                            fontSize="0.75em"
                                        >
                                            {outOfStock ? "Out of Stock" : `${item.inStock} left`}
                                        </Badge>
                                    </Flex>

                                    <Text
                                        fontWeight="bold"
                                        fontSize="lg"
                                        color="white"
                                        noOfLines={1}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text data-testid={"color"} color="gray.400" fontSize="sm">
                                        {item.brand} • {item.color}
                                    </Text>

                                    <Text
                                        data-testid={"price"}
                                        fontSize="xl"
                                        fontWeight="semibold"
                                        mt={2}
                                        color="teal.300"
                                    >
                                        ${item.price.toFixed(2)}
                                    </Text>

                                    <Stack mt={3} spacing={0.5}>
                                        <Text data-testid={"sizes"} fontSize="sm" color="gray.400">
                                            Sizes: {item.size.join(", ")}
                                        </Text>
                                        <Text data-testid={"material"} fontSize="sm" color="gray.400">
                                            Material: {item.material}
                                        </Text>
                                    </Stack>

                                    <Button
                                        mt={4}
                                        colorScheme={inCart ? "gray" : "teal"}
                                        width="full"
                                        isDisabled={outOfStock}
                                        onClick={
                                            inCart ? () => removeFromCart(item) : () => addToCart(item)
                                        }
                                        _hover={{
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                                        }}
                                        transition="all 0.25s"
                                    >
                                        {outOfStock
                                            ? "Unavailable"
                                            : inCart
                                                ? "Remove from Cart"
                                                : "Add to Cart"}
                                    </Button>
                                </Box>
                            </MotionBox>
                        );
                    })}
                </SimpleGrid>
            </Box>

            <CartDrawer
                isOpen={isOpen}
                onClose={onClose}
                cartItems={cart.items}
                onRemove={removeFromCart}
                onSubmit={onSubmitCart}
                isLoading={loading}
            />
        </>
    );
}
