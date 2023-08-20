import React, { useState, useEffect } from "react";

const ApiContent = () => {
    const [apiData, setApiData] = useState(""); // State to hold the fetched data

    useEffect(() => {
        const getStuff = async () => {
            try {
                const response = await fetch('/api/league');
                const data = await response.json();
                setApiData(data); // Update the state with fetched data
            } catch (error) {
                console.error(error);
            }
        };

        getStuff(); // Call the fetch function when component mounts
    }, []); // Empty dependency array to run only once

    return (
        <div>
            <p>Look at this: {apiData}</p>
        </div>
    );
};

export default ApiContent;
