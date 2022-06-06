import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { DEFAULT_BACKGROUND } from "../../config";
import JoinOrCreateOfficeModal from "./JoinOrCreateOfficeModal";

interface NewOfficeProps {
  onInsertOffice: (data: any) => void;
}
export function NewOffice({ onInsertOffice }: NewOfficeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <JoinOrCreateOfficeModal
          onClose={() => setIsOpen(false)}
          onInsertOffice={onInsertOffice}
        />
      )}
      <div
        className="thumbnail"
        style={{
          backgroundImage: `url("${DEFAULT_BACKGROUND}")`,
        }}
      >
        <button className="lobby__button" onClick={() => setIsOpen(true)}>
          <FaPlus size={120} />
        </button>
      </div>
    </>
  );
}
