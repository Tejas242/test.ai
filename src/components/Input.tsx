import { useEffect, useState } from "react";

interface InputProps {
  onGenerate: (input: string) => void;
}

export default function Input({ onGenerate }: InputProps) {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    // Add a delay of 2 seconds (you can adjust this)
    const delay = setTimeout(() => {
      // Apply the animation class to move the logo to the top
      setAnimationClass('translate-y-0 -translate-y-[20vh] duration-1000 opacity-100');
    }, 2000);

    // Clear the timeout to avoid any unexpected behavior on component unmount
    return () => clearTimeout(delay);
  }, []);

  const handleGenerate = async () => {
    // Assuming you want to extract the input value from the input field
    const inputElement = document.getElementById('price') as HTMLInputElement;
    const inputValue = inputElement.value;

    // Call the onGenerate callback with the input value
    onGenerate(inputValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
      <div className={`relative rounded-md opacity-0 transition transform ${animationClass}`}>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-full p-4 pr-20 text-gray-900 placeholder:text-gray-400 transition-shadow focus:shadow-lg focus:outline-none sm:text-sm sm:leading-6"
          placeholder="Enter your topic here..."
          defaultValue=""
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button className="bg-background p-2 rounded-full" onClick={handleGenerate}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clipRule="evenodd"
              />
              <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
            </svg>
          </button>
        </div>
      </div>
  );
}
