


"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SubsCriber = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            try {
                setIsSubmitted(true);
                toast.success('Subscribed Successfully');
                // Uncomment when ready to use
                // const result = await addNewsLetter(email);
                // if (result.success) {
                //     setIsSubmitted(true);
                // } else {
                //     console.error(result.message);
                // }
            } catch (error) {
                console.error("Failed to submit:", error);
            }
        }
    };

    return (
        <section className="py-12 md:py-16 lg:py-20 ">
            <div className="container px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        {/* Visual Section */}
                        <div className="hidden md:flex bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-8 items-center justify-center">
                            <div className="text-center space-y-4">
                                <Mail className="h-16 w-16 mx-auto text-primary" strokeWidth={1.5} />
                                <h3 className="text-2xl font-bold text-gray-800">Stay Informed</h3>
                                <p className="text-gray-600">Get exclusive access to our latest products and health tips</p>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="p-8 md:p-10">
                            {isSubmitted ? (
                                <div className="text-center py-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                                    <p className="text-gray-600 mb-6">
                                        You're now subscribed to our newsletter.
                                    </p>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setEmail("");
                                        }}
                                        className="mt-4"
                                    >
                                        Subscribe Another Email
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center md:text-left mb-8">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                            Join Our Newsletter
                                        </h2>
                                        <p className="text-gray-600">
                                            Get updates on new medicines, health tips, and exclusive offers.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-4">
                                            <Input
                                                type="email"
                                                placeholder="Your email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-12 text-base"
                                                required
                                            />
                                            <Button 
                                                type="submit" 
                                                size="lg" 
                                                className="w-full bg-gradient-to-r from-green-300 to-green-100 hover:from-green-400 hover:to-green-600 text-black hover:text-white"
                                            >
                                                Subscribe Now
                                            </Button>
                                        </div>
                                        <p className="text-xs text-gray-500 text-center">
                                            We respect your privacy. Unsubscribe at any time.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubsCriber;