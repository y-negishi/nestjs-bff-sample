import { Injectable } from '@nestjs/common';

/**
 * バックエンドAPIのモックサービス
 * - ユーザー一覧取得
 * - タスク一覧取得
 * - 認証API
 *
 * 実際のバックエンドAPIの代わりにPromiseでハードコーディング値を返します。
 */
@Injectable()
export class BackendMockService {
  /**
   * ユーザー一覧を取得するモック
   * @returns ユーザー配列
   */
  async getUsers(): Promise<{ id: string; name: string }[]> {
    // 本来はバックエンドAPI呼び出し
    return [
      { id: 'u1', name: '山田太郎' },
      { id: 'u2', name: '佐藤花子' },
      { id: 'u3', name: '鈴木次郎' },
    ];
  }

  /**
   * タスク一覧を取得するモック
   * @returns タスク配列
   */
  async getTasks(): Promise<{ id: string; userId: string; done: boolean }[]> {
    // 本来はバックエンドAPI呼び出し
    return [
      { id: 't1', userId: 'u1', done: true },
      { id: 't2', userId: 'u1', done: false },
      { id: 't3', userId: 'u2', done: true },
      { id: 't4', userId: 'u2', done: true },
      { id: 't5', userId: 'u3', done: false },
    ];
  }

  /**
   * 認証APIのモック
   * @param token 認証トークン
   * @returns 認証結果（true:認証成功, false:認証失敗）
   */
  async authenticate(token: string): Promise<boolean> {
    // 本来はバックエンドAPI呼び出し
    // ここでは'test-token'のみ認証成功とする
    return token === 'test-token';
  }
}
