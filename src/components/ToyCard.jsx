import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContactModal from "./ContactModal";
import { motion } from "framer-motion";

export default function ToyCard({ toy }) {
  return (
    <motion.div
      key={toy.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="hover:shadow-lg transition"
    >
      <Card className="rounded-2xl overflow-hidden">
        <img src={toy.image} alt={toy.name} className="w-full h-40 object-cover" />
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">{toy.name}</h2>
          <p className="text-gray-500">Condition: {toy.condition}</p>
          <p className="text-gray-500">Location: {toy.location}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" disabled={toy.mode !== "swap"}>Swap</Button>
            <Button variant="outline" disabled={toy.mode !== "buy"}>Buy</Button>
            <Button variant="outline" disabled={toy.mode !== "sell"}>Sell</Button>
            <ContactModal ownerEmail={toy.owner_email} contactNumber={toy.contact_number} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
