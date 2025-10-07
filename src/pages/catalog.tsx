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
} from "@chakra-ui/react";
import catalogData from "../data/catalog.json";
import { Header } from "../components/header";
import { useState } from "react";
import type { Cart, Shoe } from "../@types/types";
import { CartDrawer } from "../components/drawer";
import { useToast } from "@chakra-ui/react";
import { saveOrder } from "../utils/storage.utils";

export function Catalog() {
    const data: Shoe[] = catalogData;
    const [cart, setCart] = useState<Cart>({
        items: [],
    });
    const { isOpen, onClose, onOpen } = useDisclosure();

    const addToCart = (item: Shoe) => setCart((prev) => ({ ...prev, items: [...prev.items, item] }));
    const removeFromCart = (item: Shoe) => setCart((prev) => ({ ...prev, items: prev.items.filter((it) => it.name !== item.name) }));
    const isInCart = (item: Shoe) => cart.items.map((shoe) => shoe.name).includes(item.name);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

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
            status: 'Approved',
        })
        setLoading(false);
        onClose();
        setCart({ items: [] });
    };

    return (
        <>
            <Header cart={{ inCartAmount: cart.items.length, onCartClick: onOpen }} />
            <Box p={6}>
                <Text fontSize="3xl" fontWeight="bold" mb={6}>
                    Catalog
                </Text>

                <SimpleGrid minChildWidth="250px" spacing="20px">
                    {data.map((item) => {
                        const outOfStock = !item.inStock || item.inStock === 0;
                        const inCart = isInCart(item);

                        return (
                            <Box
                                key={item.name}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                shadow="md"
                                bg="white"
                                _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
                                transition="all 0.2s"
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    w="100%"
                                    h="200px"
                                    objectFit="cover"
                                />

                                <Box p="4">
                                    <Flex mb={2}>
                                        <Badge colorScheme="blue" textTransform="capitalize">
                                            {item.category}
                                        </Badge>
                                        <Spacer />
                                        <Badge colorScheme={outOfStock ? "red" : "green"}>
                                            {outOfStock ? "Out of Stock" : `${item.inStock} in stock`}
                                        </Badge>
                                    </Flex>

                                    <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                                        {item.name}
                                    </Text>
                                    <Text color="gray.600" fontSize="sm">
                                        {item.brand} • {item.color}
                                    </Text>

                                    <Text fontSize="xl" fontWeight="semibold" mt={2}>
                                        ${item.price.toFixed(2)}
                                    </Text>

                                    <Stack mt={3} spacing={1}>
                                        <Text fontSize="sm" color="gray.600">
                                            Sizes: {item.size.join(", ")}
                                        </Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Material: {item.material}
                                        </Text>
                                    </Stack>

                                    <Button
                                        mt={4}
                                        colorScheme={inCart ? "gray" : "teal"}
                                        width="full"
                                        isDisabled={outOfStock}
                                        onClick={inCart ? () => removeFromCart(item) : () => addToCart(item)}
                                    >
                                        {outOfStock ? "Unavailable" : inCart ? "Remove from Cart" : "Add to Cart"}
                                    </Button>
                                </Box>
                            </Box>
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
