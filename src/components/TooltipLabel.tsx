import { tooltip } from "../utils/utils";

type TooltipLabelProps = {
    label: string;
}

const TooltipLabel = ({label}: TooltipLabelProps) => {
    return (
        <button
            type="button"
            className="btn btn-link p-0 ms-1"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-title={tooltip[label] || ""}
        >
            <i className="bi bi-info-circle" />
        </button>
    )
}

export default TooltipLabel;