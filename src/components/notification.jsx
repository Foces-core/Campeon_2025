import React, { useState, useEffect } from "react";
import client from "../sanity/sanityClient";
import "../styles/LatestUpdates.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function LatestUpdates() {
  const [updates, setUpdates] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const colors = ["lime", "pink", "yellow", "red", "blue"];

  useEffect(() => {
    client
      .fetch(`*[_type == "sportsUpdate"] | order(_createdAt desc)`)
      .then((data) => {
        console.log("Fetched data:", data);
        setUpdates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity fetch error:", err);
        setError("Failed to fetch updates. Please try again later.");
        setLoading(false);
      });
  }, []);

  const loadMore = () => setVisibleCount((prev) => prev + 5);

  const renderCricketScore = (score, over) => {
    const scores = score.split(" | ");
    const overs = over.split(" | ");
    return (
      <div className="cricket-score">
        <div className="cricket-end">
          <span className="runs">{scores[0]}</span>
          <span className="over">{overs[0]}</span>
        </div>
        <span>|</span>
        <div className="cricket-end">
          <span className="runs">{scores[1]}</span>
          <span className="over">{overs[1]}</span>
        </div>
      </div>
    );
  };

  //   if (loading) return <div className="loading">Loading...</div>;
  if (loading) return <div className="loading"></div>;
  if (error) return <div className="error"></div>;
  //   if (error) return <div className="error">{error}</div>;

  return (
    <div className="latest-updates">
      <h1 className="title">LATEST UPDATES</h1>
      <div className="updates-container">
        {updates.slice(0, visibleCount).map((update, index) => (
          <div key={update._id} className="card">
            <div className="update-card">
              <div className="update-header">
                <span className={`sport ${colors[index % colors.length]}`}>
                  {update.sport}
                </span>
                <span className="time">{update.time}</span>
              </div>
              <hr />
              <div className="mid">
                <span className="match">
                  {update.team1}
                  <div className="score-card">
                    <span className="score-card-head">Score</span>
                    {update.score ? (
                      update.sport === "County Cricket" ? (
                        renderCricketScore(update.score, update.over)
                      ) : (
                        <span className="score">{update.score}</span>
                      )
                    ) : (
                      <span className="on-going">VS</span>
                    )}
                  </div>
                  {update.team2}
                </span>
                <span className="venue">{update.venue}</span>
              </div>
              {update.result ? (
                <span className={`winner ${colors[index % colors.length]}`}>
                  Winner: {update.result}
                </span>
              ) : (
                <span className="Tba">Winner Will Be Announced Soon!</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {visibleCount < updates.length && (
        <button
          className="view-more"
          onClick={loadMore}
          aria-label="Load more updates"
        >
          View More
        </button>
      )}
    </div>
  );
}
