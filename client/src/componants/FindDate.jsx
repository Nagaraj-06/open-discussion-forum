export default function FindDate({ dateStr, timeStr }) {
  try {
    if (!dateStr || !timeStr) return "Just Now";

    // Merge date and time properly
    const backendDate = new Date(`${dateStr.split("T")[0]}T${timeStr}Z`);
    const now = new Date();

    const diffMs = now - backendDate;
    if (diffMs < 0) return "Just Now";

    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    if (diffYear > 0) return `${diffYear} year${diffYear > 1 ? "s" : ""} ago`;
    if (diffMonth > 0) return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;
    if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
    if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
    if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
    return "Just Now";
  } catch (e) {
    return "Just Now";
  }
}
