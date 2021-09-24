import React, {useEffect, useState, useCallback} from "react";
import {firestore} from "../../services/firebase";

import Header from "./Header";
import MemoTable from "./MemoTable";
import "./Memo.scss";

const Memo = (props) => {
  const userId = props.userId;

  const [sortSeq, setSortSeq] = useState("asc");
  const [memoTable, setMemoTable] = useState(
    <MemoTable userId={userId} sortSeq={sortSeq} />,
  );

  const fetchData = useCallback(() => {
    setMemoTable(<MemoTable userId={userId} sortSeq={sortSeq} />);
  }, [sortSeq]);

  useEffect(() => {
    fetchData();
  }, [sortSeq]);

  return (
    <div className="memo">
      <Header
        userId={userId}
        onSort={function (order) {
          if (order) {
            setSortSeq("asc");
          } else {
            setSortSeq("desc");
          }
        }.bind(this)}
      />

      <hr className="hr-nav" />
      <div className="container-table">
        <div className="table-responsive-xxl">
          <table class="memo-table table align-middle table-bordered">
            <thead class="table-light">
              <tr>
                <td>Title</td>
                <td>Content</td>
                <td>Last Update</td>
                <td>Action</td>
                <td>Read</td>
              </tr>
            </thead>
            <tbody>{memoTable}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Memo;
