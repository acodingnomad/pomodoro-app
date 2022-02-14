import PomodoroTimer from "./components/PomodoroTimer";

function App() {
  return (
    <div className="h-screen flex justify-center pt-48 md:pt-32 bg-[#dd2d441f]">
      <header className="App-header">
        <PomodoroTimer />
      </header>
    </div>
  );
}

export default App;
