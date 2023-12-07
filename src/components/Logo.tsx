import { useEffect, useState } from 'react';

export default function Logo() {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    // Add a delay of 2 seconds (you can adjust this)
    const delay = setTimeout(() => {
      // Apply the animation class to move the logo to the top
      setAnimationClass('translate-y-0 translate-y-[-25vh] duration-1000');
    }, 2000);

    // Clear the timeout to avoid any unexpected behavior on component unmount
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className={`transform transition ease-out ${animationClass}`}>
      <div>
        <h1 className="text-5xl font-extrabold underline decoration-2 underline-offset-4 text-decoration decoration-wavy mb-2">
          Test.<span className="text-primary">ai</span>
        </h1>
      </div>
      <div className=" text-center mb-4">
        <p className="text-sm text-slate-400">Let the AI test you...</p>
      </div>
    </div>
  );
}
