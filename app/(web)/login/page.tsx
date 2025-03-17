"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" onChange={handleChange} required />
      <input type="password" name="password" onChange={handleChange} required />
      <button type="submit">Log In</button>
    </form>
  );
}
