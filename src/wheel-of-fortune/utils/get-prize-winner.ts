import type { WheelOfFortunePrize } from "../types/wheel-of-fortune-prize";

export const getFixedPrizeWinner = (prizeWinnerKey: string, prizes: WheelOfFortunePrize[]): [number, WheelOfFortunePrize | null] => {
    const winnerIndex = prizes.findIndex((entry) => entry.key === prizeWinnerKey);
    if (winnerIndex > -1) {
        return [winnerIndex, prizes[winnerIndex]];
    }
    return [-1, null];
}

export const getWeightedPrizeWinner = (prizes: WheelOfFortunePrize[]): [number, WheelOfFortunePrize | null] => {
    const probabilitySum = prizes.reduce((sum, prize) => sum + (prize.probability || 0), 0);
    if (Math.abs(probabilitySum - 1) < 0.0001) {
        const random = Math.random();
        let accumulatedProbability = 0;
        for (let i = 0; i < prizes.length; i++) {
            accumulatedProbability += prizes[i].probability || 0;
            if (random <= accumulatedProbability) {
                return [i, prizes[i]];
            }
        }
    }
    return [-1, null];
}

export const getRandomPrizeWinner = (prizes: WheelOfFortunePrize[]): [number, WheelOfFortunePrize | null] => {
    const winnerIndex = Math.floor(Math.random() * prizes.length);
    const winner = prizes[winnerIndex];
    return [winnerIndex, winner];
}