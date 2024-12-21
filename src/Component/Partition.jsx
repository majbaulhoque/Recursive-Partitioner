import { useState } from "react";

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Partition = ({ removePartition }) => {
    const [isSplit, setIsSplit] = useState(false);
    const [splitType, setSplitType] = useState(null); // 'declare split type v & h
    const [children, setChildren] = useState([]);
    const [bgColor] = useState(getRandomColor());

    // Split-Horizontally 
    const splitHorizontally = () => {
        setIsSplit(true);
        setSplitType("h");
        setChildren([
            <Partition key={Math.random()} removePartition={() => removeChild(0)} />,
            <Partition key={Math.random()} removePartition={() => removeChild(1)} />
        ]);
    };

    // Split Vertically
    const splitVertically = () => {
        setIsSplit(true);
        setSplitType("v");
        setChildren([
            <Partition key={Math.random()} removePartition={() => removeChild(0)} />,
            <Partition key={Math.random()} removePartition={() => removeChild(1)} />
        ]);
    };

    // Remove the each div
    const removeChild = (idx) => {
        setChildren((prev) => prev.filter((_, i) => i !== idx));
        if (children.length === 1) {
            setIsSplit(false);
            setSplitType(null);
        }
    };

    return (
        <div
            className={`flex border border-white ${splitType === "h" ? "flex-col" : splitType === "v" ? "flex-row" : ""} w-full h-full relative`}
            style={{ backgroundColor: bgColor }}
        >
            {!isSplit && (
                <div className="absolute inset-0 flex items-center justify-center gap-2 z-10">
                    <button
                        onClick={splitHorizontally}
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                    >
                        H
                    </button>
                    <button
                        onClick={splitVertically}
                        className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                        V
                    </button>
                    {removePartition && (
                        <button
                            onClick={removePartition}
                            className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                            -
                        </button>
                    )}
                </div>
            )}
            {isSplit && children}
        </div>
    );
};

export default Partition;
