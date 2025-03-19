

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// import medimart from "@/assets/nextmart.png";

type OrderData = {
    order_id: string;
    currency: string;
    amount: number;
    bank_status: string;
    date_time: string;
    bank_trx_id: string;
    invoice_no: string;
    name: string;
    email: string;
    phone_no: string;
};

type DownloadRiciptProps = {
    orderData: OrderData;
};

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 40,
        fontFamily: "Helvetica",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 50,
    },
    companyInfo: {
        textAlign: "right",
    },
    companyName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2c3e50",
    },
    companyAddress: {
        fontSize: 10,
        color: "#666666",
    },
    receiptTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#2c3e50",
    },
    section: {
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#34495e",
    },
    value: {
        fontSize: 12,
        marginBottom: 10,
        color: "#2c3e50",
    },
    footer: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 10,
        color: "#666666",
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#bdc3c7",
        marginVertical: 10,
    },
    watermark: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        opacity: 0.1,
        fontSize: 48,
        color: "#bdc3c7",
        fontWeight: "bold",
    },
});

const DownloadRicipt = ({ orderData }: DownloadRiciptProps) => (
    
    
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Watermark */}
            <Text style={styles.watermark}>Madi Mart</Text>

            {/* Header Section */}
            <View style={styles.header}>
                {/* <Image
                    style={styles.logo}
                    src={medimart}
                    // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Eci_G5GQWQXmdlzFaSJv9i9Fg1bfT1nv9A&s"
                    alt="Recipt"
                /> */}
                <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>Madi Mart</Text>
                    <Text style={styles.companyAddress}>
                        Sylhet, Dhaka - 1270, Bangladesh
                    </Text>
                </View>
            </View>

            {/* Receipt Title */}
            <Text style={styles.receiptTitle}>Order Receipt</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Order Details */}
            <View style={styles.section}>
                <Text style={styles.label}>Order ID:</Text>
                <Text style={styles.value}>{orderData?.order_id}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Amount:</Text>
                <Text style={styles.value}>
                    {/* {orderData?.currency} {orderData?.amount.toFixed(2)} */}
                    {orderData?.currency} {orderData?.amount.toFixed(2)}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{orderData?.bank_status}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>
                    {new Date(orderData?.date_time || "").toLocaleString()}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Transaction ID:</Text>
                <Text style={styles.value}>{orderData?.bank_trx_id}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Invoice No:</Text>
                <Text style={styles.value}>{orderData?.invoice_no}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{orderData?.name}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{orderData?.email}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{orderData?.phone_no}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Footer Section */}
            <View style={styles.footer}>
                <Text>Thank you for your purchase!</Text>
                <Text>For any queries, contact us at support@madimart.com</Text>
            </View>
        </Page>
    </Document>
);

export default DownloadRicipt;