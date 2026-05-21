# Repository Guidelines

## Project Structure & Module Organization
The project follows a modular and scalable architecture for candlestick pattern recognition:
- **`.\patterns\`**: Contains pattern definition files in JSON format. Each file defines the name, type, sentiment, and required candle count for a pattern.
- **`.\src\types.ts`**: Defines core TypeScript interfaces for Candlesticks, Patterns, and Analysis results.
- **`.\src\engine.ts`**: The main pattern detection engine that loads definitions from the patterns directory and analyzes candle data.
- **`.\src\index.ts`**: Entry point for the application.

## Build, Test, and Development Commands
- **`npm install`**: Install dependencies.
- **`npm run build`**: Compiles TypeScript code to `.\dist\`.
- **`npm start`**: Runs the compiled project.

## Coding Style & Naming Conventions
- Written in TypeScript for type safety.
- Pattern definitions are stored as JSON to allow for easy extension without code changes.
- Uses PascalCase for Classes and camelCase for variables and file names (except for JSON pattern files which are snake_case).

## Testing Guidelines
- Use the sample candle data in `.\src\index.ts` to verify engine behavior.
- (TBD) Implement unit tests for individual pattern detection logic.

## Commit & Pull Request Guidelines
- Follow semantic commit messages where possible (e.g., `feat:`, `fix:`, `refactor:`).
- Ensure all new patterns are added to the `.\patterns\` directory.
