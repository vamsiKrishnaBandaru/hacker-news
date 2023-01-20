function PagesNumbers(props) {
  let toStart = 0;

  if (props.page > 5) {
    toStart = props.page - 5;
  }

  if (props.total && props.total - props.page < 5 && props.page) {
    toStart = props.total - 10;
  }

  return (
    <ul className="PagesNumbers">
      {props.page > 5 && (
        <li className="page" key="start" onClick={props.click}>
          &lt;&lt;
        </li>
      )}
      {Array(10)
        .fill(0)
        .map((_, index) => {
          return (
            <li
              className={props.page == index + toStart ? "active page" : "page"}
              key={index + 1 + toStart}
              onClick={props.click}
            >
              {index + 1 + toStart}
            </li>
          );
        })}
      {props.page < props.total - 5 && (
        <li className="page" key="final" onClick={props.click}>
          &gt;&gt;
        </li>
      )}
    </ul>
  );
}

export default PagesNumbers;
