import React, { useState } from "react";                               // React と useState機能の読み込み
import "./styles.css";                                                 // CSSの読み込み
import { InputTodo } from "./components/InputTodo";                    // 入力エリアのコンポーネントの読み込み
import { IncompleteTodos } from "./components/IncompleteTodos";        // 未完了エリアのコンポーネントの読み込み
import { CompleteTodos } from "./components/CompleteTodos";            // 完了エリアのコンポーネントの読み込み

export const App = () => {                                             // Appコンポーネントの定義 JSX
  const [todoText, setTodoText] = useState("");                        // ステートの初期化　新規入力TODOのテキストボックス
  const [incompleteTodos, setIncompleteTodos] = useState([]);          // ステートの初期化　未完了リスト一覧の配列
  const [completeTodos, setCompleteTodos] = useState([]);              // ステートの初期化　完了リスト一覧の配列

  const onChangeTodoText = (event) => setTodoText(event.target.value); // テキストボックスの変更を処理する関数　変更時にテキストボックスの変更後の値をステートに設定する　よくある暗記する一文らしい

  const onClickAdd = () => {                                           // 入力エリアの[追加]ボタン押下時の動作
    if (todoText === "") return;                                       // 入力エリアが空っぽなら、何もしない
    const newTodos = [...incompleteTodos, todoText];                   // 未完了リストに入力した文字列を追加した配列作成
    setIncompleteTodos(newTodos);                                      // 未完了リストのステートに変更した配列を設定
    setTodoText("");
  };

  const onClickDelete = (index) => {                                   // 未完了リスト一覧の各項目にある[削除]ボタン
    const newTodos = [...incompleteTodos];                             // 未完了リスト一覧を分割代入で取得
    newTodos.splice(index, 1);                                         // spliceで、[削除]ボタンを押下した位置の項目を削除
    setIncompleteTodos(newTodos);                                      // ステートに削除した未完了リストの配列を再設定
  };

  const onClickComplete = (index) => {                                 // 未完了リスト一覧の各項目にある[完了]ボタン
    const newIncompleteTodos = [...incompleteTodos];                   // 未完了リスト一覧を分割代入で取得
    newIncompleteTodos.splice(index, 1);                               // spliceで、[追加]ボタンを押下した位置の項目を削除

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]]; // 完了リストを取得＋未完了リストの[完了]押下位置の項目を追加
    setIncompleteTodos(newIncompleteTodos);                            // 上方で、[完了]ボタン押下位置の項目を削除した未完了リストをステートに代入
    setCompleteTodos(newCompleteTodos);                                // 上方で、[完了]ボタン押下位置の項目を追加した完了リストをステートに代入
  };

  const onClickBack = (index) => {                                     // 完了リスト一覧の各項目にある[戻す]ボタン (押すと完了リスト->未完了リストに戻る)
    const newCompleteTodos = [...completeTodos];                       // 完了リスト一覧を分割代入で配列に取得する
    newCompleteTodos.splice(index, 1);                                 // 完了リストから[戻す]ボタンを押下した位置の項目を削除

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]]; // 未完了リストの取得＋完了リストで[戻す]ボタン押した位置の項目の追加
    setCompleteTodos(newCompleteTodos);                                // 上方で、[戻す]ボタン押下位置の項目を削除した完了リストをステートに代入
    setIncompleteTodos(newIncompleteTodos);                            // 上方で、[戻す]ボタン押下位置の項目を追加した未完了リストをステートに代入
  };

  return (
    <>
      <InputTodo                                                       // 追記追加TODOの入力のコンポーネント
        todoText={todoText}                                            // テキストの中身を保持するステートをコンポーネントへ渡す
        onChange={onChangeTodoText}                                    // 変化時イベントを処理する関数をコンポーネントへ渡す
        onClick={onClickAdd}                                           // クリック時イベントを処理する関数をコンポーネントへ渡す
        disabled={incompleteTodos.length >= 5}                         // 未完了リストが５個以上あると、コンポーネントへdisabledを渡す
      />
      {incompleteTodos.length >= 5 && (                                // 未完了リストが５個以上あるときに、隙間に文字列を表示する
        <p style={{ color: "red" }}>
          登録できるtodo5個までだよ～。消化しろ～。
        </p>
      )}
      <IncompleteTodos                                                 // 未完了リストのエリアのコンポーネント
        todos={incompleteTodos}                                        // 未完了リスト一覧の配列を保持するステートをコンポーネントへ渡す
        onClickComplete={onClickComplete}                              // 完了ボタン押下時の処理をする関数をコンポーネントへ渡す
        onClickDelete={onClickDelete}                                  // 削除ボタン押下時の処理をする関数をコンポーネントへ渡す
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};