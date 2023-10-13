import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function ContactPage() {
  return (
    <Wrapper>
      <h1>Dashboard</h1>
      <div className="border border-2 d-inline-flex">
        <button className="btn btn-primary">Primary</button>
      </div>
    </Wrapper>
  );
}
