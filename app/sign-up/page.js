'use client';
import { Label } from "@/components/ui/label";
import { userRegistrationFormControls } from "../utils";
import CommonFormElement from "@/components/ui/form-element/page";
import { useState } from "react";
import { initialSignUpFormData } from "../utils";
import { Button } from "@/components/ui/button";
import { registerUserAction } from "@/actions";
import { redirect, useRouter } from "next/navigation";

function SignUp() {

    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    const router = useRouter();
    function handleSignUpBtnValid() {
        return Object.keys(signUpFormData).every((key) => 
            signUpFormData[key].trim() !== ""
        )
    }

    async function handleSignUp() {
        const result = await registerUserAction(signUpFormData);
        if(result?.data){
            redirect("/sign-in");
        }
    }

    return (
        <div>
            <h1>Registration</h1>
            <form action={handleSignUp}>
                {
                    userRegistrationFormControls.map((controlItem) => {
                        return (
                            <div key={controlItem.email}>
                                <Label>{controlItem.label}</Label>
                                <CommonFormElement
                                    currentItem={controlItem}
                                    value={signUpFormData[controlItem.name]}
                                    onChange={(e) => setSignUpFormData({ ...signUpFormData, [controlItem.name]: e.target.value })}
                                />
                            </div>
                        )
                    })
                }
                <Button disabled={!handleSignUpBtnValid()}
                    type="submit"
                    className="mt-6">
                    Sign Up
                </Button>
            </form>
        </div>
    );
}

export default SignUp;