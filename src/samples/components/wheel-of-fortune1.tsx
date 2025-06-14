import { useRef, useState } from "react";
import { Gift } from "lucide-react";
import type { SVGProps } from "react";
import type { WheelOfFortunePrize } from "../../wheel-of-fortune/types/wheel-of-fortune-prize";
import { WheelOfFortune, type WheelOfFortuneRef } from "../../wheel-of-fortune/components/wheel-of-fortune";

function PointerIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M10.708 2.372a2.4 2.4 0 0 0-.71.686l-4.892 7.26c-1.981 3.314-1.22 7.466 1.767 9.882c2.969 2.402 7.286 2.402 10.254 0c2.987-2.416 3.748-6.569 1.795-9.836l-4.919-7.306c-.722-1.075-2.192-1.376-3.295-.686" /></svg>
    )
}

type SpinButtonProps = React.ComponentProps<"button">;

function SpinButton({ ...props }: SpinButtonProps) {
    return (
        <button {...props} className="relative group cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-full shadow-2xl border-2 border-gray-500 transform transition-all duration-200 group-hover:scale-105 group-active:scale-95">
                <div className="absolute inset-2 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-full shadow-inner border border-gray-600">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-0.5 h-6 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-full shadow-sm transform -translate-y-2"></div>
                    </div>

                    <div className="absolute top-2 left-3 w-2 h-2 bg-gray-400 bg-opacity-40 rounded-full blur-sm"></div>

                    <div className="absolute bottom-2 right-3 w-1.5 h-1.5 bg-black bg-opacity-60 rounded-full blur-sm"></div>
                </div>

                <div className="absolute top-1 left-2 w-3 h-3 bg-gray-300 bg-opacity-30 rounded-full blur-sm"></div>
            </div>

            <div className="absolute inset-0 rounded-full bg-gray-400 opacity-0 group-active:opacity-20 group-active:animate-ping"></div>
        </button>
    )
};

export function WheelOfFortune1() {
    const wheelPrizes: WheelOfFortunePrize[] = [
        {
            color: "#ff2056",
            prize: <span className="font-bold text-lg">$ 5</span>,
            displayOrientation: 'horizontal',
            key: "$ 5",
        },
        {
            color: "#1abc9c",
            prize: <span className="font-bold text-lg">$ 500</span>,
            displayOrientation: 'horizontal',
            key: "$ 500",
        },
        {
            color: "#ff2056",
            prize: <div className="flex flex-row items-center gap-1.5">
                <Gift />
                <span className="font-bold text-lg">$ 15</span>
            </div>,
            displayOrientation: 'horizontal',
            key: "$ 15",
        },
        {
            color: "#1abc9c",
            prize: <span className="font-bold text-lg">$ 1500</span>,
            displayOrientation: 'horizontal',
            key: "$ 1500",
        },
        {
            color: "#ff2056",
            prize: <span className="font-bold text-lg">$ 30</span>,
            displayOrientation: 'horizontal',
            key: "$ 30",
        },
        {
            color: "#1abc9c",
            prize: <div className="flex flex-row items-center gap-1.5">
                <Gift />
                <span className="font-bold text-lg">$ 3000</span>
            </div>,
            displayOrientation: 'horizontal',
            key: "$ 3000",
        },
        {
            color: "#ff2056",
            prize: <span className="font-bold text-lg">$ 45</span>,
            displayOrientation: 'horizontal',
            key: "$ 45",
        },
        {
            color: "#1abc9c",
            prize: <span className="font-bold text-lg">$ 4500</span>,
            displayOrientation: 'horizontal',
            key: "$ 4500",
        },
        {
            color: "#ff2056",
            prize: <div className="flex flex-row items-center gap-1.5">
                <Gift />
                <span className="font-bold text-lg">$ 60</span>
            </div>,
            displayOrientation: 'horizontal',
            key: "$ 60",
        },
        {
            color: "#1abc9c",
            prize: <span className="font-bold text-lg">$ 6000</span>,
            displayOrientation: 'horizontal',
            key: "$ 6000",
        },
    ];
    const fortuneWheelRef = useRef<WheelOfFortuneRef>(null);
    const [prizeWinnerKey, setPrizeWinnerKey] = useState<string>("");

    return (
        <div className="w-full h-full flex flex-col gap-8 justify-center items-center">
            {prizeWinnerKey && <label className="font-bold text-2xl text-black">🎉 {prizeWinnerKey}</label>}
            <WheelOfFortune
                className="max-w-md"
                ref={fortuneWheelRef}
                prizes={wheelPrizes}
                wheelPointer={<PointerIcon style={{ filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))' }} className="text-gray-800 size-12 rotate-180 mt-[-16px]" />}
                wheelSpinButton={<SpinButton style={{ filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))' }} onClick={() => fortuneWheelRef.current?.spin()} />}
                onSpinStart={() => {
                    setPrizeWinnerKey("");
                }}
                onSpinEnd={(prize) => {
                    setPrizeWinnerKey(prize.key);
                }}
                wheelBorderColor="#364153"
                animationDurationInMs={5000}
                useProbabilitiesToCalculateWinner={false} />
        </div>
    )
}