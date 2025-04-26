document.addEventListener("DOMContentLoaded", () => {
  // デバッグAPIのエンドポイント（このURLはダミーで、実際には存在しないかもしれません）
  // 実際のテストでは、リクエストヘッダーを返してくれるエコーサーバーを使うと良いでしょう
  const apiUrl = "https://httpbin.org/headers";

  // fetch(apiUrl, { cache: "no-cache" });

  // 各ボタンに対してイベントリスナーを設定
  document.getElementById("fetchDefault").addEventListener("click", () => {
    // デフォルトのfetch
    performFetch(apiUrl, {});
  });

  document.getElementById("fetchNoCache").addEventListener("click", () => {
    // no-cacheモード
    performFetch(apiUrl, { cache: "no-cache" });
  });

  document.getElementById("fetchReload").addEventListener("click", () => {
    // reloadモード（no-cacheと同等だが、ブラウザによって実装が異なることがある）
    performFetch(apiUrl, { cache: "reload" });
  });

  document.getElementById("fetchForce").addEventListener("click", () => {
    // force-cacheモード
    performFetch(apiUrl, { cache: "force-cache" });
  });
});

/**
 * fetchリクエストを実行し、結果を表示する
 * @param {string} url - リクエスト先のURL
 * @param {Object} options - fetchのオプション
 */
async function performFetch(url, options) {
  const requestHeadersElem = document.getElementById("requestHeaders");
  const responseElem = document.getElementById("response");

  try {
    // リクエスト前にヘッダー表示をクリア
    requestHeadersElem.textContent = "リクエスト送信中...";
    responseElem.textContent = "待機中...";

    // 実際のリクエストオプションの表示
    console.log("Fetch options:", options);

    // Fetch API使用
    const response = await fetch(url, options);
    const data = await response.json();

    // リクエストヘッダーの表示
    // 注: JavaScriptからは実際に送信されたリクエストヘッダーを直接取得できないため、
    // HTTPBinのようなエコーサービスを使用するか、開発者ツールで確認する必要があります
    requestHeadersElem.textContent = `Cache mode: ${
      options.cache || "default"
    }\n実際のヘッダーは開発者ツールのNetworkタブで確認してください。\n（注: JavaScript内からは送信されたリクエストヘッダーを直接確認できません）`;

    // レスポンスの表示
    responseElem.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    requestHeadersElem.textContent = `エラー: ${error.message}`;
    responseElem.textContent = "リクエスト失敗";
  }
}

// 現在のブラウザがどのようにキャッシュを扱うかの簡単な説明
console.log(`
重要な注意事項:
- fetchのcacheオプションが実際にどのようなHTTPヘッダーを生成するかはブラウザ実装によって異なります
- 特に、'no-cache'がmax-age=0を生成するかPragma: no-cacheを生成するかは、
  ブラウザやそのバージョンによって異なる場合があります
- 開発者ツールのNetworkタブで実際に送信されたヘッダーを確認することをお勧めします
`);
