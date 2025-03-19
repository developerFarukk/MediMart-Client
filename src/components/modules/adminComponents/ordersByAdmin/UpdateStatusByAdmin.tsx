

// "use client";

// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { status } from "@/contants/StatusValue";
// import { updateOrder } from "@/services/OrderMangment";
// import { TExtraError } from "@/types/global";
// import { useState } from "react";
// import { toast } from "sonner";

// const UpdateStatusByAdmin = ({ orders }: any) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedStatus, setSelectedStatus] = useState(orders?.status);

//     const orderId = orders?._id;

//     const handleCitySelect = async () => {
//         try {

//             const update = await updateOrder({ status: selectedStatus }, orderId);

//             if (update.success) {
//                 toast.success('Order status updated successfully');
//             } else {
//                 toast.error("update faild, try again!")
//             }
//             setIsOpen(false);
//         } catch (error) {
//             console.error("Update Error:", error);
//             toast.error((error as TExtraError)?.data?.message || 'Failed to update order status');
//         }
//     };

//     return (
//         <div>

//             <Dialog open={isOpen} onOpenChange={setIsOpen}>
//                 <DialogTrigger asChild>
//                     <Button variant="outline">{orders?.status}</Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-md">
//                     <DialogHeader>
//                         <DialogTitle>Update Status</DialogTitle>
//                         <DialogDescription>
//                             Select dropdown to update status
//                         </DialogDescription>
//                     </DialogHeader>
//                     <div className="flex items-center space-x-2">
//                         <Select
//                             value={selectedStatus} 
//                             onValueChange={(status) => setSelectedStatus(status)} 
//                         >
//                             <SelectTrigger className="mb-5 w-full">
//                                 <SelectValue placeholder={orders?.status} />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {status.map((status) => (
//                                     <SelectItem key={status} value={status}>
//                                         {status}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div className="flex justify-end">
//                         <Button onClick={handleCitySelect}>Submit</Button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default UpdateStatusByAdmin;



"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { status } from "@/contants/StatusValue";
import { updateOrder } from "@/services/OrderMangment";
import { TExtraError } from "@/types/global";
import { useState } from "react";
import { toast } from "sonner";

const UpdateStatusByAdmin = ({ orders }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(orders?.status);

    const orderId = orders?._id;

    const handleCitySelect = async () => {
        try {
            const update = await updateOrder({ status: selectedStatus }, orderId);

            if (update.success) {
                toast.success(update.message || 'Order status updated successfully');
            } else {
                toast.error(update.message || "Update failed, try again!");
            }
            setIsOpen(false);
        } catch (error) {
            console.error("Update Error:", error);
            toast.error((error as TExtraError)?.data?.message || 'Failed to update order status');
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
                        <Button onClick={handleCitySelect}>Submit</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateStatusByAdmin;