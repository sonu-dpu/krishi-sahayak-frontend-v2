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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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

      form.role === "farmer"
        ? navigate({ to: "/app" })
        : navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      setError("Failed to complete onboarding. Please try again.");
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FarmerImageGrid>
      <div className="w-full max-w-xl mx-auto px-4 py-8 md:p-6 flex flex-col items-center">
        {/* Step Indicator */}
        <div className="flex items-center justify-between w-full max-w-xs mb-8 md:mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center group">
              <div
                className={cn(
                  "size-8 md:size-10 rounded-full flex items-center justify-center font-semibold transition-all border-2 z-10",
                  step === s
                    ? "bg-emerald-600 text-white border-emerald-600 scale-110 shadow-lg shadow-emerald-200"
                    : step > s
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                      : "bg-white text-slate-400 border-slate-200",
                )}
              >
                {step > s ? <CheckCircle2 className="size-4 md:size-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "h-0.5 w-12 md:w-16 -mx-1",
                    step > s ? "bg-emerald-500" : "bg-slate-200",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card className="w-full bg-white/80 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] border border-white shadow-2xl relative overflow-hidden transition-all duration-500 py-0 gap-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <CardHeader className="p-6 md:p-12 pb-2 md:pb-0">
                <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight tracking-tight">
                  Welcome to Krishi Sahayak
                </CardTitle>
                <CardDescription className="text-slate-500 font-normal mb-0 text-base">
                  Choose your role to get started with the community.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 md:p-12 pt-4 md:pt-10">
                <div className="grid gap-3 md:gap-6">
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
                    <Button
                      key={role.id}
                      onClick={() => handleRoleSelection(role.id)}
                      variant={form.role === role.id ? "outline" : "secondary"}
                      className={cn(
                        "group flex items-center gap-3 md:gap-6 p-4 md:p-6 h-auto rounded-2xl md:rounded-3xl border-2 text-left transition-all whitespace-normal",
                        form.role === role.id
                          ? "border-primary ring-4 ring-primary/10 shadow-xl shadow-primary/10"
                          : "border-transparent",
                      )}
                    >
                      <div className="size-10 md:size-16 bg-background rounded-xl md:rounded-2xl flex items-center justify-center border-2 border-border group-hover:border-primary/30 shadow-sm transition-all shrink-0">
                        <role.icon className="size-5 md:size-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-base md:text-lg text-foreground truncate">
                          {role.title}
                        </h4>
                        <p className="text-xs md:text-sm font-medium text-muted-foreground leading-snug">
                          {role.desc}
                        </p>
                      </div>
                      <ChevronRight className="size-4 md:size-6 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <CardHeader className="p-6 md:p-12 pb-0 md:pb-0">
                <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight tracking-tight">
                  Personalize your profile
                </CardTitle>
                <CardDescription className="text-slate-500 font-normal text-base">
                  Tell us a bit more about you and your location.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 md:p-12 space-y-6 md:space-y-8">
                {error && (
                  <p className="text-rose-500 font-semibold mb-4 text-sm">
                    {error}
                  </p>
                )}

                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                      <Input
                        name="name"
                        placeholder="e.g. Rajesh Kumar"
                        className="h-12 md:h-14 pl-12 rounded-xl md:rounded-2xl border-2 border-slate-100 focus:border-emerald-500 bg-white transition-all text-slate-900"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest ml-1">
                      Complete Address
                    </label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                      <Input
                        name="address"
                        placeholder="Village, District, State"
                        className="h-12 md:h-14 pl-12 rounded-xl md:rounded-2xl border-2 border-slate-100 focus:border-emerald-500 bg-white transition-all text-slate-900"
                        value={form.address}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 md:pt-4">
                    <Button
                      type="button"
                      onClick={getLocation}
                      variant="outline"
                      className="flex-1 h-12 md:h-16 rounded-xl md:rounded-2xl border-2 border-slate-100 text-slate-700 bg-white hover:bg-slate-50 font-semibold gap-3 whitespace-normal"
                    >
                      <MapPin className="size-5 text-emerald-600" />
                      Add Location
                    </Button>
                    <div className="text-xs font-semibold text-slate-400 px-1 sm:px-4 text-center sm:text-left">
                      {locStatus || "Optional but helpful"}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 md:p-12 pt-0 md:pt-0 gap-3 md:gap-4">
                <Button
                  onClick={prevStep}
                  variant="ghost"
                  className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl shrink-0"
                >
                  <ArrowLeft className="size-5 md:size-6" />
                </Button>
                <Button
                  disabled={!form.name || !form.address}
                  onClick={nextStep}
                  className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base md:text-lg shadow-xl shadow-emerald-200 transition-all active:scale-95 gap-3 whitespace-normal"
                >
                  Next Step <ArrowRight className="size-5" />
                </Button>
              </CardFooter>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <CardHeader className="p-6 md:p-12 pb-0 md:pb-0">
                <CardTitle className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight tracking-tight">
                  Finalizing Access
                </CardTitle>
                <CardDescription className="text-slate-500 font-normal leading-relaxed tracking-tight text-base">
                  You are all set to join the premium agricultural network.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 md:p-12 space-y-6 md:space-y-8">
                <div className="bg-emerald-50/50 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-100/50 space-y-3 md:space-y-4 overflow-hidden">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center text-slate-700 font-semibold text-sm md:text-lg gap-1 border-b border-emerald-100/50 pb-2 sm:border-0 sm:pb-0">
                    <span className="text-slate-500 sm:text-slate-700">Name</span>
                    <span className="text-emerald-700 break-words line-clamp-1 sm:line-clamp-none">
                      {form.name}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center text-slate-700 font-semibold text-sm md:text-lg gap-1 border-b border-emerald-100/50 pb-2 sm:border-0 sm:pb-0">
                    <span className="text-slate-500 sm:text-slate-700">Role</span>
                    <span className="text-emerald-700 capitalize">
                      {form.role}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center text-slate-700 font-semibold text-sm md:text-lg gap-1">
                    <span className="text-slate-500 sm:text-slate-700">
                      Location
                    </span>
                    <span className="text-emerald-700">
                      {form.location ? "Added" : "Skipped"}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 md:p-12 pt-0 md:pt-0 gap-3 md:gap-4">
                <Button
                  onClick={prevStep}
                  variant="ghost"
                  className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl shrink-0"
                >
                  <ArrowLeft className="size-5 md:size-6" />
                </Button>
                <Button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base md:text-lg shadow-xl shadow-emerald-200 transition-all active:scale-95 gap-3 whitespace-normal"
                >
                  {loading ? "Completing Profile..." : "Complete Setup"}
                  <ArrowRight className="size-5" />
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>


        {/* Help text */}
        <p className="mt-8 md:mt-10 text-emerald-100/60 font-semibold tracking-widest uppercase text-[10px] md:text-xs">
          Krishi Sahayak v2 • Premium Farmer Assistant
        </p>
      </div>
    </FarmerImageGrid>
  );
}

