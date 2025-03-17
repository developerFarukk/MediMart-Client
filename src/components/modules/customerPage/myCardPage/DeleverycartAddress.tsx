import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cities } from "@/contants/cities";
import { updateCity, updateShippingAddress } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";




const DeleverycartAddress = () => {


    const dispatch = useAppDispatch();

    const handleCitySelect = (city: string) => {
        dispatch(updateCity(city));
    };

    const handleShippingAddress = (address: string) => {
        dispatch(updateShippingAddress(address));
    };

    return (
        <div>
            <div className=''>
                <div className='mb-4 mt-9 w-full rounded-xl border bg-[#FAFAFA] p-5 text-lg font-semibold *:w-full md:w-80'>
                    <div className="flex flex-col justify-between h-full">
                        <h1 className="text-2xl font-bold">Shiping Address</h1>
                        <div className="mt-5">
                            <Select onValueChange={(city) => handleCitySelect(city)}>
                                <SelectTrigger className="mb-5 w-full">
                                    <SelectValue placeholder="Select a city" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cities.map((city) => (
                                        <SelectItem key={city} value={city}>
                                            {city}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <textarea
                            className="w-full border-2  rounded-lg font-normal p-1"
                                onChange={(e) => handleShippingAddress(e.target.value)}
                                rows={5}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DeleverycartAddress;
