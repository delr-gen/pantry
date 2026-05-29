import { Button } from "react-bootstrap"

interface OffsetButtonProps {
    currOffset: number,
    setOffset: (newOffset: number) => void
};

export default function RightOffsetButton ({ currOffset, setOffset }: OffsetButtonProps) {

    function handleButtonClick() {
        setOffset(currOffset + 10);
    }

    return (
        <Button onClick={handleButtonClick}>{">"}</Button>
    )
}