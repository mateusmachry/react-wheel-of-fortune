/**
 * Represents a prize segment in the Wheel of Fortune
 * @type {WheelOfFortunePrize}
 * 
 * @property {string} key - Unique identifier for the prize segment
 * @property {React.ReactNode} prize - Content to be displayed in the prize segment
 * @property {string} color - Color of the prize segment in rgb, hsl, or hex format
 * @property {'horizontal' | 'vertical'} [displayOrientation] - Orientation of the prize content display
 * @property {number} [probability] - Probability weight of landing on this segment (0 to 1)
 */
export type WheelOfFortunePrize = {
	key: string
	prize: React.ReactNode
	color: `rgb(${number}, ${number}, ${number})` | `hsl(${number}, ${number}%, ${number}%)` | `#${string}`
	displayOrientation?: 'horizontal' | 'vertical'
	probability?: number
}