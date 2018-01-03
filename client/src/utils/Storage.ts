class DataStorage {
    static set(key: string, value: string, expire: number): void {
        // append a timestamp after the value to check for expiration in future
        const data = {value, expires_at: new Date().getTime() + expire / 1};
        localStorage.setItem(key, JSON.stringify(data));
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
}

export default DataStorage;