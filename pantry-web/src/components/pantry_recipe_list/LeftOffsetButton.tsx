import { Button } from "react-bootstrap"

interface OffsetButtonProps {
    currOffset: number,
    setOffset: (currOffset: number) => void
    currPage: number,
    setPage: (currPage: number) => void
    limit: number
};

export default function LeftOffsetButton ({ currOffset, setOffset, currPage, setPage, limit }: OffsetButtonProps) {

    function handleButtonClick() {
        setOffset(currOffset - limit);
        setPage(currPage - 1);
    }

    return (
        <Button onClick={handleButtonClick} disabled={currOffset==0}>{"<"}</Button>
    )
}