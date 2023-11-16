import React from "react";

const GameTable = ({ history, inputCount, inputNumber }) => {
  return (
    <div className="FormGameTable">
      <table className="chakra-table css-1e8efj0">
        <thead>
          <tr>
            <th>Số lần nhập</th>
            <th>Số nhập vào</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>
                <p className="chakra-text css-a0kzk0">{index + 1}</p>
                <hr
                  aria-orientation="horizontal"
                  className="chakra-divider css-svjswr"
                />
              </td>
              <td>
                <p className="chakra-text css-1792cp2">{item.guess}</p>
                <hr
                  aria-orientation="horizontal"
                  className="chakra-divider css-svjswr"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <caption className="correctAction">
        Số lần nhập tối đa: 3 <br />
        {/* Tỷ lệ đúng: {(inputNumber === "correct" ? 1 : 0) * 100}% */}
      </caption>
    </div>
  );
};

export default GameTable;
