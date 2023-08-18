package com.fpl.app.rest;

public record Player(int entry, String name, String leagueRank, int totalScore, int scoreThisWeek) {

    public String toString() {
        return String.valueOf(this.entry) + " " + this.name + " " + this.leagueRank + " " + String.valueOf(totalScore) + " " + String.valueOf(scoreThisWeek);
    }
}
