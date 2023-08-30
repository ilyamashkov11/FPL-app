package com.fpl.app.rest;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Player {
    String entry;
    String fullName;
    String leagueRank;
    int totalScore;
    int scoreThisWeek;
    String first_name;
    String last_name;
    String team_name;
    String leagues;

    @JsonProperty("team")
    public List<FPLplayer> team;
    @JsonProperty("chip")
    public String chip;
    @JsonProperty("team_value")
    public int team_value;
    @JsonProperty("total_points")
    public int total_pts; // have this separate because not sure if itll overwrite something important if i change the other points field
    @JsonProperty("points_this_gameweek")
    public int pts_this_gw; // same here
    @JsonProperty("points_on_bench")
    public int pts_on_bench;
    @JsonProperty("num_transfers")
    public int num_transfers_made;

    public Player(String entry_id, String first_name, String last_name, String team_name) {
        this.entry = entry_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.team_name = team_name;
    }

    // general player info
    public Player(int entry, String name, String leagueRank, int total, int scoreThisWeek, String leagues) {
        this.entry = String.valueOf(entry);
        this.fullName = name;
        this.leagueRank = leagueRank;
        this.totalScore = total;
        this.scoreThisWeek = scoreThisWeek;
        this.leagues = leagues;
    }

    public Player(String id, List<FPLplayer> team, String chip, int team_value, int total_pts, int pts_this_gw, int pts_on_bench, int num_transfers_made) {
        this.entry = id;
        this.team = team;
        this.chip = chip;
        this.team_value = team_value;
        this.total_pts = total_pts;
        this.pts_this_gw = pts_this_gw;
        this.pts_on_bench = pts_on_bench;
        this.num_transfers_made = num_transfers_made;
    }

    public String getEntry() {return this.entry;}    
    public String getFullName() {return this.fullName;}
    public String getFirstName() {return this.first_name;}
    public String getLastName() {return this.last_name;}
    public String getTeamName() {return this.team_name;}
    public String getLeagueRank() {return this.leagueRank;}
    public int getTotal() {return this.totalScore;}
    public int getThisWeekScore() {return this.scoreThisWeek;}   
    public String getLeagues() {return this.leagues;}
    public List<FPLplayer> getTeam() {return this.team;}




    public String toString() {
        return "entry_id: " + entry + " fullName: " + this.fullName + " leagueRank: " + this.leagueRank + " totalScore: " + String.valueOf(totalScore) + " scoreThisWeek: " + String.valueOf(scoreThisWeek) + " first_name: " + this.first_name + " lastName: " + this.last_name + " teamName: " + this.team_name;
    }


}
