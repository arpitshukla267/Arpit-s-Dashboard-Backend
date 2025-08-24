import Project from "../models/projectmodel.js";
import Message from "../models/messagemodel.js";
import PortfolioView from "../models/viewmodel.js";

export const getDashboardStats = async (req, res) => {
  try {
    // ✅ Current totals
    const totalProjects = await Project.countDocuments();
    const totalMessages = await Message.countDocuments();
    const totalViews = await PortfolioView.countDocuments();

    // ✅ Engagement Rate
    const engagementRate =
      totalViews > 0 ? ((totalMessages / totalViews) * 100).toFixed(1) : 0;

    // ✅ Compare with previous period (example: last month)
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const projectsLastMonth = await Project.countDocuments({
      createdAt: { $gte: lastMonth },
    });
    const messagesLastMonth = await Message.countDocuments({
      createdAt: { $gte: lastMonth },
    });
    const viewsLastMonth = await PortfolioView.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    // ✅ Calculate increments (absolute & percentage)
    const projectChange = totalProjects - projectsLastMonth;
    const messageChange = totalMessages - messagesLastMonth;
    const viewChange = totalViews - viewsLastMonth;

    res.json({
      totalProjects,
      totalProjectsChange: projectChange,
      messages: totalMessages,
      messagesChange: messageChange,
      portfolioViews: totalViews,
      portfolioViewsChange: viewChange,
      engagementRate: `${engagementRate}%`,
    });
  } catch (err) {
    console.error("❌ Error fetching dashboard stats:", err.message);
    res.status(500).json({ error: "Error fetching dashboard stats" });
  }
};
