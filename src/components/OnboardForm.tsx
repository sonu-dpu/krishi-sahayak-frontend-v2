import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import {
  User,
  MapPin,
  Sprout,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FarmerImageGrid } from "@/components/auth/FarmerImageGrid";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/apiClient";

type Step = 1 | 2 | 3;

export default function OnboardForm() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locStatus, setLocStatus] = useState("");

  const [form, setForm] = useState({
    name: user?.fullName || "",
    role: "farmer", // Default to farmer
    address: "",
    location: null as null | { type: "Point"; coordinates: [number, number] },
    crops: [] as string[],
  });

  const nextStep = () => setStep((s) => (s + 1) as Step);
  const prevStep = () => setStep((s) => (s - 1) as Step);

  const handleRoleSelection = (role: string) => {
    setForm({ ...form, role });
    nextStep();
  };

  function getLocation() {
    if (!navigator.geolocation) {
      setLocStatus("Geolocation not supported ❌");
      return;
    }

    setLocStatus("Getting location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm({
          ...form,
          location: {
            type: "Point",
            coordinates: [pos.coords.longitude, pos.coords.latitude],
          },
        });
        setLocStatus("Location captured ✅");
      },
      () => setLocStatus("Permission denied ❌"),
    );
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const token = await getToken();

      await apiClient.post("/api/v1/users/register", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate({ to: "/app" });
    } catch (err: AxiosError | unknown) {
      setError("Failed to complete onboarding. Please try again.");
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <FarmerImageGrid>
      <div className="w-full max-w-xl mx-auto p-4 flex flex-col items-center">
        {/* Step Indicator */}
        <div className="flex items-center justify-between w-full max-w-xs mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center group">
              <div
                className={cn(
                  "size-10 rounded-full flex items-center justify-center font-bold transition-all border-2 z-10",
                  step === s
                    ? "bg-emerald-600 text-white border-emerald-600 scale-110 shadow-lg shadow-emerald-200"
                    : step > s
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                      : "bg-white text-slate-400 border-slate-200",
                )}
              >
                {step > s ? <CheckCircle2 className="size-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "h-0.5 w-16 -mx-1",
                    step > s ? "bg-emerald-500" : "bg-slate-200",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="w-full bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight tracking-tight">
                Welcome to Krishi Sahayak
              </h2>
              <p className="text-slate-500 font-medium mb-10">
                Choose your role to get started with the community.
              </p>

              <div className="grid gap-6">
                {[
                  {
                    id: "farmer",
                    title: "Farmer",
                    desc: "Get instant AI advice for your crops.",
                    icon: Sprout,
                  },
                  {
                    id: "officer",
                    title: "Agricultural Officer",
                    desc: "Provide expert support and manage documents.",
                    icon: ShieldCheck,
                  },
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelection(role.id)}
                    className={cn(
                      "group flex items-center gap-6 p-6 rounded-3xl border-2 text-left transition-all hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100",
                      form.role === role.id
                        ? "bg-white border-emerald-500 ring-4 ring-emerald-500/10"
                        : "bg-slate-50 border-transparent",
                    )}
                  >
                    <div className="size-16 bg-white rounded-2xl flex items-center justify-center border-2 border-slate-100 group-hover:border-emerald-200 shadow-sm transition-all">
                      <role.icon className="size-8 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-lg text-slate-900">
                        {role.title}
                      </h4>
                      <p className="text-sm font-medium text-slate-500">
                        {role.desc}
                      </p>
                    </div>
                    <ChevronRight className="size-6 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight tracking-tight">
                  Personalize your profile
                </h2>
                <p className="text-slate-500 font-medium tracking-tight">
                  Tell us a bit more about you and your location.
                </p>
              </div>

              {error && <p className="text-rose-500 font-bold mb-4">{error}</p>}

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                    <Input
                      name="name"
                      placeholder="e.g. Rajesh Kumar"
                      className="h-14 pl-12 rounded-2xl border-2 border-slate-100 focus:border-emerald-500 bg-white transition-all text-slate-900"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600 uppercase tracking-widest ml-1">
                    Complete Address
                  </label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                    <Input
                      name="address"
                      placeholder="Village, District, State"
                      className="h-14 pl-12 rounded-2xl border-2 border-slate-100 focus:border-emerald-500 bg-white transition-all text-slate-900"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={getLocation}
                    variant="outline"
                    className="flex-1 h-16 rounded-2xl border-2 border-slate-100 text-slate-700 bg-white hover:bg-slate-50 font-bold gap-3"
                  >
                    <MapPin className="size-5 text-emerald-600" />
                    Add Location
                  </Button>
                  <div className="text-sm font-bold text-slate-400 px-4">
                    {locStatus || "Optional but helpful"}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-10">
                <Button
                  onClick={prevStep}
                  variant="ghost"
                  className="h-14 w-14 rounded-2xl"
                >
                  <ArrowLeft className="size-6" />
                </Button>
                <Button
                  disabled={!form.name || !form.address}
                  onClick={nextStep}
                  className="flex-1 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-xl shadow-emerald-200 transition-all active:scale-95 gap-3"
                >
                  Next Step <ArrowRight className="size-5" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight tracking-tight">
                  Finalizing Access
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed tracking-tight">
                  You are all set to join the premium agricultural network.
                  Review your details and finish.
                </p>
              </div>

              <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100/50 space-y-4">
                <div className="flex justify-between items-center text-slate-700 font-bold text-lg">
                  <span>Name</span>
                  <span className="text-emerald-700">{form.name}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 font-bold text-lg">
                  <span>Role</span>
                  <span className="text-emerald-700 capitalize">
                    {form.role}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-700 font-bold text-lg">
                  <span>Pinpoint Location</span>
                  <span className="text-emerald-700">
                    {form.location ? "Added" : "Skipped"}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 pt-10">
                <Button
                  onClick={prevStep}
                  variant="ghost"
                  className="h-14 w-14 rounded-2xl"
                >
                  <ArrowLeft className="size-6" />
                </Button>
                <Button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="flex-1 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-xl shadow-emerald-200 transition-all active:scale-95 gap-3"
                >
                  {loading ? "Completing Profile..." : "Complete Setup"}
                  <ArrowRight className="size-5" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Help text */}
        <p className="mt-10 text-emerald-100/60 font-black tracking-widest uppercase text-xs">
          Krishi Sahayak v2 • Premium Farmer Assistant
        </p>
      </div>
    </FarmerImageGrid>
  );
}
