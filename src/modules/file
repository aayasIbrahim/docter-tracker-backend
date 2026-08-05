import Link from "next/link";
import {
  Stethoscope,
  CalendarCheck,
  ShieldCheck,
  Clock,
  Search,
  Star,
  ArrowRight,
  UserCheck,
  Activity,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 🟢 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-primary/10 via-background to-background py-20 md:py-32">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-6">
          <Badge
            variant="secondary"
            className="px-4 py-1.5 text-sm font-medium rounded-full"
          >
            🏥 Your Trusted Healthcare Partner
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
            Find & Book the Best <span className="text-primary">Doctors</span>{" "}
            Near You
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with certified specialists, manage your appointments
            effortlessly, and track your medical history all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base gap-2"
            
            >
              <Link
                href="/doctors"
                className="flex items-center justify-center gap-2"
              >
                Book Appointment <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base"
            >
              <Link href="/register">Join as Doctor</Link>
            </Button>
          </div>

          {/* Quick Stats Banner */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-card border shadow-xs">
              <h3 className="text-3xl font-bold text-primary">500+</h3>
              <p className="text-sm text-muted-foreground">Expert Doctors</p>
            </div>
            <div className="p-4 rounded-xl bg-card border shadow-xs">
              <h3 className="text-3xl font-bold text-primary">10k+</h3>
              <p className="text-sm text-muted-foreground">Happy Patients</p>
            </div>
            <div className="p-4 rounded-xl bg-card border shadow-xs">
              <h3 className="text-3xl font-bold text-primary">50+</h3>
              <p className="text-sm text-muted-foreground">Specialties</p>
            </div>
            <div className="p-4 rounded-xl bg-card border shadow-xs">
              <h3 className="text-3xl font-bold text-primary">4.9/5</h3>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔍 2. QUICK SEARCH SECTION */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-card border rounded-2xl p-6 shadow-xl max-w-3xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctor, specialty, or condition..."
              className="pl-9 h-12"
            />
          </div>
          <Button size="lg" className="w-full md:w-auto px-8 h-12">
            Search
          </Button>
        </div>
      </section>

      {/* ⭐ 3. SPECIALTIES / CATEGORIES */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Top Specialties
            </h2>
            <p className="text-muted-foreground">
              Explore doctors by specialized fields
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: "Cardiology", count: "45 Doctors", icon: Activity },
              { name: "Neurology", count: "32 Doctors", icon: Stethoscope },
              { name: "Pediatrics", count: "50 Doctors", icon: UserCheck },
              { name: "Dermatology", count: "28 Doctors", icon: ShieldCheck },
              { name: "Orthopedics", count: "38 Doctors", icon: CalendarCheck },
              { name: "General Medicine", count: "60 Doctors", icon: Clock },
            ].map((specialty, idx) => {
              const Icon = specialty.icon;
              return (
                <Card
                  key={idx}
                  className="hover:border-primary transition-all duration-300 cursor-pointer text-center group"
                >
                  <CardContent className="pt-6 flex flex-col items-center">
                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-3">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-semibold text-sm">{specialty.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {specialty.count}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 👨‍⚕️ 4. FEATURED DOCTORS SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Featured Doctors
              </h2>
              <p className="text-muted-foreground mt-2">
                Book appointments with our top-rated specialists
              </p>
            </div>
            <Button variant="outline">
              <Link href="/doctors">View All Doctors</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Sarah Ahmed",
                specialty: "Cardiologist",
                experience: "10+ Years Exp.",
                rating: 4.9,
                reviews: 120,
              },
              {
                name: "Dr. Mahmud Hassan",
                specialty: "Neurologist",
                experience: "8+ Years Exp.",
                rating: 4.8,
                reviews: 95,
              },
              {
                name: "Dr. Nusrat Jahan",
                specialty: "Pediatrician",
                experience: "12+ Years Exp.",
                rating: 5.0,
                reviews: 150,
              },
            ].map((doc, idx) => (
              <Card
                key={idx}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="p-0">
                  <div className="h-48 bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
                    [ Doctor Image Placeholder ]
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{doc.name}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {doc.specialty}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {doc.rating}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {doc.experience} • {doc.reviews} Reviews
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full">
                    <Link href="/doctors/1">Book Appointment</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 5. WHY CHOOSE US */}
      <section className="py-20 bg-muted/50 border-t">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-bold">Why Choose Doctor Tracker?</h2>
            <p className="text-muted-foreground">
              We provide the best features for your healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-3 p-4">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <CalendarCheck className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg">Easy Scheduling</h3>
              <p className="text-sm text-muted-foreground">
                Book instantly based on real-time doctor availability without
                waiting in queues.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-4">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg">100% Verified Doctors</h3>
              <p className="text-sm text-muted-foreground">
                All registered medical practitioners are BMDC verified
                specialists.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 p-4">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg">24/7 Access</h3>
              <p className="text-sm text-muted-foreground">
                Access your medical history, prescriptions, and records anytime,
                anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
