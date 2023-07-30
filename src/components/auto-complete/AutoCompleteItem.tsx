import { FunctionComponent, ReactNode } from "react";

interface AutoCompleteItemProps {
  title: string;
  completed: boolean;
  onSelectItem: () => void;
  highlightMatch: (title: string) => ReactNode;
  isHighlighted: boolean;
}
const AutoCompleteItem: FunctionComponent<AutoCompleteItemProps> = ({
  title,
  completed,
  onSelectItem,
  highlightMatch,
  isHighlighted,
}) => {
  return (
    <li
      className={`list-group-item ${isHighlighted ? "active highlighted" : ""}`}
      onClick={onSelectItem}
      role="option"
    >
      <div className="list-group-item-container">
        <small className="mb-0 badge badge-primary">
          {completed ? "[Completed]" : "[Not Completed]"}
        </small>
        <span
          className={`mb-0 font-weight-bold line-height-1 ${
            completed && "is-completed"
          }`}
        >
          {highlightMatch(title)}
        </span>
      </div>
    </li>
  );
};

export default AutoCompleteItem;
