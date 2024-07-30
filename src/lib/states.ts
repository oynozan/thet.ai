import { create } from "zustand";

import type { IWallet } from "./wallet";
import type { IUser } from "@/db/models/User";
import { Networks } from "@/data/Networks";

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
export type TNetwork = (typeof Networks)[number];

interface IUserStore {
    user: IUser | null;
    network: TNetwork | null;
    setUser: (user: IUser | null) => void;
    setNetwork: (network: TNetwork) => void;
}

export const useUserStore = create<IUserStore>(set => ({
    user: null,
    network: null,
    setUser: user => set(() => ({ user })),
    setNetwork: network => set(() => ({ network })),
}));
