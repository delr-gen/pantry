interface ingredient {
    name: string,
    quantity: number,
    unit: string,
    date_bought: string,
    expiration_date: string
  }

interface cameraProps {
    ingredients: ingredient[]
    setIngredients: (ingredients: ingredient[]) => void
}

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

export default function FileUpload( {ingredients, setIngredients}: cameraProps ) {
    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const file = event.target[0]["files"][0];

        fetchImage(file).then(response => {
            const temp = {}
            let date_bought = new Date().toISOString().split('T')[0];
            let expiration_date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            if (file.lastModifiedDate) {
                date_bought = file.lastModifiedDate.toISOString().split("T")[0];
                expiration_date = new Date(file.lastModified + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            }
            for (const prediction of response.predictions) {
                if (!(prediction.class in temp)) {
                    temp[prediction.class] = {
                        name: prediction.class, 
                        quantity: 0, 
                        unit: "unit", 
                        date_bought: date_bought,
                        expiration_date: expiration_date
                    }
                }
                temp[prediction.class].quantity += 1;
            }
            console.log(temp)
            const newIngredients = [];
            for (const [key, value] of Object.entries(temp)) {
                newIngredients.push(value)
            }
            setIngredients([...newIngredients, ...ingredients])
        })
    }
    return (
        <>
            <form method="post" encType="multipart/form-data" action="/upload" onSubmit={handleSubmit.bind(this)}>
                <input name="inputImage" type="file" accept="image/png, image/jpeg"></input>
                <input type="submit" value="Upload" />
            </form>
        </>
    )
}

