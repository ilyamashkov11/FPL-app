package com.fpl.app.rest;

public class PlayerLeague {
    private String league_name;
    private String league_rank;
    
    public PlayerLeague(String league_name, String league_rank) {
        this.league_name = league_name;
        this.league_rank = league_rank;
    }
    
    // Getters and setters (or use lombok for simplicity)
    public String getLeagueName() {
        return this.league_name;
    }

    public String getLeagueRank() {
        return this.league_rank;
    }
}
