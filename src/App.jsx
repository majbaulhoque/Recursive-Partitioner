import { useState, useEffect } from "react";
import Partition from "./Component/Partition";


const App = () => {
    const [root, setRoot] = useState([]);

    useEffect(() => {
        // Add Partition
        setRoot([<Partition key={Math.random()} removePartition={() => removeRoot(0)} />]);
    }, []); 

    const removeRoot = (idx) => {
        setRoot((prev) => prev.filter((_, i) => i !== idx));
    };

    return (
        <div className="w-screen h-screen">
            {root.map((partition, idx) => (
                <div key={idx} className="w-full h-full">
                    {partition}
                </div>
            ))}
        </div>
    );
};

export default App;
