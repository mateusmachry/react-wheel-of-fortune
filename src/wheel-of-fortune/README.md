# React Wheel of Fortune 🎡

A customizable and lightweight Wheel of Fortune component for React.

## ✨ Features

* Fully customizable segments, colors, and content.
* Click-to-spin behavior with external control.
* Winner calculation based on random selection or prize probabilities.
* API for customization and event handling.


## 📦 Installation

```bash
npm i @matmachry/react-wheel-of-fortune
```

or

```bash
yarn add @matmachry/react-wheel-of-fortune
```


## 🎥 Live Example

Check out a live example of the component:

[Check Live Example](https://mateusmachry.github.io/react-wheel-of-fortune/)


## 🚀 Usage Example

Here's a basic example of how to implement and use the `WheelOfFortune` component.

```tsx
import { Gift } from "lucide-react";
import { useRef, useState } from "react";
import type { WheelOfFortunePrize } from "@matmachry/react-wheel-of-fortune";
import { WheelOfFortune, type WheelOfFortuneRef } from "@matmachry/react-wheel-of-fortune";
import type { SVGProps } from "react";

// Custom Spin Button component
type SpinButtonProps = React.ComponentProps<"button">;
function SpinButton({ ...props }: SpinButtonProps) {
    return (
        <button {...props} className="relative w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 shadow-2xl transform transition-all duration-200 hover:scale-110 active:scale-95 group cursor-pointer">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 animate-pulse opacity-75"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 border-4 border-white shadow-inner flex items-center justify-center">
                <div className="text-center">
                    <div className="text-white font-bold text-base tracking-wider drop-shadow-lg">SPIN</div>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-200 opacity-50 group-hover:animate-spin"></div>
            </div>
        </button>
    )
}

// Custom Pointer component
export function PointerIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
            <path fill="currentColor" fillRule="evenodd" d="M20.05 17.65a3 3 0 0 0 1.2-2.4v-11a3 3 0 0 0-3-3h-12a3 3 0 0 0-3 3v11a3 3 0 0 0 1.2 2.4l6 4.5a3 3 0 0 0 3.6 0z" clipRule="evenodd" />
        </svg>
    )
}

export function App() {
    const wheelPrizes: WheelOfFortunePrize[] = [
        {
            key: "Prize 1",
            color: "#e74c3c",
            prize: <div className="flex flex-col items-center gap-2"><Gift className="size-8" /><span className="font-bold text-lg">Prize 1</span></div>,
            probability: 0.1
        },
        {
            key: "Prize 2",
            color: "#f1c40f",
            prize: <div className="flex flex-col items-center gap-2"><Gift className="size-8" /><span className="font-bold text-lg">Prize 2</span></div>,
            probability: 0.1
        },
        {
            key: "Prize 3",
            color: "#2ecc71",
            prize: <div className="flex flex-col items-center gap-2"><Gift className="size-8" /><span className="font-bold text-lg">Prize 3</span></div>,
            probability: 0.1
        },
        {
            key: "Prize 4",
            color: "#3498db",
            prize: <div className="flex flex-col items-center gap-2"><Gift className="size-8" /><span className="font-bold text-lg">Prize 4</span></div>,
            probability: 0.6
        },
        {
            key: "Prize 5",
            color: "#9b59b6",
            prize: <div className="flex flex-col items-center gap-2"><Gift className="size-8" /><span className="font-bold text-lg">Prize 5</span></div>,
            probability: 0.05
        },
        {
            key: "Prize 6",
            color: "#1abc9c",
            prize: <div className="flex flex-col items-center gap-2"><Gift className="size-8" /><span className="font-bold text-lg">Prize 6</span></div>,
            probability: 0.05
        },
    ];
    const fortuneWheelRef = useRef<WheelOfFortuneRef>(null);
    const [prizeWinnerKey, setPrizeWinnerKey] = useState<string>("");

    return (
        <div className="h-full w-full flex flex-col gap-8 justify-center items-center bg-gray-100 p-4">
            {prizeWinnerKey && <h2 className="font-bold text-3xl text-gray-800">🎉 Winner: {prizeWinnerKey} 🎉</h2>}
            <WheelOfFortune
                className="max-w-lg"
                ref={fortuneWheelRef}
                prizes={wheelPrizes}
                wheelPointer={<PointerIcon style={{ filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))' }} className="text-white size-12" />}
                wheelSpinButton={<SpinButton style={{ filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3))' }} onClick={() => fortuneWheelRef.current?.spin()} />}
                onSpinStart={() => {
                    setPrizeWinnerKey("");
                    console.log("Spin started!");
                }}
                onSpinEnd={(prize) => {
                    setPrizeWinnerKey(prize.key);
                    console.log("Spin ended! Winner:", prize.key);
                }}
                animationDurationInMs={5000}
                useProbabilitiesToCalculateWinner={true}
            />
        </div>
    )
}
```

## ⚙️ API Reference

### Component Props (`WheelOfFortuneProps`)

| Prop                                | Type                                   | Required | Description                                                                                    | Default     |
| ----------------------------------- | -------------------------------------- | -------- | ---------------------------------------------------------------------------------------------- | ----------- |
| `prizes`                            | `WheelOfFortunePrize[]`                | Yes      | An array of prize objects to display on the wheel. See the `WheelOfFortunePrize` type below.   | `[]`        |
| `wheelPointer`                      | `React.ReactNode`                      | Yes      | A custom React component to use as the wheel's pointer.                                        | `null`      |
| `wheelSpinButton`                   | `React.ReactNode`                      | Yes      | A custom React component to use as the spin button. Use the ref to trigger the spin from it.   | `null`      |
| `onSpinEnd`                         | `(prize: WheelOfFortunePrize) => void` | Yes      | Callback that executes when the spinning animation ends. It receives the winning prize object. | `undefined` |
| `onSpinStart`                       | `() => void`                           | No       | Optional callback that executes as soon as the spinning animation starts.                      | `undefined` |
| `useProbabilitiesToCalculateWinner` | `boolean`                              | No       | If true, the winner is calculated based on the probability field of each prize.                | `false`     |
| `defaultWinnerKey`                  | `string`                               | No       | Optional key to force a specific prize to win, bypassing random/probability calculation.       | `undefined` |
| `animationDurationInMs`             | `number`                               | No       | Total duration of the spinning animation in milliseconds.                                      | `5000`      |
| `wheelRotationsCount`               | `number`                               | No       | Number of full rotations the wheel completes before stopping.                                  | `5`         |
| `wheelBorderColor`                  | `string` (CSS color)                   | No       | The color of the wheel's outer border.                                                         | `undefined` |
| `className`                         | `string`                               | No       | Optional CSS class name for custom styling.                                                    | `undefined` |


### Ref Handle (`WheelOfFortuneRef`)

You can access component methods using a ref.

| Method | Type         | Description                          |
| ------ | ------------ | ------------------------------------ |
| `spin` | `() => void` | Programmatically triggers the wheel. |


### Prize Object Type (`WheelOfFortunePrize`)

This is the shape of the objects you should provide in the `prizes` array.

| Property             | Type                         | Required | Description                                                                                                                                                            |
| -------------------- | ---------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`                | `string`                     | Yes      | A unique identifier for the prize segment.                                                                                                                             |
| `prize`              | `React.ReactNode`            | Yes      | Content to display in the prize segment. Can be a string or a complex React component.                                                                                 |
| `color`              | `string` (CSS color)         | Yes      | Background color for the prize segment.                                                                                                                                |
| `probability`        | `number`                     | No       | A number from 0 to 1 representing the probability of landing on this prize (used when `useProbabilitiesToCalculateWinner` is true). The total should ideally sum to 1. |
| `displayOrientation` | `'horizontal' \| 'vertical'` | No       | vertical.                                                                                |

---