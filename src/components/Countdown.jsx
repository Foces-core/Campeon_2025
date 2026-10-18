import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Countdown.module.css';

function calculateTimeLeft(targetDate) {
  const difference = new Date(targetDate) - new Date();

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(calculateTimeLeft(targetDate));
    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={styles.countdown}>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className={styles.countdownItem}>
          <div className={styles.number}>{String(value).padStart(2, '0')}</div>
          <div className={styles.label}>{unit}</div>
        </div>
      ))}
    </div>
  );
}

Countdown.propTypes = {
  targetDate: PropTypes.string.isRequired,
};