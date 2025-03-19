import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface TTolls {
    title: string| number;
    tole: string;
}

const ToolTipePage = ({title, tole}: TTolls) => {

    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {/* <Button variant="outline">Hover</Button> */}
                        <div className="px-4 py-2 font-medium whitespace-nowrap hover:text-blue-500">{title}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{tole}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default ToolTipePage;
