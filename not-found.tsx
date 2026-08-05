// import Link from "next/link";
// import {
//   Stethoscope,
//   Home,
//   Search,
//   Calendar,
//   User,
//   PhoneCall,
//   Activity,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// export default function GlobalNotFound() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background flex flex-col items-center justify-between p-4 md:p-8">
//       {/* Top Bar / Logo */}
//       <div className="w-full max-w-5xl flex items-center justify-between pt-2">
//         <Link
//           href="/"
//           className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary"
//         >
//           <div className="p-2 rounded-xl bg-primary text-primary-foreground">
//             <Activity className="h-5 w-5" />
//           </div>
//           <span>MediPulse</span>
//         </Link>
//         <Badge
//           variant="outline"
//           className="px-3 py-1 border-primary/20 text-xs font-semibold"
//         >
//           Error 404
//         </Badge>
//       </div>

//       {/* Main Content Area */}
//       <div className="max-w-3xl w-full text-center space-y-8 my-auto py-12">
//         {/* 1. Visual Icon Badge */}
//         <div className="relative inline-flex items-center justify-center">
//           <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl animate-pulse" />
//           <div className="relative p-6 rounded-3xl bg-card border shadow-xl text-primary">
//             <Stethoscope className="h-16 w-16" />
//           </div>
//           <Badge
//             variant="destructive"
//             className="absolute -top-2 -right-2 px-3 py-1 text-xs font-bold rounded-full shadow-md"
//           >
//             Page Lost
//           </Badge>
//         </div>

//         {/* 2. Main Heading & Description */}
//         <div className="space-y-3">
//           <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
//             Lost in the Portal?
//           </h1>
//           <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto">
//             The page, doctor profile, or appointment link you are looking for do
//             not exist or has been moved.
//           </p>
//         </div>

//         {/* 3. Primary Actions */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           <Button
//             size="lg"
//             className="w-full sm:w-auto gap-2 px-12 h-12 text-base"
//           >
//             <Link href="/" className="flex items-center justify-center gap-2">
//               <Home className="h-5 w-5" /> Back to Home
//             </Link>
//           </Button>
//           <Button
//             size="lg"
//             variant="outline"
//             className="w-full sm:w-auto gap-2 px-12 h-12 text-base"
//           >
//             <Link
//               href="/login"
//               className="flex items-center justify-center gap-2"
//             >
//               <Search className="h-5 w-5" /> Search Doctors
//             </Link>
//           </Button>
//         </div>

//         {/* 4. Dynamic Dashboard & Quick Navigation */}
//         <div className="pt-8 text-left border-t">
//           <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center sm:text-left">
//             Quick Navigation by Portal Role
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {/* Patient Portal */}
//             <Link href="/dashboard" className="group">
//               <Card className="hover:border-primary hover:shadow-md transition-all h-full">
//                 <CardContent className="p-4 flex items-center gap-3">
//                   <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
//                     <Calendar className="h-5 w-5" />
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-semibold leading-none text-foreground">
//                       Patient Portal
//                     </h4>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       Appointments & Records
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>

//             {/* Doctor Portal */}
//             <Link href="/doctor-dashboard" className="group">
//               <Card className="hover:border-primary hover:shadow-md transition-all h-full">
//                 <CardContent className="p-4 flex items-center gap-3">
//                   <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
//                     <User className="h-5 w-5" />
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-semibold leading-none text-foreground">
//                       Doctor Portal
//                     </h4>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       Manage Schedules
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>

//             {/* Support / Admin */}
//             <Link href="/contact" className="group sm:col-span-2 md:col-span-1">
//               <Card className="hover:border-primary hover:shadow-md transition-all h-full">
//                 <CardContent className="p-4 flex items-center gap-3">
//                   <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
//                     <PhoneCall className="h-5 w-5" />
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-semibold leading-none text-foreground">
//                       Help Desk
//                     </h4>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       Contact Support Team
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Footer Disclaimer */}
//       <div className="w-full text-center text-xs text-muted-foreground pb-2">
//         <p>© {new Date().getFullYear()} MediPulse. All rights reserved.</p>
//       </div>
//     </div>
//   );
// }
