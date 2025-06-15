import { useState } from 'react';
import { WheelOfFortune1 } from './examples/components/wheel-of-fortune1'
import { WheelOfFortune2 } from './examples/components/wheel-of-fortune2';

function App() {
	const [selectedExample, setSelectedExample] = useState<'EXAMPLE1' | 'EXAMPLE2'>('EXAMPLE1');

	return (
		<div className="bg-neutral-300 h-screen w-full flex flex-col justify-center items-center">
			<div className="flex flex-row items-center gap-4 mt-8">
				<button onClick={() => setSelectedExample('EXAMPLE1')} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium">
					EXAMPLE 1
				</button>
				<button onClick={() => setSelectedExample('EXAMPLE2')} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium">
					EXAMPLE 2
				</button>
			</div>
			{selectedExample === 'EXAMPLE1' && <WheelOfFortune1 />}
			{selectedExample === 'EXAMPLE2' && <WheelOfFortune2 />}
		</div>
	)
}

export default App
