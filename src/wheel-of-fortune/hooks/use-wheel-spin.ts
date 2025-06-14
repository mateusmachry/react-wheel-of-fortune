import { useEffect, useRef, useState, useTransition } from "react";
import { getFixedPrizeWinner, getRandomPrizeWinner, getWeightedPrizeWinner } from "../utils/get-prize-winner";
import type { WheelOfFortunePrize } from "../types/wheel-of-fortune-prize";

export function useWheelSpin(
    prizes: WheelOfFortunePrize[],
    onSpinStart: () => void,
    onSpinEnd: (prize: WheelOfFortunePrize) => void,
    animationDurationInMs: number,
    wheelRotationsCount: number,
    useProbabilitiesToCalculateWinner: boolean,
    defaultWinnerKey: string
) {
    const [, startTransition] = useTransition();
    const [isSpinning, setIsSpinning] = useState<boolean>(false);
    const [rotation, setRotation] = useState<number>(0);
    const [skipWheelAnimation, setSkipWheelAnimation] = useState<boolean>(false);
    const winnerRef = useRef<WheelOfFortunePrize>(null);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isSpinning) {
            setSkipWheelAnimation(true);
            setRotation(0);
            startTransition(() => {
                setSkipWheelAnimation(false);
                calculateSpinParameters();
                timeout = setTimeout(() => {
                    setIsSpinning(false);
                    if (winnerRef.current) {
                        onSpinEnd(winnerRef.current);
                    }
                }, animationDurationInMs);
                if (onSpinStart) onSpinStart();
            });
        }
        return () => {
            clearTimeout(timeout);
        }
    }, [isSpinning]);

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
    };

    const getPrizeWinner = (): [number, WheelOfFortunePrize | null] => {
        if (defaultWinnerKey) {
            return getFixedPrizeWinner(defaultWinnerKey, prizes);
        }
        if (useProbabilitiesToCalculateWinner) {
            return getWeightedPrizeWinner(prizes);
        }
        return getRandomPrizeWinner(prizes);
    };

    const calculateSpinParameters = () => {
        const [winnerIndex, prize] = getPrizeWinner();
        winnerRef.current = prize;
        const fullRotations = 360 * wheelRotationsCount;
        const wheelSegmentDegrees = prizes.length > 0 ? parseFloat((360 / prizes.length).toFixed(4)) : 0;
        const safeZoneMargin = wheelSegmentDegrees * 0.10;
        const randomOffset = Math.random() * (wheelSegmentDegrees - (safeZoneMargin * 2)) + safeZoneMargin;
        const baseAngle = winnerIndex * wheelSegmentDegrees;
        const targetAngle = baseAngle + randomOffset;
        const finalRotation = -(fullRotations + targetAngle);
        setRotation(finalRotation);
    };

    return {
        rotation,
        skipWheelAnimation,
        spin,
    };
}