import {components} from "react-select";

export function Option(props) {
  const { data } = props;

  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <img
          src={`/logos/${data.logo}`}
          alt={data.label}
          className="w-5 h-5 object-contain"
        />
        <span>{data.label}</span>
      </div>
    </components.Option>
  );
}
