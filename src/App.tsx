import { useState } from 'react';
import { WheelOfFortune1 } from './samples/components/wheel-of-fortune1'
import { WheelOfFortune2 } from './samples/components/wheel-of-fortune2';

function App() {
	const [selectedSample, setSelectedSample] = useState<'SAMPLE1' | 'SAMPLE2'>('SAMPLE1');

	return (
		<div className="bg-neutral-300 h-screen w-full flex flex-col justify-center items-center">
			<div className="flex flex-row items-center gap-4 mt-8">
				<button onClick={() => setSelectedSample('SAMPLE1')} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium">
					SAMPLE 1
				</button>
				<button onClick={() => setSelectedSample('SAMPLE2')} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium">
					SAMPLE 2
				</button>
			</div>
			{selectedSample === 'SAMPLE1' && <WheelOfFortune1 />}
			{selectedSample === 'SAMPLE2' && <WheelOfFortune2 />}
		</div>
	)
}

export default App
