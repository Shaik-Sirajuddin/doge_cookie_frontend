import React from "react";

const InputControl = ({ label, select, endText, setText, ...rest }) => {
  return (
    <div>
      {label && <label className="form-label">{label}</label>}
      {select ? (
        <select className="form-control form-select" {...rest}>
          {select?.map((item, i) => (
            <option value={item?.value}>{item?.text}</option>
          ))}
        </select>
      ) : (
        <label className="position-relative d-block">
          <input className="form-control" {...rest} />
          {endText && (
            <span
              style={{
                position: "absolute",
                paddingInline: "15px",
                paddingBlock: "5px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "var(--white)",
                zIndex: "1",
                right: "1px",
                color: "var(--title)",
              }}
            >
              {endText}
            </span>
          )}
        </label>
      )}
    </div>
  );
};

export default InputControl;
