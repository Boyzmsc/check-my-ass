import React, {useEffect, useState, useCallback} from "react";
import {firestore} from "../../services/firebase";

import EditMemoBtn from "./Action/Edit";
import DeleteMemoBtn from "./Action/Delete";
import CheckMemoBtn from "./Action/Check";
import ReadMore from "./Action/Read";

import "./MemoTable.scss";

const moment = require("moment");

const MemoTable = (props) => {
  const [memoData, setMemoData] = useState([]);
  const [flag, setFlag] = useState(false);
  const userId = props.userId;

  // fetch data & listen sort
  const fetchData = useCallback(() => {
    setMemoData([]);
    let memoList = [];
    firestore
      .collection("users")
      .doc(userId)
      .collection("memo")
      .orderBy("flag", props.sortSeq)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          memoList.push({
            status: doc.data()["status"],
            title: doc.data()["title"],
            content: doc.data()["content"],
            "last-update": new Date(doc.data()["last_update"]),
            flag: doc.data()["flag"],
            id: doc.id,
          });
        });

        // setMemoData((prevList) => prevList.concat(memoList));
        setMemoData(memoList);
      });
  }, [props.sortSeq]);

  useEffect(() => {
    fetchData();
  }, [fetchData, flag, props.sortSeq]);

  function getDateFormat(date) {
    return moment(date).format("YYYY-MM-DD HH:mm");
  }

  const memos = [];
  for (var i = 0; i < memoData.length; i++) {
    var memo = memoData[i];
    memos.push(
      <>
        <tr className="memo-record">
          <td className="memo-record-title">{memo["title"]}</td>
          <td className="memo-record-content">{memo["content"]}</td>
          <td className="memo-record-date">
            {getDateFormat(memo["last-update"])}
          </td>
          <td className="memo-record-action">
            <div
              class="memo-record-action-btn btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <EditMemoBtn
                data={memo}
                userId={userId}
                onFlag={function () {
                  setFlag(!flag);
                }.bind(this)}
              />
              <CheckMemoBtn data={memo} userId={userId} />
              <DeleteMemoBtn
                data={memo}
                userId={userId}
                onFlag={function () {
                  setFlag(!flag);
                }.bind(this)}
              />
            </div>
          </td>
          <td className="memo-record-read">
            <ReadMore key={i} placement="bottom" data={memo} />
          </td>
        </tr>
      </>,
    );
  }

  return <>{memos}</>;
};

export default MemoTable;
