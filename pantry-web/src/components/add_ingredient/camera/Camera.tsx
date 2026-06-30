import { Button } from "react-bootstrap";

async function sendPhoto() {
    const formData = new FormData();
    formData.append('image', "/Users/gen/pantry/raw-images_baby_bok_choy_07.jpeg");

    await fetch("http://0.0.0.0:8000/ingredients", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));;
    
    //const result = await response.json();
    //console.log(result);
    
}

export default function Camera() {
    return (
        <>
            <Button onClick={sendPhoto}>Take Picture</Button>
        </>
    )
}

