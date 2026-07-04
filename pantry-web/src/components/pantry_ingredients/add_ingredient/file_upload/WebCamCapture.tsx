import Webcam from "react-webcam";
import React from "react";

async function fetchImage(file: File) {
    const formData = new FormData()
    formData.append("file", file)
    try {
        const response = await fetch("http://0.0.0.0:8000/ingredients", {
            method: 'POST',
            body: formData
        })
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        else {
            const data = await response.json();
            return data;
        }
    }
    catch (error: unknown) {
        console.error(error)
    }
}


export default function WebCamCapture() {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            fetchImage(imageSrc).then((response) => {
                console.log(response)
            });
        },
        [webcamRef]
    );
    return (
        <>
        <Webcam
            audio={false}
            height={500}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500}
        />
        <button onClick={capture}>Capture photo</button>
        </>
    );
};