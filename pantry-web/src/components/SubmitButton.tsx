interface ButtonProps {
    buttonText: string
}

export default function SubmitButton({buttonText}: ButtonProps) {
    return (
        <button type="submit">{buttonText}</button>
    )
}