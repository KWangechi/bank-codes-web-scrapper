import { Alert } from "@nextui-org/react";

const Header = () => {
  return (
    <div>
      <Alert
        color="warning"
        title={
          <span>
            <strong>* Disclaimer:</strong> Not all data is complete or accurate,
            please bear with me as I make these corrections
          </span>
        }
      />
    </div>
  );
};

export default Header;
