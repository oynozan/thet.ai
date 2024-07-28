import { create } from "zustand";

import type { IWallet } from "./wallet";

/* Modal States */
interface ModalStore {
    modal: string;
    options: any;
    loading: boolean;
    setModal: (type: string, options: any) => void;
    setLoading: (loading: boolean) => void;
}

export const useModalStore = create<ModalStore>(set => ({
    modal: "", // Modal Key
    options: {},
    loading: false,
    setModal: (type, options = {}) =>
        set(() => ({
            modal: type,
            options: options,
        })),
    setLoading: loading => set(() => ({ loading })),
}));

/* Wallet States */
interface IWalletStore {
    loading: boolean;
    wallet: string | null;
    handler: IWallet | null;
    setWallet: (w: string) => void;
    setHandler: (h: IWallet) => void;
    setLoading: (l: boolean) => void;
}

export const useWalletStore = create<IWalletStore>(set => ({
    loading: true,
    wallet: null,
    handler: null,
    setWallet: wallet => set(() => ({ wallet })),
    setHandler: handler => set(() => ({ handler })),
    setLoading: loading => set(() => ({ loading })),
}));

/* User States */
interface IUser {
    wallet: string;
    confirmed: boolean;
    history: Array<{
        sold?: {
            id: string;
            amount: number;
            currency: string;
            date: Date;
        };
        bought?: {
            id: string;
            amount: number;
            currency: string;
            date: Date;
        };
        swapped?: {
            amount: number;
            direction: string;
            date: Date;
        };
        preview?: {
            model: string;
            date: Date;
        };
    }>;
}

interface IUserStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
}

export const useUserStore = create<IUserStore>(set => ({
    user: null,
    setUser: user => set(() => ({ user })),
}));
