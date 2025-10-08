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
    Box,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import type { Shoe } from "../@types/types";

const MotionHStack = motion(HStack);
const MotionBox = motion(Box);

type CartDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    cartItems: Shoe[];
    onRemove: (item: Shoe) => void;
    isLoading: boolean;
    onSubmit: () => Promise<void>;
};

export function CartDrawer({
    isOpen,
    onClose,
    cartItems,
    onRemove,
    isLoading,
    onSubmit,
}: CartDrawerProps) {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
            <DrawerOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
            <DrawerContent
                bg="gray.900"
                color="white"
                borderLeft="1px solid"
                borderColor="whiteAlpha.200"
                backdropFilter="blur(12px)"
            >
                <DrawerCloseButton />
                <DrawerHeader
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.200"
                    bgGradient="linear(to-r, teal.400, blue.400)"
                    bgClip="text"
                    fontSize="2xl"
                    fontWeight="extrabold"
                >
                    Your Cart
                </DrawerHeader>

                <DrawerBody pt={6}>
                    {cartItems.length === 0 ? (
                        <Text color="gray.400" textAlign="center" fontSize="lg" mt={20}>
                            Your cart is empty 😢
                        </Text>
                    ) : (
                        <VStack spacing={5} align="stretch">
                            <AnimatePresence>
                                {cartItems.map((item, index) => (
                                    <MotionHStack
                                        key={item.name}
                                        data-testid={`cart-item-${index}`}
                                        align="center"
                                        bg="whiteAlpha.100"
                                        p={3}
                                        borderRadius="xl"
                                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.12)" }}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 30 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            boxSize="60px"
                                            objectFit="cover"
                                            borderRadius="md"
                                            shadow="md"
                                        />
                                        <VStack align="start" spacing={0} flex={1}>
                                            <Text fontWeight="semibold" noOfLines={1}>
                                                {item.name}
                                            </Text>
                                            <Text fontSize="sm" color="teal.300">
                                                ${item.price.toFixed(2)}
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        <Button
                                            data-testid={`remove-cart-item-${index}`}
                                            size="sm"
                                            variant="ghost"
                                            colorScheme="red"
                                            _hover={{ bg: "red.500", color: "white" }}
                                            onClick={() => onRemove(item)}
                                        >
                                            Remove
                                        </Button>
                                    </MotionHStack>
                                ))}
                            </AnimatePresence>
                        </VStack>
                    )}
                </DrawerBody>

                <DrawerFooter
                    flexDirection="column"
                    alignItems="stretch"
                    borderTop="1px solid"
                    borderColor="whiteAlpha.200"
                    bg="gray.850"
                >
                    {cartItems.length > 0 && (
                        <>
                            <HStack w="100%" mb={4}>
                                <Text fontWeight="bold" fontSize="lg">
                                    Total
                                </Text>
                                <Spacer />
                                <MotionBox
                                    fontWeight="bold"
                                    fontSize="xl"
                                    color="teal.300"
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    ${total.toFixed(2)}
                                </MotionBox>
                            </HStack>

                            <Button
                                data-testid="checkout-button"
                                onClick={onSubmit}
                                isLoading={isLoading}
                                size="lg"
                                w="full"
                                bgGradient="linear(to-r, teal.400, blue.400)"
                                _hover={{
                                    bgGradient: "linear(to-r, teal.500, blue.500)",
                                    transform: "scale(1.03)",
                                }}
                                _active={{
                                    transform: "scale(0.98)",
                                }}
                                transition="all 0.2s"
                                color="white"
                                fontWeight="bold"
                                borderRadius="xl"
                            >
                                Checkout
                            </Button>
                        </>
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
