import { FaSync } from "react-icons/fa";
import { DEFAULT_BACKGROUND } from "../../config";

export default function LoadingOffice() {
    return (
        <div className="thumbnail" style={{
            backgroundImage: `url("${DEFAULT_BACKGROUND}")`
        }}>
            <div className="lobby__sync">
                <FaSync size={120} />
            </div>
        </div>
    );
}