// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import { 
//   Plus, 
//   Calendar, 
//   Users, 
//   Camera, 
//   BarChart3,
//   Settings,
//   LogOut,
//   ChevronRight
// } from "lucide-react";

// // Mock data - replace with API calls
// const mockEvents = [
//   {
//     id: "1",
//     name: "Sarah & John's Wedding",
//     date: "2024-06-15",
//     status: "live",
//     stats: { uploads: 247, participants: 89 },
//     slug: "sarah-john-wedding",
//   },
//   {
//     id: "2",
//     name: "Company Summer Party",
//     date: "2024-07-20",
//     status: "upcoming",
//     stats: { uploads: 0, participants: 0 },
//     slug: "company-summer-2024",
//   },
//   {
//     id: "3",
//     name: "Mom's 60th Birthday",
//     date: "2024-03-10",
//     status: "archived",
//     stats: { uploads: 156, participants: 42 },
//     slug: "mom-60th-bday",
//   },
// ];

// const statusColors = {
//   live: "bg-green-500",
//   upcoming: "bg-blue-500",
//   archived: "bg-muted-foreground",
// };

// const statusLabels = {
//   live: "Live",
//   upcoming: "Upcoming",
//   archived: "Archived",
// };

// const DashboardPage = () => {
//   const [filter, setFilter] = useState<"all" | "live" | "upcoming" | "archived">("all");

//   const filteredEvents = filter === "all" 
//     ? mockEvents 
//     : mockEvents.filter(e => e.status === filter);

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Sidebar */}
//       <aside className="fixed left-0 top-16 bottom-0 w-64 bg-sidebar border-r border-sidebar-border p-4 hidden lg:block">
//         <nav className="space-y-2">
//           <Link
//             to="/dashboard"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground font-medium"
//           >
//             <Calendar size={18} />
//             My Events
//           </Link>
//           <Link
//             to="/dashboard/settings"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
//           >
//             <Settings size={18} />
//             Settings
//           </Link>
//         </nav>
        
//         <div className="absolute bottom-4 left-4 right-4">
//           <Button variant="ghost" className="w-full justify-start text-muted-foreground">
//             <LogOut size={18} className="mr-2" />
//             Sign Out
//           </Button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="lg:ml-64 py-8 px-4 md:px-8">
//         <div className="max-w-5xl mx-auto">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//             <div>
//               <h1 className="text-3xl font-serif font-bold text-foreground">
//                 My Events
//               </h1>
//               <p className="text-muted-foreground mt-1">
//                 Create and manage your memory collections
//               </p>
//             </div>
//             <Button size="lg" asChild>
//               <Link to="/events/new">
//                 <Plus size={18} />
//                 Create Event
//               </Link>
//             </Button>
//           </div>

//           {/* Filter Tabs */}
//           <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
//             {(["all", "live", "upcoming", "archived"] as const).map((status) => (
//               <Button
//                 key={status}
//                 variant={filter === status ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setFilter(status)}
//                 className="capitalize"
//               >
//                 {status === "all" ? "All Events" : statusLabels[status]}
//               </Button>
//             ))}
//           </div>

//           {/* Events Grid */}
//           <div className="space-y-4">
//             {filteredEvents.length === 0 ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-center py-16 bg-card rounded-2xl border border-border"
//               >
//                 <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
//                 <h3 className="text-lg font-semibold text-foreground mb-2">
//                   No events found
//                 </h3>
//                 <p className="text-muted-foreground mb-6">
//                   {filter === "all" 
//                     ? "Create your first event to start collecting memories"
//                     : `No ${filter} events at the moment`}
//                 </p>
//                 <Button asChild>
//                   <Link to="/events/new">
//                     <Plus size={18} />
//                     Create Event
//                   </Link>
//                 </Button>
//               </motion.div>
//             ) : (
//               filteredEvents.map((event, index) => (
//                 <motion.div
//                   key={event.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Link
//                     to={`/events/${event.id}/access`}
//                     className="block bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h3 className="text-lg font-semibold text-foreground">
//                             {event.name}
//                           </h3>
//                           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white ${statusColors[event.status as keyof typeof statusColors]}`}>
//                             {statusLabels[event.status as keyof typeof statusLabels]}
//                           </span>
//                         </div>
//                         <p className="text-sm text-muted-foreground mb-3">
//                           {new Date(event.date).toLocaleDateString("en-US", {
//                             weekday: "long",
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           })}
//                         </p>
//                         <div className="flex items-center gap-6 text-sm">
//                           <div className="flex items-center gap-2 text-muted-foreground">
//                             <Camera size={16} />
//                             <span>{event.stats.uploads} uploads</span>
//                           </div>
//                           <div className="flex items-center gap-2 text-muted-foreground">
//                             <Users size={16} />
//                             <span>{event.stats.participants} participants</span>
//                           </div>
//                         </div>
//                       </div>
//                       <ChevronRight size={20} className="text-muted-foreground" />
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))
//             )}
//           </div>

//           {/* Quick Stats (for returning users) */}
//           {mockEvents.length > 0 && (
//             <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-card rounded-xl border border-border p-5">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
//                     <Calendar size={20} className="text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-foreground">{mockEvents.length}</p>
//                     <p className="text-sm text-muted-foreground">Total Events</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-card rounded-xl border border-border p-5">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
//                     <Camera size={20} className="text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-foreground">
//                       {mockEvents.reduce((acc, e) => acc + e.stats.uploads, 0)}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Total Uploads</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-card rounded-xl border border-border p-5">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
//                     <Users size={20} className="text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-foreground">
//                       {mockEvents.reduce((acc, e) => acc + e.stats.participants, 0)}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Total Participants</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardPage;










import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Plus, 
  Calendar, 
  Users, 
  Camera, 
  Settings,
  LogOut,
  ChevronRight,
  Loader2
} from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Type for event from API
interface Event {
  id: number;
  title: string;
  date: string | null;
  description: string;
  slug: string;
  is_published: boolean;
  created_at: string;
  settings?: {
    primary_color: string;
    theme: string;
  };
}

const statusColors = {
  live: "bg-green-500",
  upcoming: "bg-blue-500",
  archived: "bg-gray-500",
};

const statusLabels = {
  live: "Live",
  upcoming: "Upcoming",
  archived: "Archived",
};

const getEventStatus = (event: Event): "live" | "upcoming" | "archived" => {
  if (!event.date) return "live";
  const eventDate = new Date(event.date);
  const today = new Date();
  
  if (eventDate < today) return "archived";
  if (eventDate.toDateString() === today.toDateString()) return "live";
  return "upcoming";
};

const DashboardPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "live" | "upcoming" | "archived">("all");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (error: any) {
      console.error("Failed to fetch events:", error);
      toast({
        title: "Error",
        description: "Failed to load your events. Please try again.",
        variant: "destructive",
      });
      // If unauthorized, redirect to login
      if (error.message?.includes('Session expired')) {
        api.logout();
        navigate('/auth/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const filteredEvents = events.filter(event => {
    if (filter === "all") return true;
    return getEventStatus(event) === filter;
  });

  // Calculate stats
  const totalEvents = events.length;
  const totalUploads = 0; // Would need a separate API call for this
  const totalParticipants = 0; // Would need a separate API call for this

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-sidebar border-r border-sidebar-border p-4 hidden lg:block">
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          >
            <Calendar size={18} />
            My Events
          </Link>
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <Settings size={18} />
            Settings
          </Link>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 py-8 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">
                My Events
              </h1>
              <p className="text-muted-foreground mt-1">
                Create and manage your memory collections
              </p>
            </div>
            <Button size="lg" asChild>
              <Link to="/events/new">
                <Plus size={18} />
                Create Event
              </Link>
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {(["all", "live", "upcoming", "archived"] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(status)}
                className="capitalize"
              >
                {status === "all" ? "All Events" : statusLabels[status]}
              </Button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <Loader2 size={48} className="mx-auto text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Loading your events...</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-card rounded-2xl border border-border"
              >
                <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No events found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {filter === "all" 
                    ? "Create your first event to start collecting memories"
                    : `No ${filter} events at the moment`}
                </p>
                <Button asChild>
                  <Link to="/events/new">
                    <Plus size={18} />
                    Create Event
                  </Link>
                </Button>
              </motion.div>
            ) : (
              filteredEvents.map((event, index) => {
                const status = getEventStatus(event);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/events/${event.id}/access`}
                      className="block bg-card rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-foreground">
                              {event.title}
                            </h3>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white ${statusColors[status]}`}>
                              {statusLabels[status]}
                            </span>
                          </div>
                          {event.date && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {new Date(event.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          )}
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Camera size={16} />
                              <span>0 uploads</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users size={16} />
                              <span>0 participants</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-muted-foreground" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Quick Stats */}
          {events.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalEvents}</p>
                    <p className="text-sm text-muted-foreground">Total Events</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Camera size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalUploads}</p>
                    <p className="text-sm text-muted-foreground">Total Uploads</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalParticipants}</p>
                    <p className="text-sm text-muted-foreground">Total Participants</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;