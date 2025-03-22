
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateOrder } from "@/services/OrderMangment";
import { toast } from "sonner";
import { approvalStatus } from "@/contants/StatusValue";

const UpdateimageApproved = ({ orders, onUpdate }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(orders?.prescriptionStatus);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const orderId = orders?._id;

    const handleStatusSelect = async () => {
        setIsSubmitting(true); 

        try {
            const update = await updateOrder({ prescriptionStatus: selectedStatus }, orderId);

            if (update.success) {
                toast.success(update.message || 'Prescription status updated successfully');
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
                    <Button variant="outline">{orders?.prescriptionStatus}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader >
                        <DialogTitle className="text-center">Image Approval Update</DialogTitle>
                        <DialogDescription className="text-center">
                            Select dropdown to update status
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <Select
                            value={selectedStatus}
                            onValueChange={(value) => setSelectedStatus(value)}
                        >
                            <SelectTrigger className="mb-5 w-full">
                                <SelectValue placeholder={orders?.prescriptionStatus} />
                            </SelectTrigger>
                            <SelectContent>
                                {approvalStatus.map((status) => (
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

export default UpdateimageApproved;
