declare module 'StatsStore' {
    const stats: {
        [key: string]: number;
    };
    const updateStats: (testEval: number, selfEval: number) => void;

    interface StatsStore {
        stats: typeof stats;
        updateStats: typeof updateStats;
    }

    const StatsStore: StatsStore;
    export = StatsStore;
}
declare module 'AuthStore' {
    const userId: string;
    const updateUser: (id: string) => void;
    
    const accessToken: string;
    const updateAccessToken: (token: string) => void;

    interface AuthStore {
        userId: typeof userId;
        updateUser: typeof updateUser;
        accessToken: typeof accessToken;
        updateAccessToken: typeof updateAccessToken;
    }

    const AuthStore: AuthStore;
    export = AuthStore;
}
