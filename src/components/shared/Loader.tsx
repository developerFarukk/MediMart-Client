import Image from "next/image";
import medimart from '@/assets/nextmart.png';




const Loader = () => {

    return (
        <div className="min-h-screen">
            <div className="flex justify-center text-center items-center p-1 mt-8">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
                        <Image src={medimart} height={40} width={40} alt="medimart" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
