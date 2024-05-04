import React from "react";

const handleDetail = (data) => {
  // Implement your logic here
  console.log("Detail clicked", data);
  // Add your code to handle the detail functionality
};

const LeaderboardRow = ({ data }) => {

  return (
    <tr className="tableRow">
      <td>{data.testId.title}</td>
      <td>{data.testId.createdAt}</td>
      <td>{data.score}</td>
      {/* <td>{data.totalScratch}</td> */}
      <td>
        <button onClick={() => handleDetail(data)} className="btn-primary">Detail</button>
      </td>
    </tr>
  );
};
export default LeaderboardRow;
