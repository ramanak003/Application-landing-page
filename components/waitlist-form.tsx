"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, Loader2 } from "lucide-react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      const supabase = createClient()
      const { error } = await supabase.from("waitlist").insert([{ email }]).select()

      if (!error) {
        setStatus("success")
        setMessage("Thanks! You'll be notified when Praxis launches.")
        setEmail("")
      } else {
        setStatus("error")
        if (error.code === "23505") {
          setMessage("Email already registered")
        } else {
          setMessage(error.message || "Something went wrong. Please try again.")
        }
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please check your connection and try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className="flex-1"
      />
      <Button type="submit" disabled={status === "loading"} className="bg-black text-white hover:bg-gray-800">
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Notify Me"}
      </Button>
      {status === "error" && <p className="text-red-600 text-sm mt-2">{message}</p>}
    </form>
  )
}
