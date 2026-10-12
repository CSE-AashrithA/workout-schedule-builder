import { useState } from "react";
import "./App.css";

const workoutPlans = {
  "Build Muscle": [
    "Upper Body Strength",
    "Lower Body Strength",
    "Push Day",
    "Pull Day",
    "Core & Mobility"
  ],
  "Lose Weight": [
    "Cardio + Core",
    "Full Body Circuit",
    "Lower Body + Cardio",
    "Upper Body + Cardio",
    "HIIT or Long Walk"
  ],
  "Stay Active": [
    "Full Body Movement",
    "Cardio Day",
    "Strength Basics",
    "Yoga + Mobility",
    "Outdoor Activity"
  ]
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

function App() {
  const [goal, setGoal] = useState("Build Muscle");
  const [selectedDays, setSelectedDays] = useState([]);
  const [schedule, setSchedule] = useState([]);

  function toggleDay(day) {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  }

  function buildSchedule() {
    const plan = workoutPlans[goal];

    const newSchedule = selectedDays.map((day, index) => ({
      day: day,
      workout: plan[index % plan.length]
    }));

    setSchedule(newSchedule);
  }

  return (
    <main className="app">
      <section className="hero">
        <div className="hero-top">
          <div className="hero-icon">🏋️</div>
          <p className="eyebrow">CAMPUSFIT PLANNER</p>
        </div>

        <h1>Build a workout schedule that fits your week.</h1>

        <p className="hero-text">
          Choose your fitness goal and the days you are free. CampusFit will
          create a simple plan to help you stay consistent.
        </p>

        <div className="feature-row">
          <span>🎯 Goal-based plans</span>
          <span>📅 Flexible schedule</span>
          <span>⚡ Quick to use</span>
        </div>
      </section>

      <section className="planner-card">
        <div className="form-section">
          <label htmlFor="goal">What is your goal?</label>

          <select
            id="goal"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
          >
            <option>Build Muscle</option>
            <option>Lose Weight</option>
            <option>Stay Active</option>
          </select>
        </div>

        <div className="form-section">
          <p className="label-text">Which days are you available?</p>

          <p className="selection-text">
            {selectedDays.length} day(s) selected
          </p>

          <div className="days">
            {daysOfWeek.map((day) => (
              <button
                className={selectedDays.includes(day) ? "day active" : "day"}
                key={day}
                onClick={() => toggleDay(day)}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <button
          className="build-button"
          onClick={buildSchedule}
          disabled={selectedDays.length === 0}
        >
          Build My Schedule
        </button>

        {selectedDays.length === 0 && (
          <p className="hint">Choose at least one day to create your plan.</p>
        )}
      </section>

      {schedule.length > 0 && (
        <section className="schedule-card">
          <div className="schedule-heading">
            <div>
              <p className="eyebrow">YOUR PLAN</p>
              <h2>{goal} Schedule</h2>
            </div>

            <span>{schedule.length} workout day(s)</span>
          </div>

          <div className="schedule-list">
            {schedule.map((item) => (
              <div className="workout-row" key={item.day}>
                <strong>{item.day}</strong>
                <span>{item.workout}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;