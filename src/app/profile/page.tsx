"use client";

import NotFound from "../not-found";
import Button from "@/components/Button";
import Logout from "@/actions/auth/Logout";
import { useWalletStore } from "@/lib/states";
import Purchases from "@/components/Listing/Purchases";
import ListingsOf from "@/components/Listing/ListingsOf";

export default function Profile() {
    const wallet = useWalletStore(s => s.wallet);

    if (!wallet) return NotFound();

    return (
        <div className="profile-home">
            <div className="logout">
                <Button
                    type="red"
                    click={() => {
                        Logout();
                        window.location.href = "/";
                    }}
                >
                    Logout
                </Button>
            </div>
            <div>
                <h3>Your Prompt Listings</h3>
                <div className="category">
                    <ListingsOf wallet={wallet} />
                </div>
            </div>
            <div>
                <h3>Your Prompt Purchases</h3>
                <div className="category">
                    <Purchases />
                </div>
            </div>
        </div>
    );
}
