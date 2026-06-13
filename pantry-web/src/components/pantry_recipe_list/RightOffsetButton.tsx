import { Button } from "react-bootstrap"

interface OffsetButtonProps {
    currOffset: number,
    setOffset: (currOffset: number) => void
    currPage: number,
    setPage: (currPage: number) => void
    limit: number,
    maxLen: number
};

export default function RightOffsetButton ({ currOffset, setOffset, currPage, setPage, limit, maxLen }: OffsetButtonProps) {

    function handleButtonClick() {
        setOffset(currOffset + limit);
        setPage(currPage + 1);
    }

    return (
        <Button onClick={handleButtonClick} disabled={limit * currPage >= maxLen}>{">"}</Button>
    )
}