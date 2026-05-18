interface GetButtonProps {
    buttonText: string
}

export default function GetButton({buttonText}: GetButtonProps) {
    return (
        <button type="submit">{buttonText}</button>
    )
}