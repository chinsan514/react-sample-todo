import React from "react";

export const IncompleteTodos = (props) => {
  // 未完了リスト一覧のJSX。親コンポーネントから来た props は無名関数(アロー関数)の引数で受け取る
  const { todos, onClickComplete, onClickDelete } = props; // 親コンポーネントから来た props を分割代入で各変数に代入
  return (
    // JSXは return文で記載
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todos.map((todo, index) => {
          // mapで 配列todosをループして各リストの項目に分割する。第一引数は分解する各項目。第二引数は空っぽで index文字列となる
          return (
            // mapの分解結果は アロー関数で受け取る
            <div key={todo} className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
