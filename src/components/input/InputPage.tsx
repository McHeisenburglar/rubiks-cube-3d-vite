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
    "px-4 py-2 text-sm font-medium rounded-lg border-blue-700 shadow-lg shadow-blue-700/20 border bg-blue-700 text-white font-semi-bold  active:scale-90 transition duration-500 ease-[cubic-bezier(.17,.67,.28,1.21)] mr-2";
  const defaultClass: CSSClass =
    "px-4 py-2 text-sm rounded-lg border-slate-200 bg-white border text-slate-700 mr-2 font-semi-bold active:scale-90 hover:shadow-sm transition hover:scale-110 duration-300 ease-out";

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

interface RadioOption {
  value: string;
  label: string;
  selected: boolean;
}

interface SwitchListProps {
  options: RadioOption[];
  handleClick: (option: RadioOption) => void;
}

export const SwitchList: React.FC<SwitchListProps> = ({
  options,
  handleClick,
}) => {
  return (
    <>
      {options.map((option, index) => {
        return (
          <SwitchButton
            key={index}
            active={option.selected}
            handleClick={() => handleClick(option)}
            showCheckmark
          >
            {option.label}
          </SwitchButton>
        );
      })}
    </>
  );
};

export const SwitchRow: React.FC<IProps> = ({ label, options }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedOption(index);
  };
  return (
    <div className="bg-white max-w-xl px-4 py-8 m-auto flex justify-center items-center">
      {/* <h3 className="wide text-xl">{label}</h3> */}
      <div className="options flex gap-2 justify-center flex-wrap">
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
  const multiselect = true;
  const [options, setOptions] = useState<RadioOption[]>([
    {
      value: "corners",
      label: "Corners",
      selected: false,
    },
    {
      label: "Edges",
      value: "edges",
      selected: false,
    },
  ]);

  const handleRadioClick = (option: RadioOption) => {
    if (multiselect) toggleSelected(option);
    else setSelected(option);
  };

  const setSelected = (option: RadioOption) => {
    setOptions((cur) =>
      cur.map((o) => ({
        ...o,
        selected: o.value === option.value,
      }))
    );
  };

  const toggleSelected = (option: RadioOption) => {
    setOptions((cur) =>
      cur.map((o) => {
        if (o.value === option.value)
          return {
            ...o,
            selected: !o.selected,
          };
        return o;
      })
    );
  };

  return (
    <div className="bg-white max-w-xl px-4 py-8 m-auto flex justify-center items-center">
      <SwitchList options={options} handleClick={handleRadioClick} />
    </div>
  );
};

export default Main;
