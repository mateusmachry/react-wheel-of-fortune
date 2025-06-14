import type { WheelOfFortunePrize } from "../types/wheel-of-fortune-prize";

export function generateWheelGradient(
    prizes: WheelOfFortunePrize[],
    wheelSegmentDegrees: number
): string {
    let conicGradientString = 'conic-gradient(';
    let currentDegree = 0;

    prizes.forEach((prize) => {
        const nextDegree = currentDegree + wheelSegmentDegrees;
        conicGradientString += `${prize.color} ${currentDegree}deg ${nextDegree}deg, `;
        currentDegree = nextDegree;
    });

    return conicGradientString.slice(0, -2) + ')';
}