import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactModal({ ownerEmail, contactNumber }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    // You can hook this up to Supabase messages or email API
    alert("Message sent: " + message);
    setMessage("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Contact Owner</Button>
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Owner</h2>
        {ownerEmail && <p>Email: {ownerEmail}</p>}
        {contactNumber && <p>Phone: {contactNumber}</p>}
        <Input
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
      </DialogContent>
    </Dialog>
  );
}