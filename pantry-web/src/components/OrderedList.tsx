interface OrderedlistProps{
    listName: string
}

export default function Orderedlist({listName}: OrderedlistProps) {
    return (
        <div>
            {listName}
            <ol></ol>
        </div>
    )
}
