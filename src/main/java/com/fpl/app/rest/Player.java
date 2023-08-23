package com.fpl.app.rest;


public class Player {
    String entry;
    String fullName;
    String leagueRank;
    int totalScore;
    int scoreThisWeek;
    String first_name;
    String last_name;
    String team_name;

    public Player(String entry_id, String first_name, String last_name, String team_name) {
        this.entry = entry_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.team_name = team_name;
    }
    public Player(int entry, String name, String leagueRank, int total, int scoreThisWeek){
        this.entry = String.valueOf(entry);
        this.fullName = name;
        this.leagueRank = leagueRank;
        this.totalScore = total;
        this.scoreThisWeek = scoreThisWeek;
    }

    public String getEntry() {return this.entry;}    
    public String getFullName() {return this.fullName;}
    public String getFirstName() {return this.first_name;}
    public String getLastName() {return this.last_name;}
    public String getTeamName() {return this.team_name;}
    public String getLeagueRank() {return this.leagueRank;}
    public int getTotal() {return this.totalScore;}
    public int getThisWeekScore() {return this.scoreThisWeek;}



    public String toString() {
        return "entry_id: " + entry + " fullName: " + this.fullName + " leagueRank: " + this.leagueRank + " totalScore: " + String.valueOf(totalScore) + " scoreThisWeek: " + String.valueOf(scoreThisWeek) + " first_name: " + this.first_name + " lastName: " + this.last_name + " teamName: " + this.team_name;
    }


}
