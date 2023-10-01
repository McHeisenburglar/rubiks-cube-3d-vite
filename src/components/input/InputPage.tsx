import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

interface IProps {}

const CheckmarkIcon = ({ className }: { className?: string }) => {
  return <FontAwesomeIcon className={className} icon={faCheck} />;
};

interface SwitchButtonProps {
  active: boolean;
  handleClick: () => void;
  showCheckmark?: boolean;
  children: ChildElement;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  active,
  handleClick,
  children,
  showCheckmark,
}) => {
  const activeClass: CSSClass =
    "px-4 py-2 text-sm font-medium rounded-lg border-blue-700 shadow-lg shadow-blue-700/20 border bg-blue-700 text-white font-semi-bold  active:scale-90 transition duration-500 ease-[cubic-bezier(.17,.67,.28,1.21)]";
  const defaultClass: CSSClass =
    "px-4 py-2 text-sm rounded-lg border-slate-200 border text-slate-700 font-semi-bold active:scale-90 hover:shadow-sm transition hover:scale-110 duration-300 ease-out";

  return (
    <button
      className={active ? activeClass : defaultClass}
      type="button"
      onClick={(e) => {
        handleClick();
        e.currentTarget.blur();
      }}
    >
      {children}
      {showCheckmark && (
        <CheckmarkIcon
          className={
            active
              ? "text-white w-auto ml-2 scale-100  opacity-100 duration-200 ease-out"
              : "text-white w-0 opacity-0 duration-200 ease-out"
          }
        />
      )}
    </button>
  );
};

interface IProps {
  label: string;
  options: Array<string | number>;
}

interface SwitchListProps {
    options: 
}

export const SwitchList: React.FC<SwitchListProps>

export const SwitchRow: React.FC<IProps> = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedOption(index);
  };
  return (
    <div className="bg-white max-w-xl px-4 py-2 m-auto flex justify-between items-center">
      <h3 className="wide text-xl">{label}</h3>
      <div className="options flex gap-2 flex-wrap">
        {options.map((option, index) => {
          return (
            <SwitchButton
              key={index}
              active={selectedOption === index}
              handleClick={() => handleClick(index)}
              showCheckmark
            >
              {option}
            </SwitchButton>
          );
        })}
      </div>
    </div>
  );
};

const Main = () => {
  const optionSets = [
    {
      label: "Piece type",
      options: ["Corners", "Edges"],
    },
    {
      label: "Timer",
      options: [15, 30, 60, "∞"],
    },
  ];

  return (
    <>
      {optionSets.map((set, index) => (
        <SwitchRow label={set.label} key={index} options={set.options} />
      ))}
      <SwitchRow
        label={"Options"}
        options={[
          "Option 1",
          "Option 2",
          "Option 3",
          "Option 4",
          "Option 5",
          "Option 6",
          "Option 7",
        ]}
      />
    </>
  );
};

export default Main;
