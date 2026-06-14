"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface GameModeContextType {
	gameMode: boolean;
	setGameMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameModeContext = createContext<GameModeContextType | undefined>(
	undefined,
);

export function GameModeProvider({ children }: { children: ReactNode }) {
	const [gameMode, setGameMode] = useState(false);
	return (
		<GameModeContext.Provider value={{ gameMode, setGameMode }}>
			{children}
		</GameModeContext.Provider>
	);
}

export function useGameMode() {
	const context = useContext(GameModeContext);
	if (context === undefined) {
		throw new Error("useGameMode must be used within a GameModeProvider");
	}
	return context;
}
