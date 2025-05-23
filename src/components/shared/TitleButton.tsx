
"use client"


interface TTitle {
    title: string;
}

const TitleButton = ({title}: TTitle) => {

    return (
        <div>
            <div className="text-center">
                <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default TitleButton;
