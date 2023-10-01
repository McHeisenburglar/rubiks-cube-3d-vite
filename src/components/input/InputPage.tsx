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
}

interface SwitchListProps {
  options: RadioOption[];
  selectedValue: string | null;
  handleClick: (option: RadioOption) => void;
}

export const SwitchList: React.FC<SwitchListProps> = ({
  options,
  selectedValue,
  handleClick,
}) => {
  return (
    <>
      {options.map((option, index) => {
        return (
          <SwitchButton
            key={index}
            active={option.value === selectedValue}
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

interface ButtonProps {
  children: ChildElement;
  disabled: boolean;
  handleClick: () => void;
}

const PlayButton: React.FC<ButtonProps> = ({
  children,
  handleClick,
  disabled,
}) => {
  const buttonClass =
    "px-4 py-2 text-sm font-semibold rounded-lg border-green-600 shadow-lg shadow-green-700/20 border bg-green-600 text-white font-semi-bold disabled:opacity-60  enabled:hover:scale-105 enabled: hover:translate enabled:hover:shadow-green-700/30 enabled:active:scale-90 transition duration-500 ease-[cubic-bezier(.17,.67,.28,1.21)] mr-2";

  return (
    <button
      type="button"
      className={buttonClass}
      disabled={disabled}
      onClick={() => {
        handleClick();
      }}
    >
      {children}
    </button>
  );
};

const Main = () => {
  interface GameOptions {
    pieceType: "corners" | "edges" | null;
    seconds: "60s" | "30s" | "infinite" | null;
  }

  const [gameOptions, setGameOptions] = useState<GameOptions>({
    pieceType: null,
    seconds: null,
  });

  const handleRadioClick = (key: "pieceType" | "seconds") => {
    return (option: RadioOption) => {
      setGameOptions((cur) => {
        return {
          ...cur,
          [key]: option.value,
        };
      });
    };
  };

  return (
    <>
      <div className="bg-white max-w-xl m-auto p-4">
        <div className="p-4 flex justify-between items-center">
          <h3 className="wide text-xl">Piece types</h3>
          <div className="flex justify-center items-center">
            <SwitchList
              options={[
                {
                  label: "Corners",
                  value: "corners",
                },
                {
                  label: "Edges",
                  value: "edges",
                },
              ]}
              selectedValue={gameOptions.pieceType}
              handleClick={handleRadioClick("pieceType")}
            />
          </div>
        </div>
        <div className="p-4 flex justify-between items-center">
          <h3 className="wide text-xl">Seconds in game</h3>
          <div className="flex justify-center items-center">
            <SwitchList
              options={[
                {
                  label: "30s",
                  value: "30",
                },
                {
                  label: "60s",
                  value: "60",
                },
                {
                  label: "120s",
                  value: "120",
                },
                {
                  label: "∞",
                  value: "none",
                },
              ]}
              selectedValue={gameOptions.seconds}
              handleClick={handleRadioClick("seconds")}
            />
          </div>
        </div>
        <div className="p-4 flex justify-end">
          <PlayButton
            disabled={!gameOptions.pieceType || !gameOptions.seconds}
            handleClick={() => {}}
          >
            Start game
          </PlayButton>
        </div>
      </div>
    </>
  );
};

export default Main;
