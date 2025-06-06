

"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { status } from "@/contants/StatusValue";
import { updateOrder } from "@/services/OrderMangment";
import { useState } from "react";
import { toast } from "sonner";

const UpdateStatusByAdmin = ({ orders, onUpdate }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(orders?.status);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const orderId = orders?._id;


    const handleStatusSelect = async () => {
        setIsSubmitting(true);

        try {
            const update = await updateOrder({ status: selectedStatus }, orderId);

            if (update.success) {
                toast.success(update.message || 'Status updated successfully');
                setIsOpen(false);
                onUpdate();
            } else {
                toast.error(update.message || "Failed to update status, try again!");
            }
        } catch (error) {
            console.error("Update Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">{orders?.status}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Update Status</DialogTitle>
                        <DialogDescription>
                            Select dropdown to update status
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <Select
                            value={selectedStatus}
                            onValueChange={(status) => setSelectedStatus(status)}
                        >
                            <SelectTrigger className="mb-5 w-full">
                                <SelectValue placeholder={orders?.status} />
                            </SelectTrigger>
                            <SelectContent>
                                {status.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleStatusSelect} disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateStatusByAdmin;