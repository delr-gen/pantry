import { Button } from "react-bootstrap"

interface OffsetButtonProps {
    currOffset: number,
    setOffset: (newOffset: number) => void
};

export default function LeftOffsetButton ({ currOffset, setOffset }: OffsetButtonProps) {

    function handleButtonClick() {
        setOffset(currOffset - 10);
    }

    return (
        <Button onClick={handleButtonClick} disabled={currOffset==0}>{"<"}</Button>
    )
}