
import Image from "next/image";
import medimart from '@/assets/nextmart.png';

interface TTitle {
    title: string;
}

const TitleMedicin = ({title}: TTitle ) => {

    return (
        <div>
            <div className="flex items-center justify-center space-x-4 p-4 mb-4">
                <Image src={medimart} height={40} width={40} alt="medimart" />
                <div>
                    <h1 className="text-xl font-semibold">{title}</h1>
                </div>
            </div>
        </div>
    );
};

export default TitleMedicin;
