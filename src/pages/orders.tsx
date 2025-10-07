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
} from "@chakra-ui/react";
import type { Order } from "../@types/types";
import { Header } from "../components/header";
import { cancelOrder, fetchOrders } from "../utils/storage.utils";
import { useEffect, useState } from "react";

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
        if (!selectedOrder) {
            return;
        }
        setCancelling(true);
        cancelOrder(selectedOrder);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const res = fetchOrders();
        setOrders(res);
        setCancelling(false);
        onClose();
        toast({
            title: "Order Cancelled :(",
            description: "Your order has been cancelled",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
        });
    };

    useEffect(() => {
        const res = fetchOrders();
        setOrders(res);
    }, []);

    return (
        <>
            <Header />
            <Box p={6}>
                <Text fontSize="3xl" fontWeight="bold" mb={6}>
                    My Orders
                </Text>

                {orders.length === 0 ? (
                    <Text color="gray.500" textAlign="center">
                        You haven't placed any orders yet.
                    </Text>
                ) : (
                    <VStack spacing={6} align="stretch">
                        {orders.map((order) => {
                            const total = order.items.reduce((sum, item) => sum + item.price, 0);
                            return (
                                <Box
                                    key={order.id}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    shadow="sm"
                                    bg="white"
                                    p={4}
                                >
                                    <HStack mb={2} align="start">
                                        <Text fontWeight="bold">Order #{order.id} - </Text>
                                        <Flex fontWeight="bold">
                                            Status:
                                            <Text
                                                ml={2}
                                                color={order.status === "Approved" ? "teal" : "red"}
                                            >
                                                {order.status}
                                            </Text>
                                        </Flex>
                                        <Spacer />
                                        <Badge colorScheme="blue">
                                            {new Date(order.date).toLocaleDateString()}
                                        </Badge>
                                    </HStack>

                                    <Divider mb={3} />

                                    <VStack align="stretch" spacing={3}>
                                        {order.items.map((item) => (
                                            <HStack key={item.name}>
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    boxSize="60px"
                                                    objectFit="cover"
                                                    borderRadius="md"
                                                />
                                                <Stack spacing={0} flex={1}>
                                                    <Text fontWeight="medium" noOfLines={1}>
                                                        {item.name}
                                                    </Text>
                                                    <Text fontSize="sm" color="gray.600">
                                                        ${item.price.toFixed(2)}
                                                    </Text>
                                                </Stack>
                                            </HStack>
                                        ))}
                                    </VStack>

                                    <Divider my={3} />

                                    <HStack>
                                        {order.status !== "Cancelled" && (
                                            <Button onClick={() => onClickCancel(order)}>Cancel</Button>
                                        )}
                                        <Spacer />
                                        <Text fontWeight="bold">Total</Text>
                                        <Text fontWeight="bold">${total.toFixed(2)}</Text>
                                    </HStack>
                                </Box>
                            );
                        })}
                    </VStack>
                )}
            </Box>
            {selectedOrder && <CancelModal
                isOpen={isOpen}
                onClose={onClose}
                cancelling={cancelling}
                onCancel={onCancel}
            />}

        </>
    );
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    cancelling: boolean;
    onCancel: () => Promise<void>;
};

const CancelModal = ({
    isOpen,
    onClose,
    cancelling,
    onCancel
}: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cancel Order</ModalHeader>
                <ModalCloseButton />
                {!cancelling ? <>
                    <ModalBody>
                        <Text>Are you sure you want to cancel this order?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="teal" variant="solid" mr={'auto'} onClick={onClose}>
                            No, Keep My Order
                        </Button>
                        <Button colorScheme="red" onClick={onCancel}>
                            Cancel Order
                        </Button>
                    </ModalFooter>
                </> : <Box p={10}><Spinner /></Box>}
            </ModalContent>
        </Modal>
    )
}
