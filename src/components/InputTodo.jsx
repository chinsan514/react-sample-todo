import React from "react"; // Reactの読み込み

const style = {
  // CSSの挿入
  backgroundColor: "#c1ffff", // JSXでは、ハイフンは使えない。キャメルケースで記載する必要がある
  width: "400px", // JSXでは、値はダブルクォーテーションで囲む必要がある
  height: "30px", // JSXでは、配列扱いで、コロンが必要
  padding: "8px",
  margin: "8px",
  borderRadius: "8px"
};

export const InputTodo = (props) => {
  // 無名関数(アロー関数), propsは引数で受け取る
  const { todoText, onChange, onClick, disabled } = props; // 親コンポーネントから来た情報は propsの分割代入で受け取る
  return (
    // return の中に JSXを記載する
    <div style={style}>
      <input
        disabled={disabled} // 未完了リストが５個以上あるときは disabled属性でグレーアウト
        placeholder="TODOを入力" // テキストボックス内のヒントを表す文字列
        value={todoText} // 親コンポーネントから来た、入力中文字列のステート値
        onChange={onChange} // 親コンポーネントから来た、文字列変更を処理する関数を設定
      />
      <button disabled={disabled} onClick={onClick}>
        追加
      </button>
    </div>
  );
};
