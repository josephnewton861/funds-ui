type Document = {
    id: number;
    url: string;
    type: string;
 };

const AdditionalInfo = ({ document }: { document: Document }) => {
    return (
        <div className="additional-info">
            <p><strong>{document.type}: </strong><a href={document.url} target="_blank" rel="noopener noreferrer">{document.url}</a></p>
        </div>
    );
}

export default AdditionalInfo;