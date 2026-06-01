"""
Integração com API-Football
Responsável por coletar dados de jogos, times e estatísticas
"""

import httpx
import logging
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from app.config import settings

logger = logging.getLogger(__name__)

class APIFootballService:
    """Serviço de integração com API-Football"""
    
    BASE_URL = "https://v3.football.api-sports.io"
    
    def __init__(self):
        self.api_key = settings.api_football_key
        self.headers = {
            "x-apisports-key": self.api_key
        }
        self.client = httpx.AsyncClient(headers=self.headers, timeout=30.0)
    
    async def close(self):
        """Fecha a conexão com o cliente HTTP"""
        await self.client.aclose()
    
    async def _make_request(self, endpoint: str, params: Dict = None) -> Dict[str, Any]:
        """
        Faz uma requisição à API-Football
        
        Args:
            endpoint: Endpoint da API
            params: Parâmetros de query
        
        Returns:
            Resposta JSON da API
        
        Raises:
            Exception: Se houver erro na requisição
        """
        try:
            url = f"{self.BASE_URL}{endpoint}"
            response = await self.client.get(url, params=params)
            response.raise_for_status()
            
            data = response.json()
            
            if data.get("errors"):
                logger.error(f"API Error: {data.get('errors')}")
                raise Exception(f"API Error: {data.get('errors')}")
            
            return data.get("response", [])
        
        except httpx.HTTPError as e:
            logger.error(f"HTTP Error: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Error making request to {endpoint}: {str(e)}")
            raise
    
    async def get_leagues(self) -> List[Dict[str, Any]]:
        """
        Obtém a lista de ligas disponíveis
        
        Returns:
            Lista de ligas
        """
        logger.info("Fetching leagues from API-Football")
        return await self._make_request("/leagues")
    
    async def get_league_by_id(self, league_id: int) -> Optional[Dict[str, Any]]:
        """
        Obtém informações de uma liga específica
        
        Args:
            league_id: ID da liga
        
        Returns:
            Dados da liga ou None
        """
        logger.info(f"Fetching league {league_id}")
        result = await self._make_request("/leagues", params={"id": league_id})
        return result[0] if result else None
    
    async def get_league_by_name(self, league_name: str) -> Optional[Dict[str, Any]]:
        """
        Obtém informações de uma liga pelo nome
        
        Args:
            league_name: Nome da liga
        
        Returns:
            Dados da liga ou None
        """
        logger.info(f"Fetching league {league_name}")
        result = await self._make_request("/leagues", params={"name": league_name})
        return result[0] if result else None
    
    async def get_teams_by_league(self, league_id: int, season: int) -> List[Dict[str, Any]]:
        """
        Obtém os times de uma liga em uma temporada específica
        
        Args:
            league_id: ID da liga
            season: Ano da temporada
        
        Returns:
            Lista de times
        """
        logger.info(f"Fetching teams for league {league_id} season {season}")
        return await self._make_request("/teams", params={"league": league_id, "season": season})
    
    async def get_team_by_id(self, team_id: int) -> Optional[Dict[str, Any]]:
        """
        Obtém informações de um time específico
        
        Args:
            team_id: ID do time
        
        Returns:
            Dados do time ou None
        """
        logger.info(f"Fetching team {team_id}")
        result = await self._make_request("/teams", params={"id": team_id})
        return result[0] if result else None
    
    async def get_matches(
        self,
        league_id: Optional[int] = None,
        season: Optional[int] = None,
        date: Optional[str] = None,
        status: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Obtém partidas com filtros opcionais
        
        Args:
            league_id: ID da liga (opcional)
            season: Ano da temporada (opcional)
            date: Data específica (opcional, formato YYYY-MM-DD)
            status: Status da partida (optional: 'scheduled', 'live', 'finished')
        
        Returns:
            Lista de partidas
        """
        params = {}
        
        if league_id:
            params["league"] = league_id
        if season:
            params["season"] = season
        if date:
            params["date"] = date
        if status:
            params["status"] = status
        
        logger.info(f"Fetching matches with params: {params}")
        return await self._make_request("/fixtures", params=params)
    
    async def get_matches_by_date(self, date: str) -> List[Dict[str, Any]]:
        """
        Obtém partidas de uma data específica
        
        Args:
            date: Data em formato YYYY-MM-DD
        
        Returns:
            Lista de partidas
        """
        logger.info(f"Fetching matches for date {date}")
        return await self._make_request("/fixtures", params={"date": date})
    
    async def get_match_by_id(self, match_id: int) -> Optional[Dict[str, Any]]:
        """
        Obtém informações detalhadas de uma partida
        
        Args:
            match_id: ID da partida
        
        Returns:
            Dados da partida ou None
        """
        logger.info(f"Fetching match {match_id}")
        result = await self._make_request("/fixtures", params={"id": match_id})
        return result[0] if result else None
    
    async def get_matches_by_league_and_season(self, league_id: int, season: int) -> List[Dict[str, Any]]:
        """
        Obtém todas as partidas de uma liga em uma temporada
        
        Args:
            league_id: ID da liga
            season: Ano da temporada
        
        Returns:
            Lista de partidas
        """
        logger.info(f"Fetching all matches for league {league_id} season {season}")
        return await self._make_request(
            "/fixtures",
            params={"league": league_id, "season": season}
        )
    
    async def get_team_statistics(
        self,
        team_id: int,
        league_id: int,
        season: int
    ) -> Optional[Dict[str, Any]]:
        """
        Obtém estatísticas de um time em uma liga e temporada
        
        Args:
            team_id: ID do time
            league_id: ID da liga
            season: Ano da temporada
        
        Returns:
            Estatísticas do time ou None
        """
        logger.info(f"Fetching statistics for team {team_id}")
        result = await self._make_request(
            "/teams/statistics",
            params={"team": team_id, "league": league_id, "season": season}
        )
        return result[0] if result else None
    
    async def get_head_to_head(self, team1_id: int, team2_id: int) -> List[Dict[str, Any]]:
        """
        Obtém histórico de confrontos entre dois times
        
        Args:
            team1_id: ID do primeiro time
            team2_id: ID do segundo time
        
        Returns:
            Lista de confrontos anteriores
        """
        logger.info(f"Fetching head-to-head between teams {team1_id} and {team2_id}")
        return await self._make_request(
            "/fixtures/headtohead",
            params={"h2h": f"{team1_id}-{team2_id}"}
        )
    
    def parse_match_data(self, match_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Extrai e normaliza dados relevantes de uma partida
        
        Args:
            match_data: Dados brutos da API
        
        Returns:
            Dados normalizados
        """
        try:
            fixture = match_data.get("fixture", {})
            league = match_data.get("league", {})
            teams = match_data.get("teams", {})
            goals = match_data.get("goals", {})
            score = match_data.get("score", {})
            
            return {
                "api_id": fixture.get("id"),
                "league_api_id": league.get("id"),
                "league_name": league.get("name"),
                "match_date": fixture.get("date"),
                "status": fixture.get("status", {}).get("short"),
                "home_team_api_id": teams.get("home", {}).get("id"),
                "home_team_name": teams.get("home", {}).get("name"),
                "away_team_api_id": teams.get("away", {}).get("id"),
                "away_team_name": teams.get("away", {}).get("name"),
                "home_goals_ht": score.get("halftime", {}).get("home"),
                "away_goals_ht": score.get("halftime", {}).get("away"),
                "home_goals_ft": score.get("fulltime", {}).get("home"),
                "away_goals_ft": score.get("fulltime", {}).get("away"),
            }
        except Exception as e:
            logger.error(f"Error parsing match data: {str(e)}")
            raise
    
    async def get_recent_matches_for_team(
        self,
        team_id: int,
        league_id: int,
        season: int,
        limit: int = 5
    ) -> List[Dict[str, Any]]:
        """
        Obtém últimas partidas de um time
        
        Args:
            team_id: ID do time
            league_id: ID da liga
            season: Ano da temporada
            limit: Número de partidas a retornar
        
        Returns:
            Lista de últimas partidas
        """
        logger.info(f"Fetching recent matches for team {team_id} (limit: {limit})")
        return await self._make_request(
            "/fixtures",
            params={
                "team": team_id,
                "league": league_id,
                "season": season,
                "last": limit,
                "status": "finished"
            }
        )
