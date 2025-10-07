import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Text,
    VStack,
    HStack,
    Image,
    Spacer,
} from "@chakra-ui/react";
import type { Shoe } from "../@types/types";


type CartDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    cartItems: Shoe[];
    onRemove: (item: Shoe) => void;
    isLoading: boolean;
    onSubmit: () => Promise<void>
};

export function CartDrawer({ isOpen, onClose, cartItems, onRemove, isLoading, onSubmit }: CartDrawerProps) {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Your Cart 🛒</DrawerHeader>

                <DrawerBody>
                    {cartItems.length === 0 ? (
                        <Text color="gray.500" textAlign="center" mt={8}>
                            Your cart is empty
                        </Text>
                    ) : (
                        <VStack spacing={4} align="stretch">
                            {cartItems.map((item) => (
                                <HStack key={item.name} align="center">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        boxSize="60px"
                                        objectFit="cover"
                                        borderRadius="md"
                                    />
                                    <VStack align="start" spacing={0} flex={1}>
                                        <Text fontWeight="semibold" noOfLines={1}>
                                            {item.name}
                                        </Text>
                                        <Text fontSize="sm" color="gray.600">
                                            ${item.price.toFixed(2)}
                                        </Text>
                                    </VStack>
                                    <Spacer />
                                    <Button size="sm" colorScheme="red" onClick={() => onRemove(item)}>
                                        Remove
                                    </Button>
                                </HStack>
                            ))}
                        </VStack>
                    )}
                </DrawerBody>

                <DrawerFooter flexDirection="column" alignItems="stretch">
                    {cartItems.length > 0 && (
                        <>
                            <HStack w="100%" mb={3}>
                                <Text fontWeight="bold">Total</Text>
                                <Spacer />
                                <Text fontWeight="bold">${total.toFixed(2)}</Text>
                            </HStack>
                            <Button onClick={onSubmit} isLoading={isLoading} colorScheme="teal" w="full">
                                Checkout
                            </Button>
                        </>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
