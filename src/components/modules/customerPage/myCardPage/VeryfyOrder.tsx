

"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { veryfyOrder } from "@/services/OrderMangment";
import Link from "next/link";
import DownloadRicipt from "@/components/shared/DownloadRicipt";
import { useSearchParams } from "next/navigation";

export interface OrderData {
    id: number;
    order_id: string;
    currency: string;
    amount: number;
    payable_amount: number;
    discsount_amount: number | null;
    disc_percent: number;
    received_amount: string;
    usd_amt: number;
    usd_rate: number;
    is_verify: number;
    card_holder_name: string | null;
    card_number: string | null;
    phone_no: string;
    bank_trx_id: string;
    invoice_no: string;
    bank_status: string;
    customer_order_id: string;
    sp_code: string;
    sp_message: string;
    name: string;
    email: string;
    address: string;
    city: string;
    value1: string | null;
    value2: string | null;
    value3: string | null;
    value4: string | null;
    transaction_status: string | null;
    method: string;
    date_time: string | undefined
}

const VerifyOrder = () => {
    const searchParams = useSearchParams();
    const order_id = searchParams.get("order_id");

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<OrderData | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setIsLoading(true);
                const response = await veryfyOrder(order_id || "");
                console.log(response);

                setData(response.data?.[0]);
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (order_id) {
            fetchOrder();
        }
    }, [order_id]);

    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-2 gap-2">
                            <dt className="font-semibold">Order ID:</dt>
                            <dd>{data?.order_id}</dd>
                            <dt className="font-semibold">Amount:</dt>
                            <dd>
                                {data?.currency} {data?.amount?.toFixed(2)}
                            </dd>
                            <dt className="font-semibold">Status:</dt>
                            <dd>
                                <Badge
                                    variant={
                                        data?.bank_status === "Success"
                                            ? "default"
                                            : "destructive"
                                    }
                                >
                                    {data?.bank_status}
                                </Badge>
                            </dd>
                            <dt className="font-semibold">Date:</dt>
                            <dd>{new Date(data?.date_time || "")?.toLocaleString()}</dd>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-2 gap-2">
                            <dt className="font-semibold">Method:</dt>
                            <dd>{data?.method}</dd>
                            <dt className="font-semibold">Transaction ID:</dt>
                            <dd>{data?.bank_trx_id}</dd>
                            <dt className="font-semibold">Invoice No:</dt>
                            <dd>{data?.invoice_no}</dd>
                            <dt className="font-semibold">SP Code:</dt>
                            <dd>{data?.sp_code}</dd>
                            <dt className="font-semibold">SP Message:</dt>
                            <dd>{data?.sp_message}</dd>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-2 gap-2">
                            <dt className="font-semibold">Name:</dt>
                            <dd>{data?.name}</dd>
                            <dt className="font-semibold">Email:</dt>
                            <dd>{data?.email}</dd>
                            <dt className="font-semibold">Phone:</dt>
                            <dd>{data?.phone_no}</dd>
                            <dt className="font-semibold">Address:</dt>
                            <dd>{data?.address}</dd>
                            <dt className="font-semibold">City:</dt>
                            <dd>{data?.city}</dd>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Verification Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            {data?.is_verify === 1 ? (
                                <>
                                    <CheckCircle className="text-green-500" />
                                    <span>Verified</span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="text-yellow-500" />
                                    <span>Not Verified</span>
                                </>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-4">
                        <PDFDownloadLink
                            document={<DownloadRicipt orderData={data!} />}
                            fileName={`receipt_${data?.order_id}.pdf`}
                        >
                            {({ loading }) =>
                                loading ? (
                                    <Button disabled>Generating Receipt...</Button>
                                ) : (
                                    <Button>Download Receipt</Button>
                                )
                            }
                        </PDFDownloadLink>

                        <Link href="/">
                            <Button className="w-full">Back to Home</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default VerifyOrder;