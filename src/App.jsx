import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import ToyList from "./components/ToyList";
import ToyForm from "./components/ToyForm";
import SearchBar from "./components/SearchBar";
import AuthForm from "./components/AuthForm";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [toys, setToys] = useState([]);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    condition: "",
    image: null,
    location: "",
    mode: "swap",
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    fetchToys();

    const channel = supabase
      .channel("realtime-toys")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "toys" }, () => {
        fetchToys();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchToys() {
    const { data } = await supabase.from("toys").select("*");
    setToys(data);
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!formData.image) return;

    const filename = `${Date.now()}-${formData.image.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("toy-images")
      .upload(filename, formData.image);

    if (uploadError) {
      console.error("Image upload failed", uploadError);
      return;
    }

    const imageUrl = supabase.storage.from("toy-images").getPublicUrl(filename).data.publicUrl;

    await supabase.from("toys").insert([
      {
        name: formData.name,
        condition: formData.condition,
        image: imageUrl,
        location: formData.location,
        mode: formData.mode,
        owner_email: user.email,
      },
    ]);

    setFormData({ name: "", condition: "", image: null, location: "", mode: "swap" });
  }

  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else setUser(data.user);
  }

  async function handleGoogleLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) alert(error.message);
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="text-center mb-6">
        <img src="/logo.png" alt="Re Toy" className="mx-auto w-20 h-20 mb-2" />
        <h1 className="text-4xl font-bold">Re Toy</h1>
        <p className="text-gray-500">Swap, Sell or Buy pre-loved toys for a greener future 🌱</p>
    </div>
      {!user ? (
        <AuthForm handleLogin={handleLogin} handleGoogleLogin={handleGoogleLogin} />
      ) : (
        <>
          <ToyForm formData={formData} setFormData={setFormData} handleUpload={handleUpload} />
          <SearchBar search={search} setSearch={setSearch} locationFilter={locationFilter} setLocationFilter={setLocationFilter} />
          <ToyList toys={toys} search={search} locationFilter={locationFilter} />
        </>
      )}
    </div>
  );
}
