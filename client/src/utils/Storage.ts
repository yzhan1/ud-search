class DataStorage {
    private static readonly SEARCH_HISTORY_KEY: string = 'udSearchHistory';

    static set(key: string, value: string, expire: number): boolean {
        // append a timestamp after the value to check for expiration in future
        const data = {value, expires_at: new Date().getTime() + expire / 1};
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }

    static get(key: string): string | null {
        const hit = localStorage.getItem(key);
        if (hit) {
            const data = JSON.parse(hit);
            if (data.expires_at !== null && data.expires_at < new Date().getTime()) {
                // remove the k-v pair if it expired already
                localStorage.removeItem(key);
            } else {
                return data.value;
            }
        }
        return null;
    }

    static saveHistory(input: string): boolean {
        let history: any = localStorage.getItem(this.SEARCH_HISTORY_KEY);
        history = history ? JSON.parse(history) : [];
        // only save most recent 20 search histories
        if (history.length >= 20) {
            history.pop();
        }
        history.push(input);
        localStorage.setItem(this.SEARCH_HISTORY_KEY, JSON.stringify(history));
        return true;
    }

    static getHistory(): Array<string> {
        const history: string | null = localStorage.getItem(this.SEARCH_HISTORY_KEY);
        if (history === null) {
            return [];
        } else {
            return JSON.parse(history);
        }
    }
}

export default DataStorage;