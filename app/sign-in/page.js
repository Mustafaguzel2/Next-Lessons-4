'use client';
import { userLoginFormControls } from "../utils";
import CommonFormElement from "@/components/ui/form-element/page";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { initialSignInFormData } from "../utils";
import { Button } from "@/components/ui/button";
import { loginUserAction } from "@/actions";
import { useRouter } from "next/navigation";

function SignIn() {
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const router = useRouter();
    
    async function handleSignIn() {
        const result = await loginUserAction(signInFormData);
        console.log(result);
        if(result?.data){
            router.push("/");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form action={handleSignIn}>
                {
                    userLoginFormControls.map((controlItem) => {
                        return (
                            <div key={controlItem.email}>
                                <Label>{controlItem.label}</Label>
                                <CommonFormElement
                                    currentItem={controlItem}
                                    value={setSignInFormData[controlItem.name]}
                                    onChange={(e) => setSignInFormData({ ...signInFormData, [controlItem.name]: e.target.value })}
                                />
                            </div>
                        )
                    })
                }
                <Button type="submit">Sign In</Button>
            </form>
        </div>
    );
}
export default SignIn