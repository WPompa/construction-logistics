import "./css/top-bottom.css";

const TopBottom = ({ top, bottom, altClass, tooltip = "", ...props }) => {
  return (
    <div className={`topbottom-container ${altClass}`}>
      <p className="top">
        {tooltip ? (
          <span className="tooltip">
            {top}
            <span className="tooltip-text">
              {`${props.tooltipTitle}: ` + tooltip}
            </span>
          </span>
        ) : (
          top
        )}
      </p>
      <p className="bottom">{bottom}</p>
    </div>
  );
};

export default TopBottom;
{
}
