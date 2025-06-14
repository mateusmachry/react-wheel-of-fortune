import { forwardRef, useImperativeHandle } from "react";
import { twMerge } from "tailwind-merge";
import { generateWheelGradient } from "../utils/wheel-gradient";
import { useWheelSpin } from "../hooks/use-wheel-spin";
import type { WheelOfFortunePrize } from "../types/wheel-of-fortune-prize";

/**
 * Props for the Wheel of Fortune component
 * @type {WheelOfFortuneProps}
 * 
 * @property {WheelOfFortunePrize[]} prizes - Array of prizes to display on the wheel
 * @property {React.ReactNode} wheelPointer - Custom wheel pointer component
 * @property {React.ReactNode} wheelSpinButton - Custom button component to trigger the wheel spin
 * @property {(prize: WheelOfFortunePrize) => void} onSpinEnd - Callback function executed when spinning animation ends
 * @property {() => void} [onSpinStart] - Optional callback function executed when spinning starts
 * @property {string} [wheelBorderColor] - Optional color for the wheel border. Accepts RGB, HSL, or HEX format
 * @property {number} [animationDurationInMs=5000] - Optional duration of spinning animation in milliseconds. Default: 5000
 * @property {number} [wheelRotationsCount=5] - Optional number of full rotations before stopping. Default: 5
 * @property {boolean} [useProbabilitiesToCalculateWinner=false] - Optional flag to use prize probabilities for winner calculation. Default: false
 * @property {string} [defaultWinnerKey] - Optional key to force a specific prize to win
 * @property {string} [className] - Optional CSS class name for styling
 */
export type WheelOfFortuneProps = {
    prizes: WheelOfFortunePrize[]
    wheelPointer: React.ReactNode
    wheelSpinButton: React.ReactNode
    onSpinEnd: (prize: WheelOfFortunePrize) => void
    onSpinStart?: () => void
    wheelBorderColor?: `rgb(${number}, ${number}, ${number})` | `hsl(${number}, ${number}%, ${number}%)` | `#${string}`
    animationDurationInMs?: number
    wheelRotationsCount?: number
    useProbabilitiesToCalculateWinner?: boolean
    defaultWinnerKey?: string
    className?: string
};

/**
 * Interface representing the exposed ref methods for the Wheel of Fortune component.
 * 
 * @interface WheelOfFortuneRef
 * 
 * @property {() => void} spin - Method to trigger the wheel spinning animation.
 */
export interface WheelOfFortuneRef {
    spin: () => void
};

export const WheelOfFortune = forwardRef<WheelOfFortuneRef, WheelOfFortuneProps>((props, ref) => {
    const {
        prizes,
        wheelPointer,
        wheelSpinButton,
        onSpinEnd,
        onSpinStart = () => { },
        wheelBorderColor = "#FFFFFF",
        animationDurationInMs = 5000,
        wheelRotationsCount = 5,
        useProbabilitiesToCalculateWinner = false,
        defaultWinnerKey = "",
        className
    } = props;

    const wheelSegmentDegrees = prizes.length > 0 ? parseFloat((360 / prizes.length).toFixed(4)) : 0;
    const animationDurationInSeconds = Math.round(animationDurationInMs / 1000);
    const wheelGradient = generateWheelGradient(prizes, wheelSegmentDegrees);
    const { rotation, skipWheelAnimation, spin } = useWheelSpin(
        prizes,
        onSpinStart,
        onSpinEnd,
        animationDurationInMs,
        wheelRotationsCount,
        useProbabilitiesToCalculateWinner,
        defaultWinnerKey
    );

    useImperativeHandle(ref, () => ({
        spin,
    }));

    return (
        <div className={twMerge("relative max-w-96 w-full flex flex-col justify-center items-center", className)}>
            <div className="relative w-full aspect-square">
                {wheelPointer && <div className="absolute top-[-4px] left-[50%] translate-x-[-50%] z-10">
                    {wheelPointer}
                </div>}
                <div
                    className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[50%] border-10"
                    style={{
                        boxShadow: 'box-shadow: 0 0 20px rgba(0, 0, 0, 0.25), inset 0 0 10px rgba(0, 0, 0, 0.3)',
                        borderColor: wheelBorderColor,
                        background: wheelGradient,
                        transform: `rotate(${rotation}deg)`,
                        transition: skipWheelAnimation ? 'none' : `transform ${animationDurationInSeconds}s ease-out`
                    }}
                >
                    {prizes.map((item, index) => (
                        <div
                            key={item.key}
                            className="absolute top-0 left-0 w-full h-full origin-center flex justify-center text-center"
                            style={{
                                transform: `rotate(${wheelSegmentDegrees * index + wheelSegmentDegrees / 2}deg)`
                            }}
                        >
                            <div
                                style={{ rotate: item.displayOrientation === 'horizontal' ? '270deg' : '0deg', top: item.displayOrientation === 'horizontal' ? '15%' : '10%' }}
                                className="absolute overflow-hidden text-ellipsis"
                            >
                                {item.prize}
                            </div>
                        </div>
                    ))}
                </div>
                {wheelSpinButton && <div className="absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center">
                    {wheelSpinButton}
                </div>}
            </div>
        </div>
    );
});

WheelOfFortune.displayName = "WheelOfFortune";