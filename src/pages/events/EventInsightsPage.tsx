import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, BarChart3, Users, Camera, Eye, MessageCircle, TrendingUp } from "lucide-react";

// Mock data
const mockStats = {
  participants: 89,
  uploads: 247,
  views: 1243,
  comments: 156,
  reactions: 892,
};

const mockActivityData = [
  { time: "10:00", uploads: 12 },
  { time: "11:00", uploads: 28 },
  { time: "12:00", uploads: 45 },
  { time: "13:00", uploads: 67 },
  { time: "14:00", uploads: 89 },
  { time: "15:00", uploads: 78 },
  { time: "16:00", uploads: 56 },
];

const mockTopUploaders = [
  { name: "Guest 1", uploads: 23 },
  { name: "Guest 2", uploads: 18 },
  { name: "Guest 3", uploads: 15 },
  { name: "Guest 4", uploads: 12 },
  { name: "Guest 5", uploads: 10 },
];

const EventInsightsPage = () => {
  const { id } = useParams();

  const statCards = [
    { icon: Users, label: "Participants", value: mockStats.participants, color: "bg-blue-500" },
    { icon: Camera, label: "Uploads", value: mockStats.uploads, color: "bg-green-500" },
    { icon: Eye, label: "Views", value: mockStats.views, color: "bg-purple-500" },
    { icon: MessageCircle, label: "Comments", value: mockStats.comments, color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to={`/events/${id}/access`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft size={18} />
          Back to Event
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-champagne flex items-center justify-center">
            <BarChart3 size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">
              Event Insights
            </h1>
            <p className="text-muted-foreground">
              Track engagement and activity
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border p-5"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon size={20} className="text-white" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={20} className="text-primary" />
              <h2 className="text-lg font-serif font-semibold text-foreground">
                Upload Activity
              </h2>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-40">
              {mockActivityData.map((data, index) => (
                <div key={data.time} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-primary/80 rounded-t-lg transition-all hover:bg-primary"
                    style={{ height: `${(data.uploads / 100) * 100}%` }}
                  />
                  <p className="text-xs text-muted-foreground mt-2">{data.time}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Uploaders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Users size={20} className="text-primary" />
              <h2 className="text-lg font-serif font-semibold text-foreground">
                Top Contributors
              </h2>
            </div>

            <div className="space-y-4">
              {mockTopUploaders.map((uploader, index) => (
                <div key={uploader.name} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{uploader.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{uploader.uploads} uploads</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Engagement Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-champagne/30 rounded-2xl border border-champagne p-6"
        >
          <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
            🎉 Great Engagement!
          </h3>
          <p className="text-muted-foreground">
            Your event has received {mockStats.reactions} reactions and {mockStats.comments} comments. 
            Guests are actively sharing and engaging with the memories!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EventInsightsPage;
