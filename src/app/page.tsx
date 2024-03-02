"use client";
import Body from "@/components/Body";
import NavBar from "@/components/NavBar";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <NavBar />
      <Body />
    </RecoilRoot>
  );
}
