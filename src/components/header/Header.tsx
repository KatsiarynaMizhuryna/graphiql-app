'use client'
import { Logo } from "@/components/header/logo/Logo"
import { Switcher } from "@/components/header/switcher/Switcher"
import { SignUp } from "@/components/header/signUp/SignUp"

export const Header = () => {
return (
    <header className="flex w-full h-28 items-center justify-between px-5 bg-gray-300">
        <Logo/>
        <Switcher />
        <SignUp />
    </header>
)
}

