import TopGames from "../top-games/TopGames";

export default function MainContent() {
    return (
        <main className="main-content w-3/5 grid grid-rows-6 gap-3">
            <h1 className="text-5xl underline font-bold justify-self-center mt-6">Top Games From All Major Leagues:</h1>
            <TopGames />
        </main>
    );
}