import {
    Box,
    Text,
    VStack,
    HStack,
    Image,
    Divider,
    Badge,
    Spacer,
    Stack,
    Flex,
    Button,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useToast,
    Heading,
} from "@chakra-ui/react";
import type { Order } from "../@types/types";
import { Header } from "../components/header";
import { cancelOrder, clearOrders, fetchOrders } from "../utils/storage.utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export function Orders() {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const [selectedOrder, setSelectedOrder] = useState<Order>();
    const [cancelling, setCancelling] = useState(false);
    const [orders, setOrders] = useState<Order[]>(fetchOrders());
    const toast = useToast();

    const onClickCancel = (order: Order) => {
        setSelectedOrder(order);
        onOpen();
    };

    const onCancel = async () => {
        if (!selectedOrder) return;
        setCancelling(true);
        cancelOrder(selectedOrder);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const res = fetchOrders();
        setOrders(res);
        setCancelling(false);
        onClose();
        toast({
            title: "Order Cancelled :(",
            description: "Your order has been successfully cancelled.",
            status: "info",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
    };

    const onClearOrders = () => {
        clearOrders();
        const res = fetchOrders();
        setOrders(res);
    };

    useEffect(() => {
        const res = fetchOrders();
        setOrders(res);
    }, []);

    return (
        <>
            <Header />
            <Box
                minH="100vh"
                bgGradient="linear(to-br, gray.900, blue.900)"
                px={{ base: 4, md: 10 }}
                py={10}
            >
                <Box textAlign="center" mb={10}>
                    <Heading
                        size="2xl"
                        bgGradient="linear(to-r, teal.300, blue.400, purple.400)"
                        bgClip="text"
                        fontWeight="extrabold"
                    >
                        My Orders
                    </Heading>
                </Box>

                {orders.length === 0 ? (
                    <Text color="gray.400" textAlign="center" fontSize="lg" mt={20}>
                        You haven’t placed any orders yet.
                    </Text>
                ) : (
                    <VStack spacing={6} align="stretch">
                        {orders.map((order) => {
                            const total = order.items.reduce((sum, item) => sum + item.price, 0);
                            const isCancelled = order.status === "Cancelled";
                            const isApproved = order.status === "Approved";

                            return (
                                <MotionBox
                                    key={order.id}
                                    bg="whiteAlpha.100"
                                    border="1px solid"
                                    borderColor="whiteAlpha.200"
                                    borderRadius="xl"
                                    p={5}
                                    shadow="lg"
                                    transition={{ duration: 0.25 }}
                                >
                                    <HStack mb={3} align="start">
                                        <Text
                                            fontWeight="bold"
                                            fontSize="lg"
                                            color="white"
                                        >
                                            Order #{order.id}
                                        </Text>
                                        <Flex
                                            fontWeight="semibold"
                                            fontSize="sm"
                                            align="center"
                                            m={0}
                                            pt={.5}
                                        >
                                            <Text
                                                ml={2}
                                                color={
                                                    isApproved ? "teal.300" : isCancelled ? "red.400" : "yellow.300"
                                                }
                                            >
                                                {order.status}
                                            </Text>
                                        </Flex>
                                        <Spacer />
                                        <Badge
                                            colorScheme="blue"
                                            variant="subtle"
                                            fontSize="0.8em"
                                            px={2}
                                            py={1}
                                            borderRadius="md"
                                        >
                                            {new Date(order.date).toLocaleDateString()}
                                        </Badge>
                                    </HStack>

                                    <Divider mb={3} borderColor="whiteAlpha.300" />

                                    <VStack align="stretch" spacing={3}>
                                        {order.items.map((item) => (
                                            <HStack key={item.name} spacing={4}>
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    boxSize="60px"
                                                    objectFit="cover"
                                                    borderRadius="md"
                                                />
                                                <Stack spacing={0} flex={1}>
                                                    <Text fontWeight="medium" color="white" noOfLines={1}>
                                                        {item.name}
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.400">
                                                        ${item.price.toFixed(2)}
                                                    </Text>
                                                </Stack>
                                            </HStack>
                                        ))}
                                    </VStack>

                                    <Divider my={4} borderColor="whiteAlpha.300" />

                                    <HStack>
                                        {!isCancelled && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                colorScheme="red"
                                                onClick={() => onClickCancel(order)}
                                                _hover={{ bg: "red.500", color: "white" }}
                                            >
                                                Cancel Order
                                            </Button>
                                        )}
                                        <Spacer />
                                        <Text fontWeight="bold" color="white">
                                            Total
                                        </Text>
                                        <Text fontWeight="bold" color="teal.300">
                                            ${total.toFixed(2)}
                                        </Text>
                                    </HStack>
                                </MotionBox>
                            );
                        })}
                    </VStack>
                )}
                {orders.length > 0 && <Button colorScheme="red" onClick={onClearOrders} mt={5}>Clear Orders</Button>}
            </Box>

            {selectedOrder && (
                <CancelModal
                    isOpen={isOpen}
                    onClose={onClose}
                    cancelling={cancelling}
                    onCancel={onCancel}
                />
            )}
        </>
    );
}

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    cancelling: boolean;
    onCancel: () => Promise<void>;
};

const CancelModal = ({ isOpen, onClose, cancelling, onCancel }: ModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
            <ModalContent
                bg="gray.800"
                color="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.300"
            >
                <ModalHeader fontWeight="bold" color="red.300">
                    Cancel Order
                </ModalHeader>
                <ModalCloseButton />

                {!cancelling ? (
                    <>
                        <ModalBody>
                            <Text>Are you sure you want to cancel this order?</Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr="auto" onClick={onClose} variant="ghost" colorScheme="teal">
                                No, Keep It
                            </Button>
                            <Button colorScheme="red" onClick={onCancel}>
                                Yes, Cancel
                            </Button>
                        </ModalFooter>
                    </>
                ) : (
                    <Box p={10} textAlign="center">
                        <Spinner size="lg" color="teal.300" />
                    </Box>
                )}
            </ModalContent>
        </Modal>
    );
};
