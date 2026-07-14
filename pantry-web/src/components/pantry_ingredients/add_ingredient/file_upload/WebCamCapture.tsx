import Webcam from "react-webcam";
import React from "react";

interface ingredient {
    name: string,
    quantity: number,
    unit: string,
    date_bought: string,
    expiration_date: string
  }

interface webCamCaptureProps {
    ingredients: ingredient[]
    setIngredients: (ingredients: ingredient[]) => void
}

async function fetchImage(data: string) {
    const res = await fetch(data)
    const blob = await res.blob()
    const formData = new FormData()
    formData.append("file", blob)
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


export default function WebCamCapture({ingredients, setIngredients}: webCamCaptureProps) {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const temp = {}
            const imageSrc = webcamRef.current.getScreenshot();
            fetchImage(imageSrc).then((response) => {
                const today = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                for (const prediction of response.predictions) {
                    if (!(prediction.class in temp)) {
                        temp[prediction.class] = {
                            name: prediction.class, 
                            quantity: 0, 
                            unit: "unit", 
                            date_bought: today,
                            expiration_date: today
                        }
                    }
                    temp[prediction.class].quantity += 1;
                }
                const newIngredients = [];
                for (const [key, value] of Object.entries(temp)) {
                    newIngredients.push(value)
                }
                setIngredients([...newIngredients, ...ingredients])
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