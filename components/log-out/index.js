'use client';
import { logoutAction } from "@/actions";
import { Button } from "@/components/ui/button";
function LogOut() {
    
    async function handleLogout() {
        await logoutAction();
    }


    return (
        <div>
            <Button 
            onClick={handleLogout}>
                Log Out
            </Button>
        </div>
    );
}
export default LogOut;

