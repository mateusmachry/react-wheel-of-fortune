import { Gift } from "lucide-react";
import { useRef, useState } from "react";
import type { WheelOfFortunePrize } from "../../wheel-of-fortune/types/wheel-of-fortune-prize";
import { WheelOfFortune, type WheelOfFortuneRef } from "../../wheel-of-fortune/components/wheel-of-fortune";
import type { SVGProps } from "react";

type SpinButtonProps = React.ComponentProps<"button">;

function SpinButton({ ...props }: SpinButtonProps) {
    return (
        <button {...props} className="relative w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 shadow-2xl transform transition-all duration-200 hover:scale-110 hover:shadow-3xl active:scale-95 group cursor-pointer">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 animate-pulse opacity-75"></div>

            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 border-4 border-white shadow-inner flex items-center justify-center">
                <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-full opacity-30 blur-sm"></div>

                <div className="text-center">
                    <div className="text-white font-bold text-base tracking-wider drop-shadow-lg">SPIN</div>
                </div>

                <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-200 opacity-50 group-hover:animate-spin"></div>
            </div>

            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
        </button>
    )
}

export function PointerIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" fillRule="evenodd" d="M20.05 17.65a3 3 0 0 0 1.2-2.4v-11a3 3 0 0 0-3-3h-12a3 3 0 0 0-3 3v11a3 3 0 0 0 1.2 2.4l6 4.5a3 3 0 0 0 3.6 0z" clipRule="evenodd" /></svg>
    )
}

export function WheelOfFortune2() {
    const wheelPrizes: WheelOfFortunePrize[] = [
        {
            color: "#e74c3c",
            prize: <div className="flex flex-col items-center gap-2">
                <Gift className="size-8" />
                <span className="font-bold text-lg">Prize 1</span>
            </div>,
            key: "Prize 1",
            probability: 0.1
        },
        {
            color: "#f1c40f",
            prize: <div className="flex flex-col items-center gap-2">
                <Gift className="size-8" />
                <span className="font-bold text-lg">Prize 2</span>
            </div>,
            key: "Prize 2",
            probability: 0.1
        },
        {
            color: "#2ecc71",
            prize: <div className="flex flex-col items-center gap-2">
                <Gift className="size-8" />
                <span className="font-bold text-lg">Prize 3</span>
            </div>,
            key: "Prize 3",
            probability: 0.1
        },
        {
            color: "#3498db",
            prize: <div className="flex flex-col items-center gap-2">
                <Gift className="size-8" />
                <span className="font-bold text-lg">Prize 4</span>
            </div>,
            key: "Prize 4",
            probability: 0.6
        },
        {
            color: "#9b59b6",
            prize: <div className="flex flex-col items-center gap-2">
                <Gift className="size-8" />
                <span className="font-bold text-lg">Prize 5</span>
            </div>,
            key: "Prize 5",
            probability: 0.05
        },
        {
            color: "#1abc9c",
            prize: <div className="flex flex-col items-center gap-2">
                <Gift className="size-8" />
                <span className="font-bold text-lg">Prize 6</span>
            </div>,
            key: "Prize 6",
            probability: 0.05
        },
    ];
    const fortuneWheelRef = useRef<WheelOfFortuneRef>(null);
    const [prizeWinnerKey, setPrizeWinnerKey] = useState<string>("");

    return (
        <div className="h-full w-full flex flex-col gap-8 justify-center items-center">
            {prizeWinnerKey && <label className="font-bold text-2xl text-black">🎉 {prizeWinnerKey}</label>}
            <WheelOfFortune
                className="max-w-lg"
                ref={fortuneWheelRef}
                prizes={wheelPrizes}
                wheelPointer={<PointerIcon style={{ filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))' }} className="text-white size-12" />}
                wheelSpinButton={<SpinButton style={{ filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))' }} onClick={() => fortuneWheelRef.current?.spin()} />}
                onSpinStart={() => {
                    setPrizeWinnerKey("");
                }}
                onSpinEnd={(prize) => {
                    setPrizeWinnerKey(prize.key);
                }}
                animationDurationInMs={5000}
                useProbabilitiesToCalculateWinner={true} />
        </div>
    )
}