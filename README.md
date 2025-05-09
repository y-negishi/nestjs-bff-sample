# NestJS BFF 学習プロジェクト

このリポジトリは、NestJSを用いたBFF（Backend For Frontend）アーキテクチャの学習用プロジェクトです。  
TypeScriptの知識を前提に、NestJSの基本から実践的なBFF実装までを体系的に学べます。

---

## 目次

1. [BFFとは何か](#bffとは何か)
2. [NestJSの概要と特徴](#nestjsの概要と特徴)
3. [プロジェクト構成](#プロジェクト構成)
4. [API設計と実装例](#api設計と実装例)
   - [ダッシュボード取得API](#ダッシュボード取得api)
   - [認証処理](#認証処理)
   - [モック実装方針](#モック実装方針)
5. [開発・実行方法](#開発実行方法)
6. [テストの実行](#テストの実行)
7. [今後学ぶべきNestJSの機能](#今後学ぶべきnestjsの機能)
8. [公式ドキュメント・参考リンク](#公式ドキュメント参考リンク)

---

## BFFとは何か

BFF（Backend For Frontend）は、フロントエンドごとに最適化されたAPIを提供するバックエンド層です。  
本プロジェクトでは、フロントエンドからのリクエストを受け、バックエンドAPIからデータを集約・加工して返す役割を担います。

---

## NestJSの概要と特徴

- TypeScript製のサーバーサイドフレームワーク
- DI（依存性注入）、デコレーター、モジュール指向などAngularに近い設計
- テスト容易性・拡張性・保守性に優れる

[公式ドキュメント](https://docs.nestjs.com/)

---

## プロジェクト構成

- `/src/main.ts` … アプリケーションのエントリポイント
- `/src/app.module.ts` … ルートモジュール
- `/src/dashboard/` … ダッシュボードAPI関連
- `/src/auth/` … 認証関連
- `/src/backend-mock/` … バックエンドAPIのモック

#### NestJSのファイル命名規則と役割

- `*.controller.ts` … コントローラー層。HTTPリクエストを受け付け、サービス層に処理を委譲します。
  - `@Controller`デコレーターでルーティングを定義
- `*.service.ts` … サービス層。ビジネスロジックやデータ処理を担当します。
  - `@Injectable`デコレーターでDIの対象に
- `*.module.ts` … モジュール層。関連するコントローラー・サービス等をまとめて管理します。
  - `@Module`デコレーターで構成要素を登録

> これらの命名規則は、役割ごとにファイルを明確に分離し、保守性・可読性を高めるためにNestJSで推奨されています。

### 各モジュールの役割

- **dashboard**  
  フロントエンド向けのダッシュボード取得APIを提供。ユーザーごとのタスク消化率を集計し返却します。

- **auth**  
  リクエストヘッダーの認証情報を検証し、バックエンドの認証API（モック）を呼び出して認証を行います。

- **backend-mock**  
  バックエンドAPI（ユーザー一覧・タスク一覧・認証API）をPromiseでハードコーディング値として返すモックを実装します。

---

## API設計と実装例

### ダッシュボード取得API

- エンドポイント: `GET /dashboard`
- 機能: ユーザーごとのタスク消化率を返却
- 実装例: [dashboard.controller.ts](src/dashboard/dashboard.controller.ts)

### 認証処理

- リクエストヘッダーの認証情報を検証
- バックエンドの認証API（モック）を呼び出し
- 実装例: [auth.service.ts](src/auth/auth.service.ts)

### モック実装方針

- バックエンドAPIは実際には存在しないため、Promiseでハードコーディング値を返すモックを作成
- 実装例: [backend-mock.service.ts](src/backend-mock/backend-mock.service.ts)

---

## 開発・実行方法

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動
npm run start:dev
```

---

## テストの実行

```bash
# ユニットテスト
npm run test
```

---

## 今後学ぶべきNestJSの機能

- DI（依存性注入）とプロバイダー
- ガード・インターセプター・パイプ
- バリデーション（class-validator, class-transformer）
- SwaggerによるAPIドキュメント自動生成
- 環境変数管理（@nestjs/config）
- ロギング・例外フィルター
- Lambda/APIGateway対応（@nestjs/cliのadapter利用）

---

## 公式ドキュメント・参考リンク

- [NestJS公式ドキュメント](https://docs.nestjs.com/)
- [BFFパターン解説（Qiita）](https://qiita.com/kimullaa/items/2e8e6e6e6e6e6e6e6e6e)
- [TypeScript公式](https://www.typescriptlang.org/)

---
