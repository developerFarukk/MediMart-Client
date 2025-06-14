


"use client";

import TitleButton from "@/components/shared/TitleButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

const FaqComponent = () => {
    const faqs = [
        {
            id: "item-1",
            question: "How do I order prescription medicines?",
            answer: "To order prescription medicines, you need to upload a valid prescription from a registered medical practitioner during checkout. Our team will verify the prescription before processing your order."
        },
        {
            id: "item-2",
            question: "What is your delivery time?",
            answer: (
                <>
                    Delivery times vary by location:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Metro cities: 24-48 hours</li>
                        <li>Other cities: 2-4 days</li>
                        <li>Remote areas: 4-7 days</li>
                    </ul>
                    Prescription verification may add 6-12 hours to these times.
                </>
            )
        },
        {
            id: "item-3",
            question: "Are generic medicines safe?",
            answer: "Yes, all generic medicines sold on our platform are approved by the relevant health authorities and contain the same active ingredients as their brand-name counterparts. They undergo the same quality checks and are equally effective."
        },
        {
            id: "item-4",
            question: "Can I return medicines?",
            answer: "Due to health and safety regulations, we cannot accept returns of medicines unless they were damaged during delivery or incorrectly shipped. In such cases, please contact our support team within 24 hours of delivery with photos of the issue."
        },
        {
            id: "item-5",
            question: "How do I contact customer support?",
            answer: (
                <>
                    Our customer support is available 24/7 through:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Phone: 1800-XXX-XXXX (toll-free)</li>
                        <li>Email: support@yourpharmacy.com</li>
                        <li>Live chat on our website/app</li>
                        <li>WhatsApp: +91 XXXXX XXXXX</li>
                    </ul>
                    For medicine-related emergencies, please call directly.
                </>
            )
        },
        {
            id: "item-6",
            question: "Do you offer emergency delivery?",
            answer: "Yes, we offer emergency delivery for critical medicines within 6-12 hours in metro cities. This service is available 24/7 with an additional charge. Please call our emergency helpline for immediate assistance."
        },
        {
            id: "item-7",
            question: "How do I track my order?",
            answer: "You can track your order by logging into your account and visiting the 'My Orders' section. We'll also send you SMS/email updates at each stage of your delivery. For real-time tracking, use the link provided in your confirmation message."
        },
        {
            id: "item-8",
            question: "What payment methods do you accept?",
            answer: (
                <>
                    We accept various payment methods:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Credit/Debit cards</li>
                        <li>UPI payments (PhonePe, GPay, etc.)</li>
                        <li>Net banking</li>
                        <li>Cash on Delivery (available for non-prescription orders only)</li>
                        <li>Wallet payments (Paytm, Amazon Pay, etc.)</li>
                    </ul>
                </>
            )
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Title */}
            <div className="text-center mb-10">
                <TitleButton title="Frequently Asked Questions" />
                <p className="mt-4 text-lg text-gray-600">
                    Find answers to common questions about ordering medicines on our platform
                </p>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={faq.id}
                            value={faq.id}
                            className={index !== faqs.length - 1 ? "border-b border-gray-100" : ""}
                        >
                            <AccordionTrigger className="px-6 py-4 hover:no-underline text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-6 py-4 text-gray-600">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Additional Help */}
            <div className="mt-10 text-center">
                <p className="text-gray-600 mb-4">
                    Still have questions?
                </p>
                <Link href="#contact" >
                    <button className=" mr-2 w-fit rounded-[4px] border px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm uppercase leading-4 shadow-md sm:shadow-xl duration-300   backdrop-blur-sm transition-all bg-green-300 text-black hover:bg-green-500">
                        Contact Support
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FaqComponent;