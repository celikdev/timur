"use client";
import { Metadata } from "next";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/header/header";
import Footer from "@/layout/footer/footer";
import brd_bg from "@/assets/img/bg/breadcrumb_bg01.jpg";
import brd_img from "@/assets/img/others/breadcrumb_img02.png";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Kayıt Ol",
};

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status === true) {
          router.push("/auth/register/verify");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Wrapper>
      <Header />
      <main className="main--area">
        <section
          className="breadcrumb-area"
          style={{ backgroundImage: `url(${brd_bg.src})` }}
        >
          <div className="container">
            <div className="breadcrumb__wrapper">
              <div className="row">
                <div className="col-xl-6 col-lg-7">
                  <div className="breadcrumb__content">
                    <h2 className="title mb-5">Kayıt Ol</h2>
                    <nav aria-label="breadcrumb">
                      <form action="#" className="footer-newsletter-form">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="E-Posta"
                          className="mb-3"
                        />
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Şifre"
                        />
                      </form>
                      <div className="flex-column d-flex mt-5">
                        <button
                          disabled={!email || !password}
                          onClick={() => handleRegister()}
                          className="btn mt-2"
                        >
                          Kayıt Ol
                        </button>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-5 position-relative d-none d-lg-block">
                  <div className="breadcrumb__img">
                    <Image
                      src={brd_img}
                      alt="img"
                      style={{ height: "auto", width: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Wrapper>
  );
}
