import {BoardItem} from '@component/Card/Board';
import {GameResult, PlayerResult} from '@lib/constant/nba.contants';

export function mapGameDataToTeamStructure(
  gameData: GameResult,
  players: PlayerResult[],
): BoardItem {
  if (gameData?.Quarters?.length) {
  }

  return {
    ...gameData,
    id: gameData.GameID,
    competitions: [],
    rounds: [],
    currentTeam: getTeamProfile(players, gameData.HomeTeamID).name,
    defeatTeam: getTeamProfile(players, gameData.AwayTeamID).name,
    currentTeamLogo: getTeamProfile(players, gameData.HomeTeamID).logo,
    defeatTeamLogo: getTeamProfile(players, gameData.AwayTeamID).logo,
  };
}

export function getTeamProfile(players: PlayerResult[], name: number) {
  return {
    name: players.find(item => item.TeamID === name)?.Name ?? '-',
    logo: players.find(item => item.TeamID === name)?.WikipediaLogoUrl ?? '-',
  };
}

export function mapGameDataToTeamStructure2(
  gameData: GameResult,
  players: PlayerResult[],
): BoardItem {
  if (gameData?.Quarters?.length) {
  }

  return {
    ...gameData,
    id: gameData.GameID,
    competitions: [],
    rounds: [],
    // currentTeam: getTeamProfile2(players, gameData.HomeTeamID).name,
    // defeatTeam: getTeamProfile2(players, gameData.AwayTeamID).name,
    // currentTeamLogo: getTeamProfile2(players, gameData.HomeTeamID).logo,
    // defeatTeamLogo: getTeamProfile2(players, gameData.AwayTeamID).logo,
  };
}

export function getTeamProfile2(players: PlayerResult[], name: number) {
  return {
    name: players.find(item => item.TeamID === name)?.Name ?? '-',
    logo: players.find(item => item.TeamID === name)?.WikipediaLogoUrl ?? '-',
  };
}
